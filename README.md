# AQUASHIFT

AQUASHIFT is a browser-based prototype for monitoring and simulating water-aware data center operations. It combines site monitoring, weather-driven cooling recommendations, leakage and reuse analytics, water-demand forecasting, cases, reporting, and explainable workload scheduling.

## Prototype modules

- Overview: full-width regional map with zoom, drag, region filters, and site details that rotate every five seconds; interaction pauses rotation for fifteen seconds
- Sites: portfolio KPIs, site cards, detailed profiles, assets, performance, water sources, and cases
- Monitoring: weather forecast, Hybrid capability versus current operating mode, IoT-style leak camera evidence, water balance, trends, and event stream
- Analytics: WUE and water-capacity trends, site comparisons, workload impact, and operational insights
- Scheduler: interactive condition simulator, job queue, rules, timeline, capacity forecast, and five decision outcomes
- Reports: selectable templates, report preview, local CSV export, schedule, and audit history
- Cases: alert workflow, evidence, timeline, recommended response, and a 24-scenario scheduler Test Lab
- Settings: editable policies and locally persisted thresholds, constraints, and integration status

## Run locally

Requires Node.js 18 or newer.

```bash
npm start
```

Open [http://localhost:8080](http://localhost:8080).

On Windows, you can alternatively double-click `start-localhost.cmd`.

## Demonstration walkthrough

1. Use **Overview** to select a data center and inspect its operating status.
2. Open **Monitoring** to review weather, cooling mode, leakage evidence, and reuse performance.
3. Open **Scheduler** and adjust temperature, tank level, reclaimed supply, leakage, community state, workload, and site availability.
4. Observe the live recommendation: Run Now, Delay, Move Site, Limit Load, or Escalate.
5. Open **Cases > Scheduler Test Lab** to run all 24 deterministic scenarios or load one into the simulator.
6. Use **Reports** to select a template and download a CSV populated with the current dashboard records.
7. Change scheduler thresholds under **Settings**; values are stored only in the browser.

## Data and architecture

This prototype uses synthetic demonstration data. It runs entirely on localhost and requires no login, API key, cloud service, or OpenAI connection. The app is dependency-free: `server.cjs` serves the static files in `dist/` and exposes a small local simulation API.

## External simulation

```bash
npm run scenarios
npm run simulate -- TC-09 phoenix
```

You can also `POST` a named test or custom scenario to `http://127.0.0.1:8080/api/simulation`. The open dashboard polls the latest local event every two seconds. See [BUTTON_LOGIC_AND_SIMULATION_GUIDE.md](BUTTON_LOGIC_AND_SIMULATION_GUIDE.md) for every control, all 24 test cases, the payload schema, and a minimal Node-RED flow.

## Visual asset credits

- Malaysia map: “Blank malaysia map.svg” by Exiang, styled for AQUASHIFT, licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Blank_malaysia_map.svg).
- World map: “BlankMap-World-Equirectangular.svg”, licensed CC0. Source: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:BlankMap-World-Equirectangular.svg).
- Data-center campus image: generated specifically for this prototype and visibly labelled as simulated; no external logo or readable signage is included.
- Operational and leakage images: simulated assets supplied or generated for this prototype. The leakage view uses `leak detected.png`, showing a camera aimed at a leaking pipe joint with IoT detection overlays. All such views are visibly labelled as simulated.
