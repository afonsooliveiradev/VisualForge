
# @visualforge/react

Reusable React components for dashboards and data visualization.

**Version:** `0.1.0-alpha.0`
**Status:** Private alpha — not published to npm.

Part of the [VisualForge](https://github.com/afonsooliveiradev/VisualForge) open-source project.

## Overview

`@visualforge/react` provides reusable UI and data visualization components built with React, TypeScript, and Recharts.

The current alpha includes seven components:

| Component | Purpose |
| --- | --- |
| `KpiCard` | Display key performance indicators |
| `BarChart` | Compare values across categories |
| `LineChart` | Visualize trends |
| `AreaChart` | Display trends with a filled area |
| `DonutChart` | Visualize proportions |
| `StackedBarChart` | Compare stacked data series |
| `ScatterChart` | Explore relationships between numeric variables |

## Requirements

- Node.js 24
- npm 11
- React 19

## Local development

Clone the repository:

```bash
git clone https://github.com/afonsooliveiradev/VisualForge.git
cd VisualForge
```

Install dependencies:

```bash
npm ci
```

Build the React library:

```bash
npm run build -w @visualforge/react
```

This generates compiled JavaScript and TypeScript declarations in `packages/react/dist`.

Start the gallery:

```bash
npm run dev
```

The gallery demonstrates the components inside the repository's npm workspace.

## Usage

Import components from the package:

```tsx
import {
  KpiCard,
  BarChart,
  ScatterChart,
} from "@visualforge/react";
```

### KPI card

```tsx
<KpiCard
  title="Revenue"
  value="$128,450"
  change="+12.8%"
  description="This month"
/>
```

### Bar chart

```tsx
const monthlyData = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 58 },
  { name: "Mar", value: 51 },
];

<BarChart data={monthlyData} height={300} />;
```

### Scatter chart

```tsx
const scatterData = [
  { x: 10, y: 20, name: "A" },
  { x: 30, y: 40, name: "B" },
];

<ScatterChart
  data={scatterData}
  accessibilityLabel="Sales correlation"
  accessibilityDescription="Relationship between numeric measures"
/>;
```

## Public API

The package exports:

### Components

- `KpiCard`
- `BarChart`
- `LineChart`
- `AreaChart`
- `DonutChart`
- `StackedBarChart`
- `ScatterChart`

### TypeScript types

- `KpiCardProps`
- `ChartDataPoint`
- `BarChartProps`
- `LineChartProps`
- `AreaChartProps`
- `DonutDataPoint`
- `DonutChartProps`
- `StackedBarDataPoint`
- `StackedBarSeries`
- `StackedBarChartProps`
- `ScatterDataPoint`
- `ScatterChartProps`

### Version

- `VISUALFORGE_VERSION`

For detailed component properties and behavior, see the [Component API Reference](../../docs/components.md).

## Quality checks

From the repository root:

```bash
npm run build -w @visualforge/react
npm run typecheck
npm test
npm run build
npm audit
```

## Distribution

The library uses Vite for its JavaScript build and TypeScript for declaration generation.

Package exports reference:

- `dist/index.js` — compiled JavaScript
- `dist/index.d.ts` — TypeScript declarations

The package is currently marked `private: true` and is not published to npm.

External distribution is still being prepared and validated.

## Current limitations

- Alpha-stage API; breaking changes may occur.
- Not yet available through the public npm registry.
- Empty-state behavior varies between chart components.
- Data validation is limited.
- Component customization is still evolving.

## Contributing

Contributions, suggestions, and feedback are welcome.

See the [Contributing Guide](../../CONTRIBUTING.md) for project conventions.

---

**VisualForge — Build. Visualize. Reuse.**
