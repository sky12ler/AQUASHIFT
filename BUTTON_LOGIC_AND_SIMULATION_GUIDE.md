# AQUASHIFT Button Logic and Simulation Guide

This document is the operating specification for the localhost prototype. All site names, telemetry, cases, camera views, workloads, and outcomes are synthetic demonstration data. The map coordinates use real city coordinates, but they do not claim that a particular Xylem or customer facility exists at that point.

## 1. Start and verify the prototype

```powershell
npm start
```

Open `http://localhost:8080`. No login, cloud account, OpenAI API, or external database is required.

Useful commands:

```powershell
npm run scenarios
npm run simulate -- TC-09 phoenix
npm run simulate -- TC-17 ashburn
```

The browser polls the local simulation API every two seconds. A posted event changes the selected site telemetry, opens Scheduler, and displays the resulting decision.

## 2. Complete button and interaction logic

### Shared header and navigation

| Control | Logic and visible result |
|---|---|
| Overview / Sites / Monitoring / Analytics / Scheduler / Reports / Cases / Settings | Changes the active page and active sidebar state. Page state remains in browser memory. |
| Global search + Enter | Searches site name/location first, then case ID/summary. Opens the matching Sites or Cases view. Shows a no-match toast otherwise. |
| Time window | Cycles `Today`, `Last 24 Hours`, and `Last 7 Days`; updates the header and confirms the selected view window. |
| Refresh | Re-renders the current page from current in-memory telemetry and confirms a refresh. |
| Site selector | Changes the selected site and refreshes all site-dependent cards. |
| Map pin | Selects that exact site by its latitude/longitude and refreshes the page. |

### Overview

| Control | Logic and visible result |
|---|---|
| Any site row or global-map pin | Selects the site. Monitoring, KPIs, risk, cooling mode, and directory selection follow it. |
| Switch to Dry Run | Changes the selected site's mode from Hybrid to Dry Run. |
| Switch Back to Closed-Loop | Changes the current operating mode from Dry Run back to Closed-Loop Cooling. The site's Hybrid capability remains unchanged. |
| View leak case | Opens Case Management for the selected incident workflow. |
| Apply Recommendation | Applies the current scheduler action to the referenced workload; a Move Site action changes its current site to the suggested site and marks the job Applied. |

### Sites

| Control | Logic and visible result |
|---|---|
| Global / Southeast Asia / United States | Filters pins on one stable world projection without an overlapping inset. Choosing a region also selects its first site when needed. Pins remain derived from latitude/longitude. |
| Export Sites | Downloads `aquashift-sites-YYYY-MM-DD.csv` containing all eight visible site records, `Cooling_Capability`, `Current_Operating_Mode`, and current metrics. |
| Directory row / map pin / site card | Selects that site and updates Selected Site Profile. |
| Profile tabs | Switches Overview, Assets, Performance, Water Sources, Cases, and Settings content without leaving the page. |
| Save Site Settings | Stores cooling mode and reserve locally in the browser; the mode immediately updates the selected site. |

### Monitoring

| Control | Logic and visible result |
|---|---|
| Site selector | Rebinds weather, live-condition, leakage, loss/reuse, and trend cards to that site. |
| Switch to Dry Run / Switch Back to Closed-Loop | Changes only the site's current operating mode. All demo sites remain Hybrid-capable. |
| IoT leak camera preview | Opens the supplied simulated camera evidence at full size with pipe joint, pressure drop, estimated loss, and confidence context. |
| View leak case | Opens Case Management. |
| Metric trend tabs | These are visual prototype selectors; the active Water Usage view shows a gridded, unit-labelled chart. |
| Alert rows | Present current synthetic event status and act as the evidence used by the case workflow. |

### Analytics

| Control | Logic and visible result |
|---|---|
| Site selector | Selects the site context for comparison. |
| Time range | Represents the analytics reporting period in the prototype. |
| Export | Downloads `aquashift-analytics-YYYY-MM-DD.csv` with one current analytics row per site. |
| Site bubbles / comparison rows | Select the corresponding site. |

### Scheduler

