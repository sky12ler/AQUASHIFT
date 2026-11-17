(() => {
  'use strict';

  const NAV = [
    ['overview','⌂','Overview'],['sites','♟','Sites'],['monitoring','⌁','Monitoring'],
    ['analytics','▥','Analytics'],['scheduler','▣','Scheduler'],['reports','▤','Reports'],
    ['cases','♣','Cases'],['settings','⚙','Settings']
  ];

  const sites = [
    {id:'johor',name:'Johor DC1',location:'Johor Bahru, Malaysia',country:'Malaysia',region:'Asia Pacific',lat:1.4927,lon:103.7414,status:'Online',risk:'Medium',capability:'Hybrid',mode:'Closed-Loop Cooling',wue:.42,reuse:65,load:48,tank:76,temp:32.8,supply:24.1,makeup:220,pressure:142,sensors:'220 / 248',community:'Moderate',utility:'Air Selangor',source:'Municipal + Reclaimed',updated:'2 min ago'},
    {id:'selangor',name:'Selangor DC1',location:'Cyberjaya, Malaysia',country:'Malaysia',region:'Asia Pacific',lat:2.9213,lon:101.6559,status:'Online',risk:'Low',capability:'Hybrid',mode:'Dry Run',wue:.30,reuse:82,load:28,tank:84,temp:29.1,supply:22.4,makeup:165,pressure:146,sensors:'241 / 248',community:'Normal',utility:'Air Selangor',source:'Reclaimed + Municipal',updated:'5 min ago'},
    {id:'penang',name:'Penang DC1',location:'Bayan Lepas, Malaysia',country:'Malaysia',region:'Asia Pacific',lat:5.2946,lon:100.2601,status:'Online',risk:'Low',capability:'Hybrid',mode:'Dry Run',wue:.32,reuse:70,load:22,tank:81,temp:30.3,supply:23.0,makeup:180,pressure:145,sensors:'238 / 248',community:'Normal',utility:'PBA',source:'Municipal',updated:'6 min ago'},
    {id:'singapore',name:'Singapore DC1',location:'Singapore',country:'Singapore',region:'Asia Pacific',lat:1.3521,lon:103.8198,status:'Online',risk:'Medium',capability:'Hybrid',mode:'Closed-Loop Cooling',wue:.38,reuse:84,load:42,tank:73,temp:31.4,supply:23.8,makeup:205,pressure:140,sensors:'245 / 248',community:'Moderate',utility:'PUB',source:'NEWater + Municipal',updated:'5 min ago'},
    {id:'ashburn',name:'Ashburn DC1',location:'Ashburn, Virginia, USA',country:'United States',region:'Americas',lat:39.0438,lon:-77.4874,status:'Online',risk:'Low',capability:'Hybrid',mode:'Dry Run',wue:.29,reuse:61,load:64,tank:88,temp:26.4,supply:20.8,makeup:248,pressure:151,sensors:'286 / 288',community:'Normal',utility:'Loudoun Water',source:'Municipal + Reclaimed',updated:'1 min ago'},
    {id:'phoenix',name:'Phoenix DC1',location:'Phoenix, Arizona, USA',country:'United States',region:'Americas',lat:33.4484,lon:-112.0740,status:'Online',risk:'High',capability:'Hybrid',mode:'Closed-Loop Cooling',wue:.51,reuse:58,load:56,tank:49,temp:38.6,supply:25.9,makeup:315,pressure:138,sensors:'279 / 288',community:'Restricted',utility:'City of Phoenix Water',source:'Reclaimed + Municipal',updated:'3 min ago'},
    {id:'dallas',name:'Dallas DC1',location:'Dallas, Texas, USA',country:'United States',region:'Americas',lat:32.7767,lon:-96.7970,status:'Online',risk:'Medium',capability:'Hybrid',mode:'Closed-Loop Cooling',wue:.40,reuse:72,load:52,tank:69,temp:34.1,supply:23.6,makeup:272,pressure:144,sensors:'283 / 288',community:'Moderate',utility:'Dallas Water Utilities',source:'Municipal + Reclaimed',updated:'4 min ago'},
    {id:'hillsboro',name:'Hillsboro DC1',location:'Hillsboro, Oregon, USA',country:'United States',region:'Americas',lat:45.5229,lon:-122.9898,status:'Online',risk:'Low',capability:'Hybrid',mode:'Dry Run',wue:.27,reuse:76,load:46,tank:91,temp:23.8,supply:19.7,makeup:174,pressure:149,sensors:'287 / 288',community:'Normal',utility:'Tualatin Valley Water',source:'Reclaimed + Municipal',updated:'2 min ago'}
  ];

  const siteImages = {
    johor:'assets/data-center-campus.png', selangor:'assets/dry runmode.png',
    penang:'assets/water storage tank1.png', singapore:'assets/makeup water, blowdown.png',
    ashburn:'assets/mehcanical room 1.png', phoenix:'assets/data-center-campus.png',
    dallas:'assets/cooling-pipe-monitoring.png', hillsboro:'assets/dry runmode.png'
  };

  const jobs = {
    training:{id:'JOB-317',type:'AI Training',site:'johor',suggested:'selangor',runtime:8,deadline:'Today, 23:00',flex:'High',water:'High',community:'Medium'},
    batch:{id:'JOB-318',type:'Batch Processing',site:'penang',suggested:'penang',runtime:4,deadline:'Today, 18:00',flex:'Medium',water:'Medium',community:'Low'},
    analytics:{id:'JOB-319',type:'Analytics',site:'singapore',suggested:'singapore',runtime:2,deadline:'Today, 17:00',flex:'High',water:'Low',community:'Low'},
    model:{id:'JOB-320',type:'Model Training',site:'phoenix',suggested:'hillsboro',runtime:6,deadline:'Tomorrow, 10:00',flex:'Low',water:'Medium',community:'Medium'},
    etl:{id:'JOB-321',type:'Data ETL',site:'johor',suggested:'ashburn',runtime:3,deadline:'Today, 20:00',flex:'Medium',water:'High',community:'High'},
    inference:{id:'JOB-322',type:'Critical Inference',site:'johor',suggested:'johor',runtime:2,deadline:'Today, 16:00',flex:'Low',water:'High',community:'High',critical:true}
  };
  const jobWater = {training:1500,batch:700,analytics:350,model:1000,etl:550,inference:1300};

  const cases = [
    {id:'CAS-2026-1042',severity:'Critical',site:'Johor DC1',type:'Cooling Tower',summary:'High return water temperature detected (32.8°C)',owner:'A. Rahman',age:'2h 15m',status:'Open',action:'Investigate sensor data'},
    {id:'CAS-2026-1041',severity:'High',site:'Penang DC1',type:'Water Quality',summary:'pH level below threshold (6.2)',owner:'C. Chen',age:'4h 32m',status:'Under Investigation',action:'Collect sample & confirm'},
    {id:'CAS-2026-1040',severity:'High',site:'Selangor DC1',type:'Leak Detection',summary:'Possible leak detected – Zone B elevated flow',owner:'J. Tan',age:'5h 10m',status:'Under Investigation',action:'Site inspection scheduled'},
    {id:'CAS-2026-1039',severity:'Medium',site:'Singapore DC1',type:'Asset Performance',summary:'Pump efficiency below expected range',owner:'S. Kumar',age:'8h 21m',status:'Open',action:'Review maintenance history'},
    {id:'CAS-2026-1038',severity:'Low',site:'Johor DC1',type:'General',summary:'Scheduled maintenance reminder',owner:'T. Lim',age:'1d 3h',status:'In Progress',action:'Create work order'},
    {id:'CAS-2026-1037',severity:'Medium',site:'Penang DC1',type:'Water Quality',summary:'Turbidity trending upward',owner:'L. Garcia',age:'1d 6h',status:'Open',action:'Validate with latest readings'},
    {id:'CAS-2026-1036',severity:'Low',site:'Selangor DC1',type:'Sensor',summary:'Data gap from flow sensor (10 min)',owner:'M. Ali',age:'1d 8h',status:'Resolved',action:'Monitor for recurrence'},
    {id:'CAS-2026-1035',severity:'Critical',site:'Phoenix DC1',type:'Water Stress',summary:'Forecast reserve below policy threshold (18%)',owner:'E. Martinez',age:'1h 12m',status:'Open',action:'Review workload moves'},
    {id:'CAS-2026-1034',severity:'High',site:'Dallas DC1',type:'Leak Detection',summary:'Cooling-loop residual exceeded 1,050 m³',owner:'R. Wilson',age:'3h 08m',status:'Under Investigation',action:'Validate Zone C sensors'},
    {id:'CAS-2026-1033',severity:'Medium',site:'Ashburn DC1',type:'Sensor',summary:'Conductivity sensor drift detected',owner:'K. Patel',age:'6h 44m',status:'In Progress',action:'Run remote calibration'},
    {id:'CAS-2026-1032',severity:'Low',site:'Hillsboro DC1',type:'Asset Performance',summary:'Pump efficiency 3% below baseline',owner:'J. Brooks',age:'9h 20m',status:'Open',action:'Review next maintenance window'}
  ];

  const tests = [
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
  ].map(t=>({id:t[0],name:t[1],job:t[2],temp:t[3],tank:t[4],reuse:t[5],makeup:t[6],community:t[7],leak:t[8],alt:t[9],future:t[10],expected:t[11]}));

  const state = {
    page:'overview', site:'johor', siteTab:'overview', caseTab:'alerts', caseId:cases[0].id,
    report:'Daily Operations Report', reportGeneratedAt:null, testFilter:'ALL', testResults:{}, cooling:{}, simulationVersion:0,
    timeWindow:'Today', advancedFilters:false, nextCaseNumber:1043, mapRegion:'global', evidenceOpen:false,
    sim:{job:'training',temp:36,tank:55,reuse:55,makeup:6900,community:'watch',leak:'none',alt:true,future:'better'}
  };
  const previewParams=new URLSearchParams(location.search);
  const previewMode=previewParams.get('preview')==='1';
  if(['overview','sites','monitoring','analytics','scheduler','reports','cases','settings'].includes(previewParams.get('page'))) state.page=previewParams.get('page');
  if(['global','apac','usa'].includes(previewParams.get('map'))) state.mapRegion=previewParams.get('map');
  if(state.mapRegion==='usa') state.site='ashburn';
  if(previewParams.get('evidence')==='leak') state.evidenceOpen=true;

  const $ = s => document.querySelector(s);
  const app = $('#app');
  const site = () => sites.find(s=>s.id===state.site) || sites[0];
  const cls = v => String(v).toLowerCase().replaceAll(' ','-');
  const riskColor = r => r==='Low'?'green':r==='Medium'?'amber':'red';
  const sevColor = r => r==='Low'?'blue':r==='Medium'?'amber':'red';
  const actionColor = a => ({'RUN NOW':'blue','DELAY':'amber','MOVE SITE':'green','LIMIT LOAD':'purple','ESCALATE':'red'})[a] || 'gray';
  const tag = (v,c) => `<span class="tag ${c||'gray'}">${v}</span>`;
  const iconSvg = name => {
    const key=String(name).toLowerCase();
    const common='viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
    if(/site|data center|online|building/.test(key)) return `<svg ${common}><path d="M4 21V8l5-3v16M9 21V3l11 4v14M2 21h20M12 8h2m3 0h1m-6 4h2m3 0h1m-6 4h2m3 0h1"/></svg>`;
    if(/water|wue|reuse|dry|impact|saved|potable/.test(key)) return `<svg ${common}><path d="M12 2S5.5 9.2 5.5 14.4a6.5 6.5 0 0 0 13 0C18.5 9.2 12 2 12 2Z"/><path d="M9 16.2c.7 1.3 1.8 1.9 3.3 1.9"/></svg>`;
    if(/report|document|export/.test(key)) return `<svg ${common}><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>`;
    if(/schedule|job|delay/.test(key)) return `<svg ${common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18M8 14h3m2 0h3m-8 3h3"/></svg>`;
    if(/case|alert|risk|critical/.test(key)) return `<svg ${common}><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5m0 3h.01"/></svg>`;
    if(/setting|policy|rule|integration/.test(key)) return `<svg ${common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>`;
    return `<svg ${common}><path d="M4 19V9m5 10V5m5 14v-7m5 7V3"/><path d="M2 21h20"/></svg>`;
  };
  const toast = msg => { const el=$('#toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2400); };
  const selectSite = (extra='') => `<select class="select site-select" ${extra}>${sites.map(s=>`<option value="${s.id}" ${s.id===state.site?'selected':''}>${s.name}</option>`).join('')}</select>`;
  const pageHead = (icon,title,sub,tools='',extraClass='') => `<section class="page-head${extraClass?' '+extraClass:''}"><div class="page-heading"><span class="page-icon">${iconSvg(title)}</span><div><h1>${title}</h1><p>${sub}</p></div></div><div class="head-tools">${tools}</div></section>`;
  const card = (title,sub,body,tools='') => { const clean=title.replace(/^[^A-Za-z0-9]+/,''); return `<section class="card"><div class="card-head"><div><h2><span class="card-title-icon">${iconSvg(clean)}</span>${clean}</h2>${sub?`<p>${sub}</p>`:''}</div>${tools}</div><div class="card-body">${body}</div></section>`; };
  const kpi = (icon,label,value,delta='Live',tone='up') => `<div class="card kpi-card"><span class="kpi-icon">${iconSvg(label)}</span><div><span>${label}</span><b>${value}</b><small class="${tone}">${delta}</small></div></div>`;
  const spark = (vals=[8,12,10,15,13,20,17,25]) => { const max=Math.max(...vals), pts=vals.map((v,i)=>`${i*100/(vals.length-1)},${24-v/max*20}`).join(' '); return `<div class="spark"><svg viewBox="0 0 100 24" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="#079fc0" stroke-width="2"/></svg></div>`; };
  const lineChart = (a=[32,30,29,31,34,38,41,40,43,47,44,39],b=[20,21,21,23,24,27,28,27,29,31,29,26],labelA='Actual',labelB='Target') => {
    const all=[...a,...b], rawMin=Math.min(...all), rawMax=Math.max(...all), pad=Math.max(2,(rawMax-rawMin)*.18), min=Math.max(0,rawMin-pad), max=rawMax+pad;
    const x=i=>54+i*478/(a.length-1), y=v=>190-(v-min)/(max-min)*160, points=v=>v.map((n,i)=>`${x(i)},${y(n)}`).join(' ');
    const context=(labelA+' '+labelB).toLowerCase(), isWue=context.includes('wue'), isWater=/demand|capacity|usage|use|reclaimed/.test(context), isTemp=/temp|ambient|wet-bulb/.test(context);
    const unit=isWue?'L/kWh':isWater?'m³/h':isTemp?'°C':'';
    const fmt=v=>isWue?(v/100).toFixed(2):isWater?Math.round(v*10):Math.round(v);
    const ticks=[0,1,2,3,4].map(i=>max-(max-min)*i/4), time=['00:00','04:00','08:00','12:00','16:00','20:00'];
    const area=`54,190 ${points(a)} 532,190`;
    return `<div class="chart-meta"><span><i class="legend-dot blue"></i>${labelA}</span><span><i class="legend-dot teal"></i>${labelB}</span><b>${unit}</b></div><div class="chart"><svg viewBox="0 0 560 225" role="img" aria-label="${labelA} and ${labelB} chart"><defs><linearGradient id="area-${Math.round(a[0]*10)}-${Math.round(b[0]*10)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1689e6" stop-opacity=".22"/><stop offset="1" stop-color="#1689e6" stop-opacity=".02"/></linearGradient></defs><g class="chart-grid">${ticks.map((t,i)=>`<line x1="54" y1="${30+i*40}" x2="532" y2="${30+i*40}"/><text x="46" y="${34+i*40}" text-anchor="end">${fmt(t)}</text>`).join('')}${time.map((t,i)=>`<line x1="${54+i*95.6}" y1="30" x2="${54+i*95.6}" y2="190"/><text x="${54+i*95.6}" y="211" text-anchor="middle">${t}</text>`).join('')}</g><polygon points="${area}" fill="url(#area-${Math.round(a[0]*10)}-${Math.round(b[0]*10)})"/><polyline class="series-a" points="${points(a)}"/><polyline class="series-b" points="${points(b)}"/>${a.map((v,i)=>`<circle class="point-a" cx="${x(i)}" cy="${y(v)}" r="3"><title>${labelA}: ${fmt(v)} ${unit}</title></circle>`).join('')}${b.map((v,i)=>`<circle class="point-b" cx="${x(i)}" cy="${y(v)}" r="2.5"><title>${labelB}: ${fmt(v)} ${unit}</title></circle>`).join('')}</svg></div>`;
  };
  const donut = (value=65,label='465 m³/h') => `<div class="donut" style="background:conic-gradient(var(--teal) 0 ${value}%,var(--blue) ${value}% 88%,#9eddda 88%)"><b>${label}</b></div>`;

  const MAP_REGIONS={
      global:{label:'Global',minLon:-180,maxLon:180,minLat:-90,maxLat:90},
      apac:{label:'Southeast Asia',minLon:99,maxLon:105,minLat:0,maxLat:6.5},
      usa:{label:'United States',minLon:-130,maxLon:-65,minLat:24,maxLat:50}
  };
  const mapSelectionHtml=s=>`<b>${s.name}</b><span>${s.location}</span><code>${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}</code>${state.page==='overview'?`<div class="map-site-metrics">${tag(s.risk+' water risk',riskColor(s.risk))}<span>WUE ${s.wue.toFixed(2)} L/kWh</span><span>Reclaimed water ${s.reuse}%</span><span>${s.mode}</span></div>`:`<small>${s.capability} capable · Current: ${s.mode}</small>`}`;
  const mapLegendCounts=(rows,detailed=false)=>{
    const online=rows.filter(s=>s.status==='Online').length;
    return {network:`${online} online · ${rows.length-online} offline`,low:`● Low ${detailed?'':'water '}risk (${rows.filter(s=>s.risk==='Low').length})`,...(detailed?{medium:`● Medium risk (${rows.filter(s=>s.risk==='Medium').length})`,high:`● High risk (${rows.filter(s=>s.risk==='High').length})`}:{elevated:`● Elevated water risk (${rows.filter(s=>s.risk!=='Low').length})`})};
  };
  const overviewSummaryValues=()=>({online:`${sites.filter(s=>s.status==='Online').length} sites online`,high:`${sites.filter(s=>s.risk==='High').length} high-risk ${sites.filter(s=>s.risk==='High').length===1?'site':'sites'}`,medium:`${sites.filter(s=>s.risk==='Medium').length} medium-risk ${sites.filter(s=>s.risk==='Medium').length===1?'site':'sites'}`});
  const overviewPrioritySite=()=>sites.filter(s=>s.risk!=='Low').sort((a,b)=>({High:2,Medium:1}[b.risk]||0)-({High:2,Medium:1}[a.risk]||0)||b.wue-a.wue)[0];
  const overviewPriorityHtml=s=>`<span class="overview-priority-icon">${iconSvg(s?'alert':'water')}</span><div><b>${s?s.name.replace(/ DC\d+$/,'')+' needs attention':'All sites at low water risk'}</b><small>${s?s.risk+' water risk':'No elevated water risk reported'}</small></div>${s?`<button class="btn" data-review-site="${s.id}" aria-label="Review ${s.name}">Review site</button>`:''}`;

  function mapHtml(){
    const regions=MAP_REGIONS;
    const detailed=state.page==='overview';
    const r=regions[state.mapRegion]||regions.global;
    const visible=sites.filter(s=>s.lon>=r.minLon&&s.lon<=r.maxLon&&s.lat>=r.minLat&&s.lat<=r.maxLat);
    const lonRange=r.maxLon-r.minLon,latRange=r.maxLat-r.minLat;
    const mapStyle=`--map-aspect:${2753/1396*lonRange/(2*latRange)};--map-size-x:${360/lonRange*100}%;--map-size-y:${180/latRange*100}%;--map-pos-x:${lonRange===360?0:(r.minLon+180)/(360-lonRange)*100}%;--map-pos-y:${latRange===180?0:(90-r.maxLat)/(180-latRange)*100}%`;
    const nodes=visible.map(s=>{const left=(s.lon-r.minLon)/lonRange*100,top=(r.maxLat-s.lat)/latRange*100;return `<button class="map-node global-node ${s.id} ${left>65?'label-left':''} ${s.id===state.site?'active':''} ${s.risk==='High'&&detailed?'high-risk':s.risk!=='Low'?'warn':''}" style="left:${left}%;top:${top}%" data-site="${s.id}" aria-label="Select ${s.name}, ${s.risk.toLowerCase()} water risk" aria-pressed="${s.id===state.site}" title="${s.name} · ${s.risk} water risk · ${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}"><i></i><span>${s.name}</span></button>`}).join('');
    const selected=site();
    const legendClasses={network:'network-availability',low:'low-risk-key',medium:'watch-key',high:'high-risk-key',elevated:'watch-key'};
    return `<div class="map-shell">
      <div class="map-toolbar"><div class="map-region-tabs">${Object.entries(regions).map(([key,value])=>`<button class="map-region-btn ${state.mapRegion===key?'active':''}" data-map-region="${key}" aria-pressed="${state.mapRegion===key}">${value.label}</button>`).join('')}</div>
        <div class="map-zoom-controls" role="group" aria-label="Map zoom controls">
          <button class="btn" data-map-zoom="in" aria-label="Zoom in" title="Zoom in">+</button>
          <button class="btn" data-map-zoom="out" aria-label="Zoom out" title="Zoom out">−</button>
          <button class="btn" data-map-zoom="reset" aria-label="Reset map view">Reset view</button>
        </div>
      </div>
      <div class="map global-map map-region-${state.mapRegion}" data-map-view="${state.mapRegion}" style="${mapStyle}">
        <div class="map-surface"><div class="map-background" role="img" aria-label="Map of ${r.label} AQUASHIFT sites"></div>${nodes}</div>
        <div class="map-title">${r.label.toUpperCase()} · ${visible.length} SITES</div>
        <div class="map-credit"><a href="https://commons.wikimedia.org/wiki/File:BlankMap-World-Equirectangular.svg" target="_blank" rel="noreferrer">Map CC0</a></div>
      </div>
      <div class="map-legend" aria-label="Site availability and water risk">
        ${Object.entries(mapLegendCounts(visible,detailed)).map(([key,value])=>`<span class="${legendClasses[key]}" data-map-stat="${key}">${value}</span>`).join('')}
      </div>
      <div class="map-selection" tabindex="-1" aria-live="polite">${mapSelectionHtml(selected)}</div>
    </div>`;
  }

  let mapResizeObserver;
  let mapView={region:null,zoom:1,x:0,y:0};
  function bindMapMarkers(){
    mapResizeObserver?.disconnect();
    const maps=[...document.querySelectorAll('.global-map')];
    if(!maps.length)return;
    if(mapView.region!==state.mapRegion)mapView={region:state.mapRegion,zoom:1,x:0,y:0};
    const layouts=new Map();
    maps.forEach(map=>{
      const surface=map.querySelector('.map-surface'),controls=map.closest('.map-shell').querySelector('.map-zoom-controls');
      const view=mapView,fitCard=Boolean(map.closest('.overview-network'));
      const layout=()=>{
        const region=MAP_REGIONS[map.dataset.mapView]||MAP_REGIONS.global;
        const lonRange=region.maxLon-region.minLon,latRange=region.maxLat-region.minLat;
        const aspect=2753/1396*lonRange/(2*latRange);
        const minLon=region.minLon,maxLat=region.maxLat;
        map.style.setProperty('--map-size-x',`${360/lonRange*100}%`);
        map.style.setProperty('--map-size-y',`${180/latRange*100}%`);
        map.style.setProperty('--map-pos-x',`${Math.abs(lonRange-360)<.001?0:(minLon+180)/(360-lonRange)*100}%`);
        map.style.setProperty('--map-pos-y',`${Math.abs(latRange-180)<.001?0:(90-maxLat)/(180-latRange)*100}%`);
        surface.querySelectorAll('.global-node').forEach(node=>{
          const s=sites.find(site=>site.id===node.dataset.site),left=(s.lon-minLon)/lonRange*100;
          node.style.left=`${left}%`;node.style.top=`${(maxLat-s.lat)/latRange*100}%`;
          node.classList.toggle('label-left',left>65);
        });
        const width=(fitCard?map.clientWidth:Math.min(map.clientWidth,map.clientHeight*aspect))*view.zoom;
        const height=fitCard?map.clientHeight*view.zoom:width/aspect;
        map.style.setProperty('--map-aspect',width/height);
        const maxX=Math.max(0,(width-map.clientWidth)/2),maxY=Math.max(0,(height-map.clientHeight)/2);
        view.x=Math.max(-maxX,Math.min(maxX,view.x));view.y=Math.max(-maxY,Math.min(maxY,view.y));
        surface.style.width=`${width}px`;surface.style.height=`${height}px`;
        surface.style.left=`calc(50% + ${view.x}px)`;surface.style.top=`calc(50% + ${view.y}px)`;
        map.classList.toggle('is-zoomed',view.zoom>1);
        map.dataset.zoom=String(view.zoom);
        controls.querySelector('[data-map-zoom="in"]').disabled=view.zoom>=8;
        controls.querySelector('[data-map-zoom="out"]').disabled=view.zoom<=1;
        controls.querySelector('[data-map-zoom="reset"]').disabled=view.zoom===1&&view.x===0&&view.y===0;
      };
      const zoomAt=(zoom,clientX,clientY)=>{
        zoom=Math.max(1,Math.min(8,zoom));
        const rect=map.getBoundingClientRect(),factor=zoom/view.zoom;
        const x=clientX==null?0:clientX-rect.left-rect.width/2;
        const y=clientY==null?0:clientY-rect.top-rect.height/2;
        view.x=x-(x-view.x)*factor;view.y=y-(y-view.y)*factor;view.zoom=zoom;
        layout();
      };
      controls.querySelector('[data-map-zoom="in"]').addEventListener('click',()=>zoomAt(view.zoom*1.35));
      controls.querySelector('[data-map-zoom="out"]').addEventListener('click',()=>zoomAt(view.zoom/1.35));
      controls.querySelector('[data-map-zoom="reset"]').addEventListener('click',()=>{
        view.zoom=1;view.x=0;view.y=0;layout();
      });
      map.addEventListener('wheel',event=>{
        if(!event.ctrlKey)return;
        event.preventDefault();
        const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?map.clientHeight:1);
        zoomAt(view.zoom*Math.exp(-delta*.002),event.clientX,event.clientY);
      },{passive:false});
      let drag=null;
      map.addEventListener('pointerdown',event=>{
        if(view.zoom<=1||event.button!==0||event.target.closest('button,a'))return;
        drag={id:event.pointerId,x:event.clientX,y:event.clientY,viewX:view.x,viewY:view.y};
        map.setPointerCapture(event.pointerId);map.classList.add('is-dragging');
      });
      map.addEventListener('pointermove',event=>{
        if(!drag||event.pointerId!==drag.id)return;
        view.x=drag.viewX+event.clientX-drag.x;view.y=drag.viewY+event.clientY-drag.y;layout();
      });
      const stopDrag=()=>{drag=null;map.classList.remove('is-dragging');};
      map.addEventListener('pointerup',stopDrag);
      map.addEventListener('pointercancel',stopDrag);
      map.addEventListener('lostpointercapture',stopDrag);
      layouts.set(map,layout);layout();
    });
    mapResizeObserver=new ResizeObserver(entries=>entries.forEach(entry=>layouts.get(entry.target)?.()));
    maps.forEach(map=>mapResizeObserver.observe(map));
  }

  let overviewRotationTimer,overviewFadeTimer;
  let overviewInteractionUntil=0,overviewStatusSnapshot=null;
  function bindOverviewRotation(){
    clearTimeout(overviewRotationTimer);clearTimeout(overviewFadeTimer);
    const root=document.querySelector('.overview-network');
    if(state.page!=='overview'||!root)return;
    let nextRotation=Date.now()+5000;
    root.addEventListener('click',event=>{
      const button=event.target.closest('[data-review-site]');
      if(!button)return;
      const target=sites.find(s=>s.id===button.dataset.reviewSite);
      if(!target)return;
      state.site=target.id;state.siteTab='overview';state.page='sites';
      state.mapRegion=target.region==='Americas'?'usa':'apac';
      render();
    });
    const interact=()=>{
      overviewInteractionUntil=Date.now()+15000;
      clearTimeout(overviewFadeTimer);
      root.querySelector('.map-selection').classList.remove('is-changing');
    };
    ['pointerdown','click','keydown','wheel'].forEach(type=>root.addEventListener(type,interact,{capture:true,passive:true}));
    root.addEventListener('pointermove',event=>{if(event.buttons)interact();},{passive:true});
    const regionSites=()=>[...root.querySelectorAll('.global-node')].map(node=>sites.find(s=>s.id===node.dataset.site));
    const updateStatus=()=>{
      const visible=regionSites(),counts=mapLegendCounts(visible,true);
      Object.entries(counts).forEach(([key,value])=>{
        const el=root.querySelector(`[data-map-stat="${key}"]`);
        if(overviewStatusSnapshot?.region===state.mapRegion&&overviewStatusSnapshot[key]!==value){
          el.classList.remove('count-changed');void el.offsetWidth;el.classList.add('count-changed');
        }
        if(el.textContent!==value)el.textContent=value;
      });
      overviewStatusSnapshot={region:state.mapRegion,...counts};
      Object.entries(overviewSummaryValues()).forEach(([key,value])=>{
        const el=document.querySelector(`[data-overview-summary="${key}"]`);
        if(el&&el.textContent!==value)el.textContent=value;
      });
      const priority=overviewPrioritySite(),priorityEl=root.querySelector('[data-overview-priority]');
      const priorityKey=priority?`${priority.id}|${priority.name}|${priority.risk}`:'clear';
      priorityEl.dataset.risk=priority?.risk||'Low';
      if(priorityEl.dataset.priorityKey!==priorityKey){
        priorityEl.innerHTML=overviewPriorityHtml(priority);priorityEl.dataset.priorityKey=priorityKey;
      }
      root.querySelectorAll('.global-node').forEach(node=>{
        const s=visible.find(s=>s.id===node.dataset.site);
        node.classList.toggle('warn',s.risk==='Medium');node.classList.toggle('high-risk',s.risk==='High');
        node.setAttribute('aria-label',`Select ${s.name}, ${s.risk.toLowerCase()} water risk`);
        node.title=`${s.name} · ${s.risk} water risk · ${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}`;
      });
      const selection=root.querySelector('.map-selection'),selectionHtml=mapSelectionHtml(site());
      if(!selection.classList.contains('is-changing')&&selection.innerHTML!==selectionHtml)selection.innerHTML=selectionHtml;
    };
    const rotate=()=>{
      const visible=regionSites(),index=visible.findIndex(s=>s.id===state.site),next=visible[(index+1)%visible.length];
      if(!next||next.id===state.site)return;
      const selection=root.querySelector('.map-selection');
      const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(!reducedMotion)selection.classList.add('is-changing');
      overviewFadeTimer=setTimeout(()=>{
        if(!root.isConnected||Date.now()<overviewInteractionUntil)return;
        state.site=next.id;selection.innerHTML=mapSelectionHtml(next);
        selection.classList.remove('is-changing');
        root.querySelectorAll('.global-node').forEach(node=>{
          const active=node.dataset.site===next.id;
          node.classList.toggle('active',active);node.classList.toggle('is-rotating',active);
          node.setAttribute('aria-pressed',String(active));
        });
      },reducedMotion?0:150);
    };
    const tick=()=>{
      if(!root.isConnected||state.page!=='overview')return;
      const now=Date.now();updateStatus();
      if(document.hidden)nextRotation=now+5000;
      else if(now>=nextRotation&&now>=overviewInteractionUntil&&!root.querySelector('.is-dragging')){
        rotate();nextRotation=now+5000;
      }
      overviewRotationTimer=setTimeout(tick,250);
    };
    updateStatus();overviewRotationTimer=setTimeout(tick,250);
  }

  function leakEvidence(){ return `<button class="asset-plan" data-evidence="leak" aria-label="Open simulated IoT leak camera evidence"><span class="camera-label">SIMULATED IoT CAMERA · CAM 03</span><span class="camera-event">LEAK DETECTED · PIPE JOINT CW-2</span><span class="camera-open">Open evidence ↗</span></button>`; }
  function evidenceModal(){ return state.evidenceOpen?`<div class="evidence-modal" role="dialog" aria-modal="true" aria-label="Simulated leak camera evidence"><button class="evidence-close" data-close-evidence aria-label="Close evidence">×</button><div class="evidence-frame"><div class="evidence-head"><div><b>CAM 03 · COOLING WATER LOOP</b><span>Simulated IoT visual detection</span></div>${tag('ACTIVE LEAK','red')}</div><img src="assets/leak detected.png" alt="Simulated camera view of a cooling-water pipe leak with IoT detection overlays"><div class="evidence-foot"><span><b>Asset</b> Pipe Joint CW-2</span><span><b>Pressure drop</b> 0.8 bar</span><span><b>Estimated loss</b> 18.6 L/min</span><span><b>Confidence</b> 96%</span></div></div></div>`:''; }
  function siteRows(){ return `<div class="table-wrap"><table><thead><tr><th>Site</th><th>Location</th><th>Status</th><th>Water Risk</th><th>Capability</th><th>Current Mode</th><th>WUE</th><th>Reclaimed</th><th>Current Load</th><th>Updated</th></tr></thead><tbody>${sites.map(s=>`<tr data-site="${s.id}" class="clickable"><td><b class="table-site"><span>${iconSvg('site')}</span>${s.name}</b></td><td>${s.location}</td><td><i class="dot"></i>Online</td><td>${tag(s.risk,riskColor(s.risk))}</td><td>${tag(s.capability,'blue')}</td><td><b class="mode-state ${s.mode==='Dry Run'?'dry':'closed'}">${s.mode==='Dry Run'?'◇':'●'} ${s.mode}</b></td><td><b>${s.wue.toFixed(2)}</b> <span class="up">↓ ${Math.round((.49-s.wue)*100)}%</span></td><td>${s.reuse}%</td><td><b>${s.load} MW</b> ${spark([7,9,8,12,13,11,15])}</td><td>${s.updated}</td></tr>`).join('')}</tbody></table></div>`; }
  function jobsTable(compact=false){ return `<div class="table-wrap"><table><thead><tr><th>Job ID</th><th>Workload Type</th><th>Current Site</th>${compact?'':'<th>Suggested Site</th>'}<th>Runtime</th><th>Flexibility</th><th>Water Impact</th><th>Recommendation</th><th>Status</th></tr></thead><tbody>${Object.entries(jobs).map(([key,j])=>{const res=evaluate({...state.sim,job:key}),status=j.status||(j.critical?'Needs Review':'Queued');return `<tr class="clickable" data-job="${key}"><td><b>${j.id}</b></td><td>${j.type}</td><td>${sites.find(s=>s.id===j.site).name}</td>${compact?'':`<td>${sites.find(s=>s.id===j.suggested).name}</td>`}<td>${j.runtime} h</td><td>${tag(j.flex,j.flex==='High'?'green':j.flex==='Low'?'red':'amber')}</td><td>${tag(j.water,j.water==='High'?'red':j.water==='Low'?'green':'amber')}</td><td>${tag(res.action,actionColor(res.action))}</td><td>${tag(status,status==='Applied'?'green':status==='Needs Review'?'amber':'blue')}</td></tr>`}).join('')}</tbody></table></div>`; }

  function evaluate(c){
    const j=jobs[c.job]||jobs.training, thermal=Math.max(0,c.temp-30)*118, reusePenalty=(100-c.reuse)*7.2;
    const demand=Math.round((4300+thermal+reusePenalty+(jobWater[c.job]||900))/10)*10;
    let capacity=8000-(100-c.tank)*9-({normal:0,watch:320,restriction:900,emergency:1700}[c.community]||0)-({none:0,watch:360,high:1450}[c.leak]||0);
    capacity=Math.round(capacity/10)*10;
    const expected=Math.round((4850+thermal*.55+Math.max(0,50-c.reuse)*5)/10)*10;
    const residual=c.makeup-expected, leakHigh=c.leak==='high'||residual>1050;
    const unsafe=demand>capacity||c.tank<28||c.community==='emergency', projected=demand>capacity-450||c.temp>=40;
    let action='RUN NOW', reason='Capacity, SLA, and community reserve are within policy.';
    if(j.critical&&(unsafe||leakHigh||projected)&&!c.alt){ action='ESCALATE'; reason='Critical workload has no policy-compliant execution path.'; }
    else if(j.critical&&(unsafe||leakHigh||projected)&&c.alt){ action='MOVE SITE'; reason='Protect SLA by rerouting critical work to a safer site.'; }
    else if(leakHigh&&c.alt){ action='MOVE SITE'; reason='Loss anomaly exceeds tolerance; move workload away from affected water loop.'; }
    else if((unsafe||projected)&&c.alt&&c.community!=='normal'){ action='MOVE SITE'; reason='Alternative site has safer water capacity and community impact.'; }
    else if((unsafe||projected)&&c.future==='better'&&!j.critical){ action='DELAY'; reason='A safer forecast window exists before the workload deadline.'; }
    else if(unsafe||leakHigh||c.community==='restriction'||c.community==='emergency'){ action='LIMIT LOAD'; reason='No safe move window; reduce load to remain inside reserve policy.'; }
    else if(projected&&c.alt){ action='MOVE SITE'; reason='Forecast margin is thin; move to the lowest-risk available site.'; }
    else if(projected){ action='LIMIT LOAD'; reason='Reduce cooling demand until thermal margin recovers.'; }
    return {action,reason,demand,capacity,expected,residual,margin:capacity-demand,risk:Math.max(4,Math.min(99,Math.round((demand/capacity)*65+(100-c.tank)*.25+(c.leak==='high'?20:0))))};
  }

  function overview(){
    const summary=`<span class="overview-summary" aria-label="Network health and water risk">${Object.entries(overviewSummaryValues()).map(([key,value])=>`<span class="summary-${key}" data-overview-summary="${key}">${value}</span>`).join('')}</span>`;
    const priority=overviewPrioritySite();
    return pageHead('▥','Data Center Network Overview',summary,`<button class="btn" data-page="cases">Open Alerts</button><button class="btn primary" data-page="scheduler">Open Scheduler</button>`)+
      `<div class="overview-network">${card('Site Network Map','Select a marker to view site details',mapHtml(),`<div class="overview-priority" data-overview-priority data-risk="${priority?.risk||'Low'}">${overviewPriorityHtml(priority)}</div>`)}</div>`;
  }

  function sitesPage(){ const s=site(),hybrid=sites.filter(x=>x.capability==='Hybrid').length,dry=sites.filter(x=>x.mode==='Dry Run').length,closed=sites.filter(x=>x.mode==='Closed-Loop Cooling').length,avg=(sites.reduce((n,x)=>n+x.wue,0)/sites.length).toFixed(2); const tabBodies={
    overview:`<div class="grid2"><div><div class="site-image-wrap"><img class="site-photo site-photo-large" src="${siteImages[s.id]}" alt="Simulated operational view for ${s.name}"><span>SIMULATED OPERATIONS VIEW</span></div><p><b>Location:</b> ${s.location}</p><p><b>Coordinates:</b> ${s.lat.toFixed(4)}, ${s.lon.toFixed(4)}</p><p><b>Cooling capability:</b> ${s.capability} · switchable</p><p><b>Current operating mode:</b> ${s.mode}</p><p><b>Water sources:</b> ${s.source}</p></div><div class="mini-kpis"><div class="mini-kpi"><span>WUE</span><b>${s.wue} L/kWh</b><small>↓ 12%</small></div><div class="mini-kpi"><span>Reuse Ratio</span><b>${s.reuse}%</b><small>↑ 5%</small></div><div class="mini-kpi"><span>Current Load</span><b>${s.load} MW</b><small>↑ 3%</small></div><div class="mini-kpi"><span>Total Demand</span><b>${s.makeup} m³/h</b><small>↓ 6%</small></div>${lineChart([42,41,43,42,40,35,40,42],[40,40,40,40,40,40,40,40],'WUE','Target')}</div></div>`,
    assets:`<div class="grid3">${['Cooling Tower CT-1B','Makeup Flow Meter FM-MU','Chiller CH-02','Condenser Pump CP-2','Tank Level LT-01','Leak Zone B'].map((x,i)=>`<div class="mini-kpi"><span>${x}</span><b>${i===5?'Watch':'Online'}</b><small>${i===5?'Inspection due':'Telemetry normal'}</small></div>`).join('')}</div>`,
    performance:`${lineChart([43,42,41,44,40,38,42,41,39,40,42,38],[48,47,47,46,45,44,43,42,42,41,40,40],'WUE actual','WUE target')}`,
    water:`<div class="source-allocation">${donut(s.reuse,s.reuse+'%')}<div><h3>Source allocation</h3><p>Reclaimed water: ${s.reuse}%</p><p>Potable water: ${100-s.reuse}%</p><p>Storage level: ${s.tank}%</p></div></div>`,
    cases:`<div class="table-wrap"><table><thead><tr><th>Case</th><th>Severity</th><th>Summary</th><th>Status</th></tr></thead><tbody>${cases.filter(c=>c.site===s.name).map(c=>`<tr><td>${c.id}</td><td>${tag(c.severity,sevColor(c.severity))}</td><td>${c.summary}</td><td>${tag(c.status,'blue')}</td></tr>`).join('')||'<tr><td colspan="4">No open cases for this site.</td></tr>'}</tbody></table></div>`,
    settings:`<div class="grid2"><div class="field"><label>Cooling capability</label><input class="input" value="${s.capability} · switchable" disabled></div><div class="field"><label>Current operating mode</label><select class="select" id="site-mode"><option ${s.mode==='Closed-Loop Cooling'?'selected':''}>Closed-Loop Cooling</option><option ${s.mode==='Dry Run'?'selected':''}>Dry Run</option></select></div><div class="field"><label>Local reserve minimum</label><input class="input" id="site-reserve" value="20%"></div></div><button class="btn primary" id="save-site-settings">Save Site Settings</button>`
  }; return pageHead('▥','Site Portfolio Overview','Manage and monitor all data center sites in your network',`<button class="btn" data-download="sites">Export Sites</button>`)+
    `<div class="kpi-strip six">${kpi('▥','Total Sites',sites.length,'Global demo network')}${kpi('✓','Online Sites',sites.filter(x=>x.status==='Online').length,'100% of total')}${kpi('◆','Hybrid-Capable Sites',hybrid,'Can switch modes')}${kpi('●','Closed-Loop Now',closed,`${Math.round(closed/sites.length*100)}% of sites`)}${kpi('◇','Dry Run Now',dry,`${Math.round(dry/sites.length*100)}% of sites`)}${kpi('▥','Average Network WUE',`${avg} L/kWh`,'Synthetic telemetry')}</div><div class="network-grid">${card('Global Site Network Map','Use region tabs to verify exact coordinates',mapHtml())}${card('Site Directory','Capability and current mode are separate',siteRows(),`<input class="input" id="site-table-search" placeholder="Search sites…">`)}</div>
    <div class="site-cards gap">${sites.map((x,i)=>`<article class="card site-card ${x.id===s.id?'active':''}" data-site="${x.id}"><h3>${x.name} ${tag(x.risk+' Risk',riskColor(x.risk))} ${tag('Hybrid Capable','blue')}</h3><p>⌖ ${x.location} · <span class="up">● Online</span></p><div class="site-image-wrap"><img class="site-photo" src="${siteImages[x.id]}" style="object-position:${20+(i%4)*18}% center" alt="Simulated operational view for ${x.name}" loading="lazy"><span>SIMULATED OPERATIONS VIEW</span></div><div class="site-stats"><div class="stat"><span>WUE</span><b>${x.wue} L/kWh</b></div><div class="stat"><span>Current Mode</span><b class="mode-state ${x.mode==='Dry Run'?'dry':'closed'}">${x.mode}</b></div><div class="stat"><span>Reclaimed</span><b>${x.reuse}%</b></div><div class="stat"><span>Current Load</span><b>${x.load} MW</b></div></div></article>`).join('')}</div>
    <section class="card gap"><div class="card-head"><div><h2>Selected Site Profile: ${s.name}</h2><p>${s.location} · ${s.risk} water risk · ${s.mode}</p></div>${selectSite()}</div><div class="card-body"><div class="tabs">${['overview','assets','performance','water','cases','settings'].map(t=>`<button class="tab-btn ${state.siteTab===t?'active':''}" data-site-tab="${t}">${t[0].toUpperCase()+t.slice(1)}</button>`).join('')}</div><div style="padding-top:10px">${tabBodies[state.siteTab]}</div></div></section>`; }

  function monitoring(){ const s=site(); return pageHead('⌁','Monitoring','Real-time monitoring of water systems, equipment, and environmental conditions',`${selectSite()}<select class="select"><option>Last 24 Hours</option><option>Last 7 Days</option></select>${tag('● Auto Refresh','green')}`)+
    `<div class="monitor-grid">
      ${card('☁ Weather Monitoring & Forecast','Outdoor conditions and forecast',`<div class="weather-row"><div class="weather-cell"><i>♨</i><b>32°C</b><span>Feels 37°C</span></div><div class="weather-cell"><i>◉</i><b>78%</b><span>Humidity</span></div><div class="weather-cell"><i>♧</i><b>27°C</b><span>Wet-bulb</span></div><div class="dry-card"><b>${s.mode==='Dry Run'?'◇ Dry Run Active':'✓ Dry Run Eligible'}</b><small>Hybrid capability</small><button id="switch-dry">${s.mode==='Dry Run'?'Switch Back to Closed-Loop':'Switch to Dry Run'}</button></div></div>${lineChart([29,29,30,31,32,31,32,33,32,31,30,29],[24,24,24,25,26,27,27,27,26,26,25,25],'Ambient','Wet-bulb')}`,selectSite())}
      ${card('⌁ Live Condition Monitoring','Real-time operational metrics',`<div class="mini-kpis">${[['IT Load',s.load+' MW'],['Cooling Load','28 MW'],['WUE',s.wue+' L/kWh'],['Makeup Water',s.makeup+' m³/h'],['Tank Level',s.tank+'%'],['Pressure',s.pressure+' kPa'],['Supply Temp',s.supply+'°C'],['Return Temp',s.temp+'°C'],['Reclaimed',s.reuse+'%']].map(x=>`<div class="mini-kpi"><span>${x[0]}</span><b>${x[1]}</b>${spark()}</div>`).join('')}</div>`,selectSite())}
      ${card('◆ Leakage Monitoring','Camera, pressure and flow anomaly detection',`<div class="mini-kpis"><div class="mini-kpi"><b>24</b><span>Leak Sensors</span></div><div class="mini-kpi"><b>1</b><span>Visual Detection</span></div><div class="mini-kpi"><b>18.6 L/min</b><span>Estimated Loss</span></div></div><div class="alert-strip">Pipe Joint CW-2: visible leak + 0.8 bar pressure drop confirmed.</div>${leakEvidence()}<button class="btn gap" data-page="cases">View leak case</button>`,selectSite())}
      ${card('♻ Loss & Reuse Monitoring','Water balance and reuse performance',`<div class="mini-kpis"><div class="mini-kpi"><span>Expected Use</span><b>480 m³/h</b></div><div class="mini-kpi"><span>Actual Use</span><b>465 m³/h</b></div><div class="mini-kpi"><span>Variance</span><b class="up">↓ 3%</b></div></div><div style="display:flex;align-items:center;gap:12px;margin:9px 0">${donut(s.reuse,s.reuse+'%')}<div style="font-size:.58rem;line-height:1.7">Potable ${100-s.reuse}%<br>Reclaimed ${s.reuse}%<br>Evaporation 10.2 m³/h<br>Blowdown 5.6 m³/h</div></div>${tag('Reuse ratio ↑ 8%','green')}`,selectSite())}
    </div><div class="trend-grid">${card('⌁ Key Metric Trends','Critical parameters over time',lineChart([18,20,23,29,28,31,35,42,39,33,29,27],[7,9,10,14,13,16,18,22,20,17,15,14],'Total usage','Reclaimed'))}${card('▥ Site KPI Comparison','Live portfolio comparison',sites.map(x=>`<div class="bar-row"><b>${x.name}</b><div class="hbar"><i style="width:${x.load/55*100}%"></i></div><span>${x.makeup} m³/h</span></div>`).join(''))}${card('♣ Alerts & Events','Real-time operational events',`<div class="table-wrap"><table><thead><tr><th>Severity</th><th>Site</th><th>Message</th><th>Status</th></tr></thead><tbody>${cases.slice(0,4).map(c=>`<tr><td>${tag(c.severity,sevColor(c.severity))}</td><td>${c.site}</td><td>${c.summary}</td><td>${tag(c.status,'blue')}</td></tr>`).join('')}</tbody></table></div>`)}</div>`; }

  function analytics(){ return pageHead('▥','Analytics','Advanced trends to improve water efficiency, reduce risk, and optimize operations',`${selectSite()}<select class="select"><option>Last 30 Days</option><option>Last 7 Days</option></select><button class="btn primary" data-download="analytics">Export</button>`)+
    `<div class="analytics-kpis">${[['◆','Water Saved This Month','48,200 m³','↑ 18%'],['◉','Potable Water Avoided','65,400 m³','↑ 24%'],['♻','Average Reclaimed Ratio','68%','↑ 7%'],['✓','Water Risk Reduced','32%','↓ 32%'],['⚙','Scheduler Impact','28,400 m³','↑ 20%']].map(x=>`<div class="card hero-kpi"><i>${iconSvg(x[1])}</i><span>${x[1]}</span><b>${x[2]}</b><small class="up">${x[3]} vs previous month</small>${spark()}</div>`).join('')}</div>
    <div class="analytics-main">${card('WUE Trend (All Sites)','Lower is better',lineChart([55,53,50,49,46,48,45,44,43,42,44,42],[40,40,40,40,40,40,40,40,40,40,40,40],'WUE actual','Target'))}${card('Water Demand vs Safe Capacity','Daily demand compared to capacity',lineChart([28,32,30,35,40,44,47,53,49,55,48,44],[62,62,62,62,62,62,62,62,62,62,62,62],'Demand','Safe capacity'))}${card('Site Comparison – Total Water Use','Reclaimed and potable breakdown',sites.map(x=>`<div class="bar-row"><b>${x.name}</b><div class="hbar"><i style="width:${x.makeup/250*100}%"></i></div><span>${x.makeup*250} m³</span></div>`).join(''))}</div>
    <div class="analytics-sub">${card('Current Cooling Mode Utilization','All sites are Hybrid-capable; this chart shows the active mode',`<div style="display:flex;align-items:center;gap:15px">${donut(50,'50%')}<div style="font-size:.6rem;line-height:2"><b>Hybrid capability: 100%</b><br>Closed-Loop Cooling: 50%<br>Dry Run: 50%</div></div>`)}${card('Workload Impact by Type','Water consumption by workload',[['AI Training',42],['Model Inference',26],['Batch Processing',18],['General Compute',10],['Data Storage',4]].map(x=>`<div class="bar-row"><span>${x[0]}</span><div class="hbar"><i style="width:${x[1]*2}%"></i></div><b>${x[1]}%</b></div>`).join(''))}${card('Water Stress vs Water Demand by Site','Portfolio risk distribution',`<div style="height:190px;position:relative;background:linear-gradient(#fff,#f4fafc);border-left:1px solid #ccdfe7;border-bottom:1px solid #ccdfe7">${sites.map((s,i)=>`<button data-site="${s.id}" style="position:absolute;left:${10+i*80/(sites.length-1)}%;bottom:${20+s.load}px;border:0;background:${riskColor(s.risk)==='amber'?'#f2a000':'#0ba98b'};color:white;border-radius:50%;width:${28+s.load/3}px;height:${28+s.load/3}px;font-size:.48rem">${s.name.replace(' DC1','')}</button>`).join('')}</div>`)}${card('Top Insights','Prioritized operational findings',`<div class="insight"><i>♻</i><span>Reclaimed-water usage rose 9 percentage points across all sites.</span></div><div class="insight"><i>▥</i><span>Johor achieved 24% lower WUE after scheduler optimization.</span></div><div class="insight"><i>✓</i><span>Penang remains the highest regional water-risk site.</span></div>`)}</div>${card('Site Comparison – Key Water Analytics','Performance and optimization impact by site',siteRows())}`; }

  function simControls(){ const c=state.sim, control=(label,key,min,max,step=1)=>`<div class="sim-control"><label>${label}<b>${c[key]}${key==='temp'?'°C':key==='tank'||key==='reuse'?'%':''}</b></label><input type="range" min="${min}" max="${max}" step="${step}" value="${c[key]}" data-sim="${key}"></div>`; return `<div class="sim-grid"><div class="sim-control"><label>Workload</label><select data-sim="job">${Object.entries(jobs).map(([k,j])=>`<option value="${k}" ${c.job===k?'selected':''}>${j.id} · ${j.type}</option>`).join('')}</select></div>${control('Ambient temperature','temp',24,46)}${control('Tank level','tank',10,100)}${control('Reclaimed water','reuse',0,100)}${control('Makeup meter','makeup',4000,9000,50)}<div class="sim-control"><label>Community state</label><select data-sim="community">${['normal','watch','restriction','emergency'].map(x=>`<option ${c.community===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="sim-control"><label>Leak signal</label><select data-sim="leak">${['none','watch','high'].map(x=>`<option ${c.leak===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="sim-control"><label>Safe alternative</label><select data-sim="alt"><option value="true" ${c.alt?'selected':''}>Available</option><option value="false" ${!c.alt?'selected':''}>Unavailable</option></select></div></div>`; }
  function scheduler(){ const r=evaluate(state.sim), job=jobs[state.sim.job]; return pageHead('▣','Scheduler','Water-aware workload orchestration with policy constraints',`<button class="btn" data-case-tab="tests" data-page="cases">Open Test Lab</button><button class="btn primary" id="run-optimizer">Run Optimizer</button>`)+
    `<div class="kpi-strip">${kpi('▤','Jobs Queued','48','↑ 12% vs last 24h','down')}${kpi('▣','Jobs Scheduled','220','↑ 8%')}${kpi('⇆','Moves Recommended','14','↑ 27%')}${kpi('◷','Delays Recommended','8','↑ 33%','down')}${kpi('◆','Water Impact Avoided','465 m³','↑ 42%')}</div>
    <div class="scheduler-top"><section class="card recommendation"><h2>★ Top Recommendation</h2><h3>Move JOB-317 from Johor DC1 to Selangor DC1</h3><p>Selangor has lower water risk and available capacity. Estimated 28 m³ water savings with no SLA impact.</p><div class="move-flow"><div class="site-box"><b>Johor DC1</b><small>Medium water risk</small></div><div class="arrow-big">⇢</div><div class="site-box target"><b>Selangor DC1</b><small>Low water risk</small></div></div><div style="text-align:right;margin-top:9px"><button class="btn primary" data-apply-job="training">Apply Recommendation</button> <button class="btn" data-job="training">View Details</button></div></section>
    ${card('⚙ Scheduler Rules & Constraints','Active decision policies',`<div class="rule-list">${[['◷','SLA Requirements','Business critical ≤ 4h delay'],['◆','Water Capacity','Do not exceed 85% forecast capacity'],['♣','Community Reserve','Maintain ≥ 15% reserve'],['⚠','Leak Condition','Avoid sites with active leaks'],['♻','Reclaimed-water Policy','Prioritize ≥ 60% reuse']].map((x,i)=>`<div class="rule"><span class="rule-icon">${iconSvg(['schedule','water','water','alert','reuse'][i])}</span><b>${x[1]}</b><span>${x[2]}</span>${tag('● Active','green')}</div>`).join('')}</div>`,`<button class="btn" data-page="settings">Edit Rules</button>`)}</div>
    <section class="card gap"><div class="card-head"><div><h2>Simulation Workbench</h2><p>Change conditions to see the scheduler decision update immediately.</p></div></div><div class="card-body"><div class="grid2"><div>${simControls()}</div><div class="decision"><span>RECOMMENDED ACTION</span><h2>${r.action}</h2><p>${r.reason}</p><div class="decision-kpis"><div><span>Demand</span><b>${r.demand} m³</b></div><div><span>Capacity</span><b>${r.capacity} m³</b></div><div><span>Risk Score</span><b>${r.risk}/100</b></div></div><div style="margin-top:10px"><button class="btn primary" data-apply-job="${state.sim.job}">Apply ${r.action}</button></div></div></div></div></section>
    ${card('Workload Queue & Recommendations','Click a row to load the workload into the simulator',jobsTable())}
    <div class="scheduler-bottom">${card('Schedule Timeline (Next 24 Hours)','',`<div class="timeline">${sites.map((s,i)=>`<div class="timeline-label">${s.name}</div><div class="timeline-track"><span class="job-block" style="left:${8+i*9}%;width:${17+i*2}%;background:${['#7759dd','#12a87f','#ec9c13','#087fda'][i]}">JOB-${317+i}</span><span class="job-block" style="left:${55-i*5}%;width:22%;background:${['#ef5d68','#e89d13','#7456de','#2a9dde'][i]}">JOB-${325+i}</span></div>`).join('')}</div>`)}${card('Forecast Water Capacity','Scheduled workloads included',lineChart([20,17,15,19,21,24,25,27,30,38,35,30],[42,42,42,42,42,42,42,42,42,42,42,42],'Demand','Safe limit'))}${card('Action Summary','',`<div class="action-summary"><b>✓</b><span>Run Now</span><b>12</b></div><div class="action-summary"><b>◷</b><span>Delay</span><b>8</b></div><div class="action-summary"><b>⇆</b><span>Move Site</span><b>14</b></div><div class="action-summary"><b>▥</b><span>Limit Load</span><b>6</b></div><div class="action-summary"><b>⚠</b><span>Escalate</span><b>3</b></div>`)}</div>`; }

  const reportNames=['Daily Operations Report','Weekly Water Risk Review','Reuse Performance Report','Leak & Loss Summary','Scheduler Impact Report'];
  function reports(){ return pageHead('▤','Reports','Generate, view, and export water, risk, and operations reports',`${selectSite()}<select class="select"><option>Last 30 Days</option><option>Today</option></select><button class="btn primary" id="generate-report">Generate Report</button>`)+
    `<div class="kpi-strip four">${kpi('▤','Reports Generated','28','↑ 12%')}${kpi('▣','Scheduled Reports','6','No change')}${kpi('◷','Pending Approval','3','↑ 50%','down')}${kpi('⇩','Last Export','Today 14:32','Weekly Water Risk Review')}</div>
    <div class="report-layout"><section class="card"><div class="card-head"><div><h2>Report Library</h2><p>Select a report template</p></div></div><div class="card-body">${reportNames.map((r,i)=>`<button class="report-item ${state.report===r?'active':''}" data-report="${r}" style="width:100%;text-align:left;background:${state.report===r?'#edf8fd':'white'}"><i>${iconSvg(['report','analytics','reuse','alert','scheduler'][i])}</i><span><b>${r}</b><span>${['Operational summary of water use and events.','Site risk trends and forecast recommendations.','Recovery rates and sustainability metrics.','Detected leaks, losses, and resolution status.','Scheduling impact on water and performance.'][i]}</span></span><b>›</b></button>`).join('')}</div></section>
    <section class="card"><div class="card-head"><div><h2>Report Preview: ${state.report}</h2><p>Reporting period · Current operational window${state.reportGeneratedAt?` · Generated ${state.reportGeneratedAt}`:''}</p></div><button class="btn primary" data-download="report">Export Report</button></div><div class="card-body report-preview"><div class="cover"><div><b style="color:#087fda">AQUASHIFT</b><h2>${state.report}</h2><p>Water-Aware Data Center Operations</p></div><div><b>All Sites</b><br><small>Generated for operations leadership</small></div></div><div><div class="preview-grid">${kpi('◆','Total Water Use','465 m³/h','↓ 8%')}${kpi('♻','Reuse Rate','76%','↑ 5%')}${kpi('⚠','Active Alerts','3','↑ 1','down')}${kpi('✓','System Uptime','98%','Stable')}</div>${card('Water Use Trend','',lineChart([43,42,41,40,42,46,50,49,55,58,52,48],[28,27,27,26,28,32,36,35,42,45,40,35],'Total use','Reclaimed'))}</div></div></section></div>
    <div class="audit-grid">${card('Report Schedule','Automated delivery and recipients',`<div class="table-wrap"><table><thead><tr><th>Report</th><th>Frequency</th><th>Recipients</th><th>Next Run</th><th>Status</th></tr></thead><tbody>${reportNames.map((x,i)=>`<tr><td>${x}</td><td>${['Daily 08:00','Weekly Monday','Monthly 1st','Weekly Friday','Monthly 15th'][i]}</td><td>Ops Team</td><td>Upcoming</td><td>${tag(i===4?'Paused':'Active',i===4?'gray':'green')}</td></tr>`).join('')}</tbody></table></div>`)}${card('Recent Reports & Audit Trail','History of generated reports and exports',`<div class="table-wrap"><table><thead><tr><th>Generated</th><th>Report</th><th>Site(s)</th><th>Format</th><th>Status</th></tr></thead><tbody>${reportNames.map((x,i)=>`<tr><td>Today ${14-i}:32</td><td>${x}</td><td>${i%2?'Johor DC1':'All Sites'}</td><td>${tag(i%2?'CSV':'PDF',i%2?'green':'red')}</td><td>${tag('Completed','green')}</td></tr>`).join('')}</tbody></table></div>`)}</div>`; }

  function testLab(){ const rows=tests.filter(t=>state.testFilter==='ALL'||t.expected===state.testFilter); return `<section class="card"><div class="test-toolbar"><div class="filters">${['ALL','RUN NOW','DELAY','MOVE SITE','LIMIT LOAD','ESCALATE'].map(x=>`<button class="btn ${state.testFilter===x?'active':''}" data-test-filter="${x}">${x}</button>`).join('')}</div><button class="btn primary" id="run-all-tests">Run All 24 Tests</button></div><div class="test-scroll table-wrap"><table><thead><tr><th>ID</th><th>Scenario</th><th>Inputs</th><th>Expected</th><th>Actual</th><th>Result</th><th></th></tr></thead><tbody>${rows.map(t=>{const actual=evaluate(t).action,result=state.testResults[t.id];return `<tr><td><b>${t.id}</b></td><td>${t.name}</td><td>${t.temp}°C · Tank ${t.tank}% · Reuse ${t.reuse}% · ${t.community}</td><td>${tag(t.expected,actionColor(t.expected))}</td><td>${result?tag(actual,actionColor(actual)):'—'}</td><td>${result?`<span class="${actual===t.expected?'pass':'fail'}">${actual===t.expected?'PASS':'FAIL'}</span>`:'Not run'}</td><td><button class="btn" data-load-test="${t.id}">Load</button></td></tr>`}).join('')}</tbody></table></div></section>`; }
  function casesPage(){ const c=cases.find(x=>x.id===state.caseId)||cases[0]; if(state.caseTab==='tests') return pageHead('◉','Scheduler Test Lab','24 deterministic scenarios covering every decision branch',`<button class="btn" data-download="tests">Export Results</button>`)+`<div class="case-tabs"><button class="btn" data-case-tab="alerts">Cases & Alerts</button><button class="btn active" data-case-tab="tests">Scheduler Test Lab</button></div>${testLab()}`;
    return pageHead('♣','Case Management','Investigate and resolve incidents, anomalies, and operational issues',`<button class="btn" data-download="cases">Export Cases CSV</button><button class="btn primary" data-case-action="create">Create Case</button>`)+
    `<div class="case-tabs"><button class="btn active" data-case-tab="alerts">Cases & Alerts</button><button class="btn" data-case-tab="tests">Scheduler Test Lab</button></div><div class="case-kpis">${kpi('⚠','Open Cases','18','↑ 29%','down')}${kpi('⚠','Critical Cases','4','↑ 100%','down')}${kpi('◷','Under Investigation','7','↑ 17%','down')}${kpi('✓','Resolved Today','6','↑ 50%')}</div>
    <section class="card gap"><div class="card-body"><div class="filterbar"><input class="input" placeholder="Search by ID, summary, or site"><select class="select"><option>All Sites</option></select><select class="select"><option>All Types</option></select><select class="select"><option>All Severities</option></select><select class="select"><option>All Statuses</option></select><button class="btn" id="more-filters">${state.advancedFilters?'Hide Filters':'More Filters'}</button></div>${state.advancedFilters?'<div class="advanced-filter-panel"><label>Owner <select class="select"><option>All Owners</option><option>Current Operator</option></select></label><label>Created <select class="select"><option>Any time</option><option>Last 24 hours</option></select></label><label><input type="checkbox"> Include resolved cases</label></div>':''}<div class="table-wrap"><table><thead><tr><th>Severity</th><th>Case ID</th><th>Site</th><th>Case Type</th><th>Summary</th><th>Owner</th><th>Age</th><th>Status</th><th>Next Action</th></tr></thead><tbody>${cases.map(x=>`<tr class="clickable ${x.id===c.id?'selected':''}" data-case-select="${x.id}"><td>${tag(x.severity,sevColor(x.severity))}</td><td><b>${x.id}</b></td><td>${x.site}</td><td>${x.type}</td><td>${x.summary}</td><td>${x.owner}</td><td>${x.age}</td><td>${tag(x.status,x.status==='Resolved'?'green':'amber')}</td><td>${x.action}</td></tr>`).join('')}</tbody></table></div></div></section>
    <section class="card gap"><div class="card-head"><div><h2>Selected Case: ${c.id} · ${c.summary}</h2><p>${c.severity} · ${c.site} · Owner ${c.owner}</p></div><div><button class="btn" data-case-action="assign">Assign</button> <button class="btn danger" data-case-action="escalate">Escalate</button> <button class="btn" data-case-action="work-order">Create Work Order</button> <button class="btn success" data-case-action="resolve">Resolve</button></div></div><div class="card-body case-detail-grid">
      <div>${card('Location & Site Context','',mapHtml())}${card('Case Information','',`<p><b>Case ID:</b> ${c.id}</p><p><b>Type:</b> ${c.type}</p><p><b>Severity:</b> ${tag(c.severity,sevColor(c.severity))}</p><p><b>Status:</b> ${c.status}</p>`)}</div>
      <div>${card('Related Sensor Evidence','Return Water Temperature · latest 32.8°C',lineChart([26,27,29,31,30,28,30,31,32,36,37,37],[34,34,34,34,34,34,34,34,34,34,34,34],'Return temperature','High threshold'))}${card('Notes','',`<p><b>A. Rahman</b> · 45 min ago<br>Temperature continues to trend upward. Checking cooling tower fan operation.</p><hr><p><b>J. Tan</b> · 1h 20m ago<br>Field team dispatched. ETA 30 minutes.</p>`)}</div>
      ${card('Case Timeline','',`<div class="timeline-event"><span>2h 15m</span><i></i><b>Case created</b></div><div class="timeline-event"><span>2h 10m</span><i></i><b>Assigned to ${c.owner}</b></div><div class="timeline-event"><span>1h 45m</span><i></i><b>Initial investigation</b></div><div class="timeline-event"><span>1h 20m</span><i></i><b>Site inspection requested</b></div><div class="timeline-event"><span>Pending</span><i></i><b>Awaiting field results</b></div>`)}
      ${card('Recommended Response','',`<div class="response">1. Verify cooling tower fan and VFD status</div><div class="response">2. Inspect for fouling or reduced flow</div><div class="response">3. Check makeup-water valve and quality</div><div class="response">4. Limit load if temperature exceeds 32°C</div><button class="btn primary" style="width:100%" data-case-action="work-order">Create Work Order</button>`)}</div></section>`; }

  function settings(){ const saved=JSON.parse(localStorage.getItem('aquashift-settings')||'{}'); const val=(k,d)=>saved[k]??d; return pageHead('⚙','Scheduler Policies','Configure rules and constraints for water-aware scheduling',`<button class="btn" id="cancel-settings">Cancel</button><button class="btn primary" id="save-settings">Save Changes</button>`)+
    `<div class="settings-layout"><section class="card settings-nav">${['General','Sites & Assets','Water Sources','Scheduler Policies','Alerts','Users & Roles','Integrations','Reporting Preferences'].map(x=>`<button class="settings-link ${x==='Scheduler Policies'?'active':''}" data-toast="${x} settings selected">${x}</button>`).join('')}</section><div class="policy-grid">
      ${policy('◆','Water-Risk Thresholds','Define low, medium, and high site risk.','risk',val('risk',.40),'number')}${policy('♣','Community Reserve Minimum','Reserve water for community and essential needs.','reserve',val('reserve',20),'number')}${policy('♻','Reclaimed-Water Preference','Minimum reclaimed water usage.','reuse',val('reuse',65),'number')}
      ${policy('▣','Potable-Water Caps','Maximum WUE in normal operations.','cap',val('cap',.30),'number')}${policy('⚠','Leak Response Policy','Automatic action when a leak is detected.','leak',val('leak','Switch to Dry Run'),'select',['Switch to Dry Run','Limit Load','Escalate'])}${policy('⚑','Escalation Rules','Escalation time for sustained high risk.','escalation',val('escalation',2),'number')}
      ${policy('↻','Dry-Run Switching Rules','Water risk threshold for dry-run mode.','dry',val('dry',.40),'number')}${policy('☷','Operational Constraints','Maximum site load reduction.','load',val('load',50),'number')}${policy('◷','Scheduling Window','Optimization horizon in hours.','horizon',val('horizon',24),'number')}
    </div></div>${card('Integration Status','External systems and data sources',`<div class="connections">${['IoT Sensors','Weather API','Utility Data Feed','Kubernetes Connector','SLURM Connector','Report Destinations'].map(x=>`<div class="connection"><b>${x}</b><span>● Connected</span><p>Last sync: ${Math.ceil(Math.random()*12)} min ago</p><button class="btn" data-toast="${x} connection healthy">Test</button></div>`).join('')}</div>`, `<button class="btn" data-toast="All integrations are healthy">Test All Connections</button>`)}`; }
  function policy(icon,title,desc,key,value,type,options=[]){ return `<section class="card policy"><h3>${icon} ${title}</h3><p>${desc}</p><div class="field"><label>${title}</label>${type==='select'?`<select data-setting="${key}">${options.map(x=>`<option ${x===value?'selected':''}>${x}</option>`).join('')}</select>`:`<input data-setting="${key}" type="${type}" value="${value}" step="0.05">`}</div><p><span class="toggle on"></span> Policy active</p></section>`; }

  const pages={overview,sites:sitesPage,monitoring,analytics,scheduler,reports,cases:casesPage,settings};
  function render(preserveScroll=false){
    const previousScroll=window.scrollY,nav=$('#primary-nav');
    nav.innerHTML=NAV.map(n=>`<button class="nav-btn ${state.page===n[0]?'active':''}" data-page="${n[0]}" aria-label="${n[2]}" ${state.page===n[0]?'aria-current="page"':''}><i>${iconSvg(n[2])}</i>${n[2]}</button>`).join('');
    const active=nav.querySelector('[aria-current="page"]');
    if(active&&nav.scrollWidth>nav.clientWidth)nav.scrollLeft=active.offsetLeft-(nav.clientWidth-active.offsetWidth)/2;
    app.innerHTML=(pages[state.page]||overview)()+evidenceModal();
    bind();
    if(preserveScroll)requestAnimationFrame(()=>window.scrollTo(0,previousScroll));
    else window.scrollTo({top:0,behavior:'instant'});
  }
  async function pollExternalSimulation(){
    try{
      const response=await fetch('/api/simulation/latest',{cache:'no-store'});if(!response.ok)return;
      const event=await response.json();if(!event.version||event.version<=state.simulationVersion||!event.input)return;
      state.simulationVersion=event.version;state.sim={...event.input};
      const target=sites.find(s=>s.id===event.siteId);if(target){state.site=target.id;target.temp=event.input.temp;target.tank=event.input.tank;target.reuse=event.input.reuse;target.makeup=Math.round(event.input.makeup/24);target.community=event.input.community[0].toUpperCase()+event.input.community.slice(1);target.risk=event.result.riskScore>=75?'High':event.result.riskScore>=48?'Medium':'Low';target.mode=event.input.temp<=28?'Dry Run':'Closed-Loop Cooling';target.updated='just now';}
      state.page='scheduler';render();toast(`${event.testCaseId||'External scenario'} received · ${event.result.action}`);
    }catch{/* Local static preview may not expose the simulation API. */}
  }
  const siteExportRows = () => sites.map(s=>({
    Site_ID:s.id,Site_Name:s.name,Location:s.location,Country:s.country,Region:s.region,
    Latitude:s.lat,Longitude:s.lon,Status:s.status,Water_Risk:s.risk,Cooling_Capability:s.capability,Current_Operating_Mode:s.mode,
    WUE_L_per_kWh:s.wue,Reclaimed_Water_pct:s.reuse,IT_Load_MW:s.load,Tank_Level_pct:s.tank,
    Makeup_Water_m3_per_h:s.makeup,Supply_Temp_C:s.supply,Return_Temp_C:s.temp,
    Condenser_Pressure_kPa:s.pressure,Sensors_Online:s.sensors,Community_State:s.community,
    Utility_Partner:s.utility,Water_Sources:s.source,Last_Updated:s.updated,Data_Type:'SIMULATED'
  }));
  function csvRows(kind){
    const generated=new Date().toISOString();
    if(kind==='sites') return siteExportRows();
    if(kind==='analytics') return sites.map(s=>({Generated_At:generated,Site:s.name,Region:s.region,WUE_L_per_kWh:s.wue,Total_Water_m3_per_h:s.makeup,Reclaimed_Share_pct:s.reuse,Potable_Share_pct:100-s.reuse,Estimated_Loss_m3_per_h:Number((s.makeup*.039).toFixed(1)),IT_Load_MW:s.load,Water_Risk:s.risk,Cooling_Capability:s.capability,Current_Operating_Mode:s.mode,Data_Type:'SIMULATED'}));
    if(kind==='tests') return tests.map(t=>{const actual=evaluate(t).action;return {Test_ID:t.id,Scenario:t.name,Site_ID:state.site,Workload:t.job,Ambient_Temp_C:t.temp,Tank_Level_pct:t.tank,Reclaimed_Water_pct:t.reuse,Makeup_Window_m3:t.makeup,Community_State:t.community,Leak_State:t.leak,Safe_Alternative:t.alt,Future_Window:t.future,Expected_Outcome:t.expected,Actual_Outcome:actual,Result:actual===t.expected?'PASS':'FAIL'};});
    if(kind==='report') return siteExportRows().map(row=>({Report_Name:state.report,Generated_At:generated,...row}));
    if(kind==='cases') return cases.map(c=>({Case_ID:c.id,Severity:c.severity,Site:c.site,Type:c.type,Summary:c.summary,Owner:c.owner,Age:c.age,Status:c.status,Next_Action:c.action,Data_Type:'SIMULATED'}));
    return [{Generated_At:generated,Selected_Site:site().name,Selected_Page:state.page,Data_Type:'SIMULATED'}];
  }
  function downloadCsv(kind){
    const rows=csvRows(kind), headers=Object.keys(rows[0]||{}), quote=v=>`"${String(v??'').replaceAll('"','""')}"`;
    const content='\ufeff'+[headers.map(quote).join(','),...rows.map(r=>headers.map(h=>quote(r[h])).join(','))].join('\r\n');
    const blob=new Blob([content],{type:'text/csv;charset=utf-8'}), a=document.createElement('a');
    a.href=URL.createObjectURL(blob);a.download=`aquashift-${kind}-${new Date().toISOString().slice(0,10)}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast(`${rows.length} data rows exported to ${a.download}`);
  }
  function bind(){
    bindMapMarkers();
    bindOverviewRotation();
    document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>{state.page=el.dataset.page;if(el.dataset.caseTab)state.caseTab=el.dataset.caseTab;render()}));
    document.querySelectorAll('[data-site]').forEach(el=>el.addEventListener('click',()=>{state.site=el.dataset.site;render()}));
    document.querySelectorAll('[data-map-region]').forEach(el=>el.addEventListener('click',()=>{state.mapRegion=el.dataset.mapRegion;const region=state.mapRegion==='usa'?'Americas':state.mapRegion==='apac'?'Asia Pacific':null;if(region&&site().region!==region)state.site=sites.find(s=>s.region===region).id;render(true)}));
    document.querySelectorAll('.site-select').forEach(el=>el.addEventListener('change',()=>{state.site=el.value;render()}));
    document.querySelectorAll('[data-site-tab]').forEach(el=>el.addEventListener('click',()=>{state.siteTab=el.dataset.siteTab;render(true)}));
    document.querySelectorAll('[data-case-tab]').forEach(el=>el.addEventListener('click',()=>{state.caseTab=el.dataset.caseTab;state.page='cases';render(true)}));
    document.querySelectorAll('[data-case-select]').forEach(el=>el.addEventListener('click',()=>{state.caseId=el.dataset.caseSelect;state.page='cases';state.caseTab='alerts';render()}));
    document.querySelectorAll('[data-report]').forEach(el=>el.addEventListener('click',()=>{state.report=el.dataset.report;render()}));
    document.querySelectorAll('[data-job]').forEach(el=>el.addEventListener('click',()=>{state.sim.job=el.dataset.job;state.page='scheduler';render()}));
    document.querySelectorAll('[data-sim]').forEach(el=>el.addEventListener('input',()=>{let v=el.value;if(el.type==='range'||el.dataset.sim==='temp'||el.dataset.sim==='makeup')v=Number(v);if(el.dataset.sim==='alt')v=v==='true';state.sim[el.dataset.sim]=v;render()}));
    document.querySelectorAll('[data-toast]').forEach(el=>el.addEventListener('click',()=>toast(el.dataset.toast)));
    document.querySelectorAll('[data-download]').forEach(el=>el.addEventListener('click',()=>downloadCsv(el.dataset.download)));
    document.querySelectorAll('[data-test-filter]').forEach(el=>el.addEventListener('click',()=>{state.testFilter=el.dataset.testFilter;render(true)}));
    document.querySelectorAll('[data-load-test]').forEach(el=>el.addEventListener('click',()=>{const t=tests.find(x=>x.id===el.dataset.loadTest);state.sim={...t};state.page='scheduler';render();toast(`${t.id} loaded into simulator`)}));
    const run=$('#run-all-tests'); if(run)run.addEventListener('click',()=>{tests.forEach(t=>state.testResults[t.id]=evaluate(t).action);render();const passed=tests.filter(t=>state.testResults[t.id]===t.expected).length;toast(`${passed}/24 scheduler tests passed`)});
    const optimize=$('#run-optimizer'); if(optimize)optimize.addEventListener('click',()=>{const result=evaluate(state.sim);toast(`Optimizer complete · ${result.action} · risk ${result.risk}/100`)});
    document.querySelectorAll('[data-apply-job]').forEach(el=>el.addEventListener('click',()=>{const key=el.dataset.applyJob,j=jobs[key],result=evaluate({...state.sim,job:key});if(result.action==='MOVE SITE'&&j.suggested)j.site=j.suggested;j.status='Applied';render();toast(`${result.action} applied to ${j.id}`)}));
    const dry=$('#switch-dry'); if(dry)dry.addEventListener('click',()=>{const selected=site(),next=selected.mode==='Dry Run'?'Closed-Loop Cooling':'Dry Run';selected.mode=next;state.cooling[state.site]=next;render();toast(`${selected.name} switched to ${next} mode · Hybrid capability remains active`)});
    document.querySelectorAll('[data-evidence]').forEach(el=>el.addEventListener('click',()=>{state.evidenceOpen=true;render()}));
    document.querySelectorAll('[data-close-evidence]').forEach(el=>el.addEventListener('click',()=>{state.evidenceOpen=false;render()}));
    const save=$('#save-settings'); if(save)save.addEventListener('click',()=>{const data={};document.querySelectorAll('[data-setting]').forEach(x=>data[x.dataset.setting]=x.value);localStorage.setItem('aquashift-settings',JSON.stringify(data));toast('Scheduler policies saved locally')});
    const cancel=$('#cancel-settings'); if(cancel)cancel.addEventListener('click',()=>{render();toast('Unsaved policy changes discarded')});
    const saveSite=$('#save-site-settings'); if(saveSite)saveSite.addEventListener('click',()=>{const s=site();s.mode=$('#site-mode').value;state.cooling[s.id]=s.mode;localStorage.setItem(`aquashift-site-${s.id}`,JSON.stringify({mode:s.mode,reserve:$('#site-reserve').value}));render();toast(`${s.name} settings saved locally`)});
    const generate=$('#generate-report'); if(generate)generate.addEventListener('click',()=>{state.reportGeneratedAt=new Date().toLocaleString();render();toast(`${state.report} regenerated from current dashboard data`)});
    const more=$('#more-filters'); if(more)more.addEventListener('click',()=>{state.advancedFilters=!state.advancedFilters;render()});
    document.querySelectorAll('[data-case-action]').forEach(el=>el.addEventListener('click',()=>{const action=el.dataset.caseAction;if(action==='create'){const id=`CAS-2026-${state.nextCaseNumber++}`;cases.unshift({id,severity:'Medium',site:site().name,type:'General',summary:'New simulated operations case',owner:'Unassigned',age:'Just now',status:'Draft',action:'Add investigation details'});state.caseId=id;render();toast(`${id} draft created`);return;}const c=cases.find(x=>x.id===state.caseId);if(action==='resolve'){c.status='Resolved';c.action='Monitor for recurrence';}else if(action==='escalate'){c.status='Escalated';c.severity='Critical';c.action='Manager review required';}else if(action==='assign'){c.owner='John Tan';c.status='In Progress';c.action='Begin investigation';}else if(action==='work-order'){c.status='In Progress';c.action=`Work order WO-${c.id.slice(-4)} created`;}render();toast(`Case ${c.id} updated · ${c.action}`)}));
  }
  $('#refresh').addEventListener('click',()=>{render();toast('Live telemetry refreshed')});
  $('#date-control').addEventListener('click',e=>{const options=['Today','Last 24 Hours','Last 7 Days'],i=(options.indexOf(state.timeWindow)+1)%options.length;state.timeWindow=options[i];e.currentTarget.innerHTML=`&#9635;&nbsp; ${state.timeWindow} &middot; Live Operations`;toast(`Dashboard window changed to ${state.timeWindow}`)});
  $('#global-search').addEventListener('keydown',e=>{if(e.key!=='Enter')return;const q=e.target.value.toLowerCase(), s=sites.find(x=>(x.name+x.location).toLowerCase().includes(q)), c=cases.find(x=>(x.id+x.summary).toLowerCase().includes(q));if(s){state.site=s.id;state.page='sites'}else if(c){state.caseId=c.id;state.page='cases'}else{toast('No matching site or case');return}render()});
  window.AQUASHIFT={evaluate,tests,jobs,sites,cases,state,csvRows,downloadCsv,render};
  render();
  if(!previewMode){pollExternalSimulation();setInterval(pollExternalSimulation,2000);}
})();
