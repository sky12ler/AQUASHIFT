'use strict';

const fs = require('fs');
const { TEST_CASES } = require('../simulation-engine.cjs');

const baseUrl = process.env.AQUASHIFT_URL || 'http://127.0.0.1:8080';
const args = process.argv.slice(2);

function help() {
  console.log(`AQUASHIFT simulator

Usage:
  node scripts/simulate.cjs --list
  node scripts/simulate.cjs TC-09 [siteId]
  node scripts/simulate.cjs --file scenario.json
  node scripts/simulate.cjs --json '{"siteId":"phoenix","scenario":{"job":"training","temp":44,"tank":22,"reuse":18,"makeup":7800,"community":"restriction","leak":"none","alt":true,"future":"better"}}'

The dashboard polls the local API and updates within two seconds.`);
}

async function main() {
  if (!args.length || args[0] === '--help') { help(); return; }
  if (args[0] === '--list') {
    TEST_CASES.forEach(t => console.log(`${t.id}  ${t.expected.padEnd(10)}  ${t.name}`));
    return;
  }
  let payload;
  if (args[0] === '--file') payload = JSON.parse(fs.readFileSync(args[1], 'utf8'));
  else if (args[0] === '--json') payload = JSON.parse(args.slice(1).join(' '));
  else payload = { testCaseId:args[0], siteId:args[1] || 'johor' };

  const response = await fetch(`${baseUrl}/api/simulation`, {
    method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(payload)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`);
  console.log(JSON.stringify({ version:result.version, siteId:result.siteId, testCaseId:result.testCaseId, action:result.result.action, reason:result.result.reason, demand:result.result.demand, capacity:result.result.capacity, riskScore:result.result.riskScore }, null, 2));
}

main().catch(error => { console.error(`Simulation failed: ${error.message}`); process.exitCode=1; });