| Control | Logic and visible result |
|---|---|
| Open Test Lab | Opens Cases > Scheduler Test Lab. |
| Run Optimizer | Evaluates the current workbench inputs and reports action and risk score. |
| Edit Rules | Opens Settings > Scheduler Policies. |
| Workload selector | Changes job water demand and whether the workload is critical. |
| Temperature, tank, reuse, makeup sliders | Recompute demand, capacity, loss residual, risk, reason, and recommendation immediately. |
| Community state | Applies normal, watch, restriction, or emergency capacity penalties. |
| Leak signal | Applies none, watch, or high leakage penalties. A high leak or residual above 1,050 m³ is treated as `leakHigh`. |
| Safe alternative | Allows or blocks Move Site as a policy-compliant route. |
| Apply Run Now / Delay / Move Site / Limit Load / Escalate | Marks the selected job Applied. Move Site also changes the job's current site to its suggested site. |
| Top recommendation Apply Recommendation | Applies the preconfigured JOB-317 move from Johor to Selangor. |
| View Details or workload row | Loads that job into the Simulation Workbench. |

Decision precedence is deterministic:

1. Critical + unsafe/leak/projected + no alternative → `ESCALATE`.
2. Critical + unsafe/leak/projected + alternative → `MOVE SITE`.
3. High leak/loss residual + alternative → `MOVE SITE`.
4. Unsafe/projected + alternative + community not normal → `MOVE SITE`.
5. Unsafe/projected + future better + non-critical → `DELAY`.
6. Unsafe/leak/restriction/emergency → `LIMIT LOAD`.
7. Projected + alternative → `MOVE SITE`.
8. Projected without alternative → `LIMIT LOAD`.
9. Otherwise → `RUN NOW`.

### Reports

| Control | Logic and visible result |
|---|---|
| Report library item | Selects the report and updates the preview title. |
| Generate Report | Regenerates the preview from current in-memory state and records a visible generation timestamp. |
| Export Report | Downloads `aquashift-report-YYYY-MM-DD.csv`; rows contain the selected report name, generation timestamp, and all current site data. |

### Cases

| Control | Logic and visible result |
|---|---|
| Export Cases CSV | Downloads all visible case fields and their current edited status. |
| Create Case | Inserts and selects a new synthetic Draft case for the currently selected site. |
| Cases & Alerts / Scheduler Test Lab | Switches between incident workflow and the 24 deterministic simulations. |
| Case row | Selects the case and updates details, evidence, timeline, and response. |
| More Filters / Hide Filters | Shows or hides extra owner, created-time, and include-resolved controls. |
| Assign | Assigns the case to John Tan, sets In Progress, and changes next action. |
| Escalate | Sets Critical + Escalated and requires manager review. |
| Create Work Order | Sets In Progress and writes a generated work-order reference into Next Action. |
| Resolve | Sets Resolved and changes Next Action to monitoring for recurrence. |
| Outcome filter buttons | Filters test cases by expected scheduler action. |
| Load | Loads that case's inputs into Scheduler for manual adjustment. |
| Run All 24 Tests | Evaluates all cases and displays Actual, PASS/FAIL, plus the pass-count toast. |
| Export Results | Downloads all 24 inputs, expected outcome, actual outcome, and PASS/FAIL. |

### Settings

| Control | Logic and visible result |
|---|---|
| Policy inputs | Stage threshold/constraint values in the form. |
| Save Changes | Saves all `data-setting` values to browser `localStorage`. |
| Cancel | Discards unsaved DOM changes and restores last saved values. |
| Settings category buttons | Select the named settings area in the prototype and confirm it with a toast. |
| Individual Test | Returns a simulated healthy result for that connector. |
| Test All Connections | Returns a simulated healthy result for all listed connectors. |

## 3. The 24 simulation cases

Input abbreviations: `T` ambient temperature °C; `Tank` storage %; `Reuse` reclaimed-water %; `Makeup` observed makeup volume for the decision window in m³; `Comm` community condition; `Leak` leak signal; `Alt` safe alternative site; `Future` forecast window.

