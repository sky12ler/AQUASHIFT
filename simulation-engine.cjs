'use strict';

const JOBS = {
  training: { id: 'JOB-317', type: 'AI Training', critical: false, water: 1500 },
  batch: { id: 'JOB-318', type: 'Batch Processing', critical: false, water: 700 },
  analytics: { id: 'JOB-319', type: 'Analytics', critical: false, water: 350 },
  model: { id: 'JOB-320', type: 'Model Training', critical: false, water: 1000 },
  etl: { id: 'JOB-321', type: 'Data ETL', critical: false, water: 550 },
  inference: { id: 'JOB-322', type: 'Critical Inference', critical: true, water: 1300 }
};

const TEST_CASES = [
  ['TC-01','Stable training run','training',31,72,68,5860,'normal','none',true,'stable','RUN NOW'],
  ['TC-02','Cool-night backup run','etl',27,88,82,4500,'normal','none',true,'stable','RUN NOW'],
  ['TC-03','Critical inference, safe reserve','inference',30,80,70,5400,'normal','none',true,'stable','RUN NOW'],
  ['TC-04','High reuse analytics','analytics',32,75,90,5000,'normal','none',true,'stable','RUN NOW'],
  ['TC-05','Peak heat recovery window','training',42,54,39,7100,'watch','none',false,'better','DELAY'],
  ['TC-06','Reclaimed supply returns','training',37,41,22,6600,'restriction','none',false,'better','DELAY'],
  ['TC-07','Tank refill forecast','batch',35,24,55,6000,'watch','none',false,'better','DELAY'],
  ['TC-08','Restriction clears later','training',38,44,25,6800,'restriction','none',false,'better','DELAY'],
  ['TC-09','Confirmed leak with alternative','training',34,39,58,7820,'watch','high',true,'stable','MOVE SITE'],
  ['TC-10','Potable restriction reroute','training',36,55,10,6900,'restriction','none',true,'stable','MOVE SITE'],
  ['TC-11','Thermal peak reroute','training',43,60,60,6500,'normal','none',true,'stable','MOVE SITE'],
  ['TC-12','Critical workload reroute','inference',41,35,30,7200,'normal','watch',true,'stable','MOVE SITE'],
  ['TC-13','Community emergency','etl',36,33,18,6950,'emergency','watch',false,'poor','LIMIT LOAD'],
  ['TC-14','Restriction with no recovery','training',38,44,25,6800,'restriction','none',false,'poor','LIMIT LOAD'],
  ['TC-15','Leak with no alternative','training',33,50,55,8000,'watch','high',false,'stable','LIMIT LOAD'],
  ['TC-16','Thermal margin exhausted','training',40,61,60,6600,'normal','none',false,'poor','LIMIT LOAD'],
  ['TC-17','Critical job, low reserve','inference',42,18,20,7500,'restriction','none',false,'poor','ESCALATE'],
  ['TC-18','Critical job and leak','inference',34,42,55,8200,'normal','high',false,'stable','ESCALATE'],
  ['TC-19','Critical community emergency','inference',39,30,15,7900,'emergency','watch',false,'poor','ESCALATE'],
  ['TC-20','Multi-site heat, no safe move','inference',44,50,40,7400,'watch','none',false,'stable','ESCALATE'],
  ['TC-21','Residual inside tolerance','etl',30,80,70,5000,'normal','none',true,'stable','RUN NOW'],
  ['TC-22','Hidden loss residual anomaly','training',31,65,60,7500,'normal','none',true,'stable','MOVE SITE'],
  ['TC-23','Sensor watch only','training',31,70,70,5800,'normal','watch',true,'stable','RUN NOW'],
  ['TC-24','Community watch with reserve','analytics',33,70,75,5600,'watch','none',true,'stable','RUN NOW']
].map(t => ({ id:t[0], name:t[1], job:t[2], temp:t[3], tank:t[4], reuse:t[5], makeup:t[6], community:t[7], leak:t[8], alt:t[9], future:t[10], expected:t[11] }));

function number(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function normalizeScenario(input = {}) {
  return {
    job: JOBS[input.job] ? input.job : 'training',
    temp: number(input.temp, 31, 15, 55),
    tank: number(input.tank, 72, 0, 100),
    reuse: number(input.reuse, 68, 0, 100),
    makeup: number(input.makeup, 5860, 0, 20000),
    community: ['normal','watch','restriction','emergency'].includes(input.community) ? input.community : 'normal',
    leak: ['none','watch','high'].includes(input.leak) ? input.leak : 'none',
    alt: input.alt === true || input.alt === 'true',
    future: ['stable','better','poor'].includes(input.future) ? input.future : 'stable'
  };
}

function evaluateScenario(raw) {
  const c = normalizeScenario(raw);
  const job = JOBS[c.job];
  const thermal = Math.max(0, c.temp - 30) * 118;
  const reusePenalty = (100 - c.reuse) * 7.2;
  const demand = Math.round((4300 + thermal + reusePenalty + job.water) / 10) * 10;
  let capacity = 8000 - (100 - c.tank) * 9 - ({ normal:0, watch:320, restriction:900, emergency:1700 }[c.community]) - ({ none:0, watch:360, high:1450 }[c.leak]);
  capacity = Math.round(capacity / 10) * 10;
  const expected = Math.round((4850 + thermal * .55 + Math.max(0, 50 - c.reuse) * 5) / 10) * 10;
  const residual = c.makeup - expected;
  const leakHigh = c.leak === 'high' || residual > 1050;
  const unsafe = demand > capacity || c.tank < 28 || c.community === 'emergency';
  const projected = demand > capacity - 450 || c.temp >= 40;
  let action = 'RUN NOW';
  let reason = 'Capacity, SLA, and community reserve are within policy.';
  if (job.critical && (unsafe || leakHigh || projected) && !c.alt) { action='ESCALATE'; reason='Critical workload has no policy-compliant execution path.'; }
  else if (job.critical && (unsafe || leakHigh || projected) && c.alt) { action='MOVE SITE'; reason='Protect SLA by rerouting critical work to a safer site.'; }
  else if (leakHigh && c.alt) { action='MOVE SITE'; reason='Loss anomaly exceeds tolerance; move workload away from affected water loop.'; }
  else if ((unsafe || projected) && c.alt && c.community !== 'normal') { action='MOVE SITE'; reason='Alternative site has safer water capacity and community impact.'; }
  else if ((unsafe || projected) && c.future === 'better' && !job.critical) { action='DELAY'; reason='A safer forecast window exists before the workload deadline.'; }
  else if (unsafe || leakHigh || c.community === 'restriction' || c.community === 'emergency') { action='LIMIT LOAD'; reason='No safe move window; reduce load to remain inside reserve policy.'; }
  else if (projected && c.alt) { action='MOVE SITE'; reason='Forecast margin is thin; move to the lowest-risk available site.'; }
  else if (projected) { action='LIMIT LOAD'; reason='Reduce cooling demand until thermal margin recovers.'; }
  return {
    input: c, action, reason, demand, capacity, expectedMakeup: expected, residual,
    margin: capacity - demand,
    riskScore: Math.max(4, Math.min(99, Math.round((demand / capacity) * 65 + (100 - c.tank) * .25 + (c.leak === 'high' ? 20 : 0))))
  };
}

module.exports = { JOBS, TEST_CASES, normalizeScenario, evaluateScenario };
