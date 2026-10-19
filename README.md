# VisualForge

**Build. Visualize. Reuse.**

Open-source React component library for dashboards and data visualization.

## Components

| Component | Description |
|---|---|
| `KpiCard` | Metric card with value, change and description |
| `BarChart` | Responsive bar chart |
| `LineChart` | Responsive line chart |

## Tech Stack

React 19 · TypeScript · Vite · Recharts · Vitest · npm Workspaces

## Getting Started

Requirements: Node.js 24 and npm 11.

```bash
git clone https://github.com/afonsooliveiradev/VisualForge.git
cd VisualForge
npm ci
npm run dev
```

Open the local address displayed by Vite.

## Example

```tsx
import { KpiCard, BarChart, LineChart } from "@visualforge/react";

const data = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 58 },
  { name: "Mar", value: 76 },
];

export function Dashboard() {
  return (
    <>
      <KpiCard title="Revenue" value="$128,450" change="+12.8%" />
      <BarChart data={data} />
      <LineChart data={data} />
    </>
  );
}
```

The components currently work through the repository's local npm workspace. The library is not yet published to the npm registry.

## Project Structure

- `apps/gallery` — interactive gallery
- `packages/react` — reusable components
- `docs` — architecture documentation
- `examples` — integration examples

## Quality Checks

```bash
npm run typecheck
npm test
npm run build
npm audit
```

## Status

**v0.1.0-alpha.0** — Early development release.

## Contributing and License

See [CONTRIBUTING.md](CONTRIBUTING.md) and [LICENSE](LICENSE).