| ID | Scenario | Job | T | Tank | Reuse | Makeup | Comm | Leak | Alt | Future | Expected | Trigger explanation |
|---|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|
| TC-01 | Stable training run | training | 31 | 72 | 68 | 5860 | normal | none | Yes | stable | RUN NOW | Demand, reserve, leak, and community limits are safe. |
| TC-02 | Cool-night backup run | etl | 27 | 88 | 82 | 4500 | normal | none | Yes | stable | Cool temperature and high reserve give strong margin. |
| TC-03 | Critical inference, safe reserve | inference | 30 | 80 | 70 | 5400 | normal | none | Yes | Critical job is still policy-compliant. |
| TC-04 | High reuse analytics | analytics | 32 | 75 | 90 | 5000 | normal | none | Yes | High reclaimed share keeps water penalty low. |
| TC-05 | Peak heat recovery window | training | 42 | 54 | 39 | 7100 | watch | none | No | better | DELAY | Heat creates projected risk; forecast says a better window exists. |
| TC-06 | Reclaimed supply returns | training | 37 | 41 | 22 | 6600 | restriction | none | No | better | Restriction is unsafe now, but recovery is forecast. |
| TC-07 | Tank refill forecast | batch | 35 | 24 | 55 | 6000 | watch | none | No | better | Tank below 28% is unsafe; later refill permits delay. |
| TC-08 | Restriction clears later | training | 38 | 44 | 25 | 6800 | restriction | none | No | better | Community restriction clears within deadline. |
| TC-09 | Confirmed leak with alternative | training | 34 | 39 | 58 | 7820 | watch | high | Yes | stable | MOVE SITE | High leak plus safe alternative reroutes work. |
| TC-10 | Potable restriction reroute | training | 36 | 55 | 10 | 6900 | restriction | none | Yes | stable | Low reuse/restriction makes current site unsafe; alternate is available. |
| TC-11 | Thermal peak reroute | training | 43 | 60 | 60 | 6500 | normal | none | Yes | stable | Temperature ≥40°C creates projected risk; alternate site is safer. |
| TC-12 | Critical workload reroute | inference | 41 | 35 | 30 | 7200 | normal | watch | Yes | stable | Critical workload keeps SLA by moving to an alternative. |
| TC-13 | Community emergency | etl | 36 | 33 | 18 | 6950 | emergency | watch | No | poor | LIMIT LOAD | Emergency reserve protection and no alternative require reduction. |
| TC-14 | Restriction with no recovery | training | 38 | 44 | 25 | 6800 | restriction | none | No | poor | LIMIT LOAD | Current restriction persists; no safe move or later window. |
| TC-15 | Leak with no alternative | training | 33 | 50 | 55 | 8000 | watch | high | No | stable | LIMIT LOAD | High leak blocks normal loading; no destination exists. |
| TC-16 | Thermal margin exhausted | training | 40 | 61 | 60 | 6600 | normal | none | No | poor | LIMIT LOAD | Projected thermal risk has no alternative and no recovery. |
| TC-17 | Critical job, low reserve | inference | 42 | 18 | 20 | 7500 | restriction | none | No | poor | ESCALATE | Critical workload has unsafe reserve and no compliant path. |
| TC-18 | Critical job and leak | inference | 34 | 42 | 55 | 8200 | normal | high | No | stable | ESCALATE | Critical workload plus high leak has no safe alternative. |
| TC-19 | Critical community emergency | inference | 39 | 30 | 15 | 7900 | emergency | watch | No | poor | ESCALATE | Community emergency plus critical SLA requires operator review. |
| TC-20 | Multi-site heat, no safe move | inference | 44 | 50 | 40 | 7400 | watch | none | No | stable | ESCALATE | Critical thermal peak with no destination cannot be auto-scheduled. |
| TC-21 | Residual inside tolerance | etl | 30 | 80 | 70 | 5000 | normal | none | Yes | stable | RUN NOW | Observed-versus-expected makeup residual stays under tolerance. |
| TC-22 | Hidden loss residual anomaly | training | 31 | 65 | 60 | 7500 | normal | none | Yes | stable | MOVE SITE | Makeup residual exceeds 1,050 m³ even without a leak flag. |
| TC-23 | Sensor watch only | training | 31 | 70 | 70 | 5800 | normal | watch | Yes | stable | RUN NOW | Watch signal alone does not cross the high-leak threshold. |
| TC-24 | Community watch with reserve | analytics | 33 | 70 | 75 | 5600 | watch | none | Yes | stable | RUN NOW | Watch state retains enough margin for low-impact analytics. |

