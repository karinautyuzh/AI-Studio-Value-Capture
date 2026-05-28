# ICF Assistant Value Framework Dashboard

A React + Vite + TypeScript + Tailwind CSS executive dashboard for tracking the value realization of the ICF Assistant program at Thermo Fisher Scientific.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** — fast dev server and build
- **Tailwind CSS 3** — utility-first styling with Thermo Fisher brand colors
- **Recharts** — radar chart, bar chart, line chart
- **Lucide React** — icons
- **Radix UI** — accessible primitives

## Dashboard Sections

| Section | Description |
|---|---|
| Executive Overview | Problem framing, value snapshot, KPI status at a glance |
| Value Scoring | Weighted composite score with radar chart and editable weights |
| KPI Framework | All 6 KPIs with editable actuals and status, filterable |
| Value Calculator | Live ROI calculator — all inputs editable, instant recalculation |
| Pipeline Summary | Quarterly phase cards, hours saved chart, adoption pipeline, wins matrix |
| Roadmap | 5-phase capability roadmap from MVP to Fully Autonomous |
| Measurement Readiness | 8 data infrastructure items with readiness score |
| Assumptions & Open Items | 8 open questions with status, impact, owner, filterable |

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#BE0000` | TFS red — primary actions, KPI badges |
| `primary-dark` | `#8B0000` | Hover states |
| `tfs-charcoal` | `#2C2C2C` | Sidebar, body text |
| `tfs-teal` | `#00857C` | Positive/actual indicators |
| `tfs-blue` | `#1A6EA8` | Secondary accent, in-progress |
| `tfs-offwhite` | `#F8F8F6` | Page background |
| `tfs-gray` | `#E8E8E4` | Borders, dividers |

## Project Structure

```
src/
├── types/index.ts          # All TypeScript interfaces
├── data/                   # Static data + defaults
│   ├── kpis.ts
│   ├── roadmap.ts
│   ├── pipeline.ts
│   ├── assumptions.ts
│   └── scoring.ts
├── lib/
│   ├── utils.ts            # cn(), formatNumber(), formatCurrency()
│   └── calculations.ts     # Pure calculation functions
├── components/
│   ├── layout/             # AppShell, Sidebar, TopBar
│   ├── overview/           # ExecutiveOverview
│   ├── kpi/                # KPIFramework, KPICard
│   ├── calculator/         # ValueCalculator
│   ├── pipeline/           # PipelineSummary
│   ├── roadmap/            # Roadmap
│   ├── scoring/            # ValueScoring
│   ├── readiness/          # MeasurementReadiness
│   └── assumptions/        # AssumptionsLog
├── App.tsx
├── main.tsx
└── index.css
```

## Build for Production

```bash
npm run build
npm run preview
```

## Notes

- All KPI actuals are editable in-app (no backend — state is in-memory)
- Value calculator inputs persist within the session and propagate to the Executive Overview
- Scoring weights are editable and must sum to 100
- Assumptions and readiness data are currently static — connect to a backend API as needed

---

*Accenture × Thermo Fisher Scientific — ICF Assistant Program — 2026*
