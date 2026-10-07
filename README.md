# AQUASHIFT

AQUASHIFT is a browser-based prototype for monitoring and simulating water-aware data center operations. It combines site monitoring, weather-driven cooling recommendations, leakage and reuse analytics, water-demand forecasting, and explainable workload scheduling.

## Features

- Regional data center overview and selectable site map
- Weather monitoring with dry-run, hybrid, and wet-cooling recommendations
- Live cooling-water, tank, pressure, conductivity, and WUE metrics
- Leakage monitoring using sensor evidence and expected-versus-actual makeup flow
- Water-loss and reclaimed-water analytics
- Forecast water demand against safe operating capacity
- Explainable workload decisions: Run Now, Delay, Move Site, Limit Load, and Escalate
- Operational alerts, downloadable CSV reports, and locally saved settings
- 24 deterministic scheduler scenarios for walkthroughs and demonstrations

## Run locally

Requirements: Node.js 18 or newer.

```bash
npm start
```

Then open [http://localhost:8080](http://localhost:8080).

On Windows, you can alternatively double-click `start-localhost.cmd`.

## Demonstrating the system

1. Use **Overview** to select a data center and inspect its monitoring status.
2. Open **Monitoring** to review weather, cooling mode, leakage evidence, and reuse performance.
3. Open **Scheduler** and adjust temperature, tank level, reclaimed supply, leakage, and community conditions.
4. Select different workloads to see how the scheduling decision changes.
5. Open **Cases → Test Lab** to run all 24 cases or load an individual case into the Scheduler.

## Data and architecture

This is a frontend prototype using synthetic demonstration data. It runs entirely on localhost and does not require login credentials, API keys, cloud services, or an OpenAI connection.

The application is intentionally dependency-free: `server.cjs` serves the static dashboard from `dist/index.html`.