## 4. External script and Node-RED stimulation

### Local API

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Server readiness. |
| `/api/test-cases` | GET | All 24 cases with computed outcome and pass flag. |
| `/api/simulation/latest` | GET | Latest posted event consumed by the dashboard. |
| `/api/simulation` | POST | Post a named test or custom scenario. |

Named test payload:

```json
{
  "testCaseId": "TC-09",
  "siteId": "phoenix"
}
```

Custom payload:

```json
{
  "siteId": "ashburn",
  "scenario": {
    "job": "inference",
    "temp": 42,
    "tank": 18,
    "reuse": 20,
    "makeup": 7500,
    "community": "restriction",
    "leak": "none",
    "alt": false,
    "future": "poor"
  }
}
```

PowerShell example:

```powershell
$body = @{ testCaseId = 'TC-15'; siteId = 'dallas' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:8080/api/simulation -ContentType application/json -Body $body
```

Node-RED minimum flow:

1. Add an **Inject** node whose payload is JSON.
2. Set the JSON to the named test payload above.
3. Connect it to an **HTTP Request** node.
4. Set method `POST`, URL `http://127.0.0.1:8080/api/simulation`, and header `Content-Type: application/json`.
5. Connect a **Debug** node to see `action`, `reason`, `demand`, `capacity`, and `riskScore`.
6. Keep the dashboard open; it changes within two seconds.

Valid `siteId` values: `johor`, `selangor`, `penang`, `singapore`, `ashburn`, `phoenix`, `dallas`, `hillsboro`.

## 5. CSV export contracts

- Sites: 8 rows with ID, location, country/region, exact demo coordinates, status, risk, cooling capability, current operating mode, WUE, reuse, load, tank, flow, temperatures, pressure, sensor count, community, utility, sources, and update time.
- Analytics: one row per site with WUE, water use, reclaimed/potable shares, loss estimate, load, risk, and mode.
- Test Results: 24 rows with every input, expected/actual action, and PASS/FAIL.
- Report: selected report name and generation time plus all site fields.
- Cases: every visible case with severity, site, type, owner, age, status, and next action.

Every export includes `SIMULATED` where applicable and uses UTF-8 CSV encoding.

## 6. Map, US site data, and imagery

The portfolio includes Malaysia/Singapore plus four US data-center-market locations: Ashburn/Northern Virginia, Phoenix, Dallas, and Hillsboro. The global map uses an equirectangular projection, so marker placement is computed directly from each site's latitude and longitude. Malaysia/Singapore also has a detailed inset.

Research basis:

- CBRE North America Data Center Trends includes Northern Virginia, Dallas–Fort Worth, Hillsboro, and Phoenix among primary markets: https://www.cbre.com/insights/books/north-america-data-center-trends-h2-2025
- World map base (CC0): https://commons.wikimedia.org/wiki/File:BlankMap-World-Equirectangular.svg
- Malaysia inset (CC BY 3.0): https://commons.wikimedia.org/wiki/File:Blank_malaysia_map.svg

All photography is simulated. Site cards rotate through the supplied campus, cooling tower, storage tank, pump-room, makeup/blowdown, and mechanical-room assets so different operational contexts are visible. `leak detected.png` is the active leakage evidence: a simulated camera view aimed at a leaking cooling-water pipe joint with IoT detection overlays. Every image is visibly labelled as simulated. A real implementation would replace these URLs with authenticated IoT camera snapshots or streams while keeping the same overlay and scheduler event contract.

## 7. Cooling terminology

- **Hybrid** is a site capability, not a current operating mode. It means the site can switch between the two supported modes.
- **Closed-Loop Cooling** is the current mode used when weather/thermal conditions require the cooling-water system.
- **Dry Run** is the current mode used when weather and scheduler policy allow low-water air-side operation.
- Weather and scheduler decisions may switch `Current_Operating_Mode`; they do not remove or change `Cooling_Capability = Hybrid`.
