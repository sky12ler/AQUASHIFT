const http = require('http');
const fs = require('fs');
const path = require('path');
const { TEST_CASES, normalizeScenario, evaluateScenario } = require('./simulation-engine.cjs');

const root = path.join(__dirname, 'dist');
const port = Number(process.env.AQUASHIFT_PORT || 8080);
const types = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml',
  '.png':'image/png', '.json':'application/json; charset=utf-8'
};
let latestSimulation = { version:0, receivedAt:null, siteId:null, testCaseId:null, input:null, result:null };

function json(response, status, body) {
  response.writeHead(status, {
    'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store',
    'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'content-type',
    'Access-Control-Allow-Methods':'GET,POST,OPTIONS'
  });
  response.end(JSON.stringify(body, null, 2));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body='';
    request.on('data', chunk => { body += chunk; if (body.length > 1_000_000) request.destroy(); });
    request.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('Request body must be valid JSON.')); } });
    request.on('error', reject);
  });
}

async function api(request, response, pathname) {
  if (request.method === 'OPTIONS') { json(response, 204, {}); return true; }
  if (request.method === 'GET' && pathname === '/api/health') { json(response, 200, { ok:true, service:'AQUASHIFT simulation API', version:1 }); return true; }
  if (request.method === 'GET' && pathname === '/api/test-cases') { json(response, 200, TEST_CASES.map(t => ({ ...t, actual:evaluateScenario(t).action, passed:evaluateScenario(t).action===t.expected }))); return true; }
  if (request.method === 'GET' && pathname === '/api/simulation/latest') { json(response, 200, latestSimulation); return true; }
  if (request.method === 'POST' && pathname === '/api/simulation') {
    try {
      const body = await readJson(request);
      const test = body.testCaseId ? TEST_CASES.find(t => t.id.toUpperCase() === String(body.testCaseId).toUpperCase()) : null;
      if (body.testCaseId && !test) { json(response, 404, { ok:false, error:`Unknown testCaseId ${body.testCaseId}` }); return true; }
      const input = normalizeScenario({ ...(test || {}), ...(body.scenario || body) });
      const result = evaluateScenario(input);
      latestSimulation = {
        version: latestSimulation.version + 1,
        receivedAt: new Date().toISOString(),
        siteId: body.siteId || 'johor',
        testCaseId: test?.id || null,
        input,
        result
      };
      json(response, 200, { ok:true, ...latestSimulation });
    } catch (error) { json(response, 400, { ok:false, error:error.message }); }
    return true;
  }
  return false;
}

const server = http.createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  if (pathname.startsWith('/api/')) {
    if (await api(request, response, pathname)) return;
    json(response, 404, { ok:false, error:'API route not found' });
    return;
  }
  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filename = path.resolve(root, requested);
  if (!filename.startsWith(root + path.sep) && filename !== path.join(root, 'index.html')) {
    response.writeHead(403).end('Forbidden');
    return;
  }
  fs.readFile(filename, (error, data) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type':'text/plain; charset=utf-8' });
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }
    response.writeHead(200, { 'Content-Type':types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    response.end(data);
  });
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') console.error(`Port ${port} is already in use. Close the other local server and try again.`);
  else console.error(error);
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`AQUASHIFT is running at http://localhost:${port}`);
  console.log(`Simulation API: POST http://localhost:${port}/api/simulation`);
  console.log('Press Ctrl+C to stop.');
});
