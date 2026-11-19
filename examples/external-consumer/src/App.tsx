import {
  VISUALFORGE_VERSION,
  KpiCard,
  BarChart,
} from "@visualforge/react";

import type {
  ChartDataPoint,
} from "@visualforge/react";

const data: ChartDataPoint[] = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 58 },
  { name: "Mar", value: 51 },
];

export default function App() {
  return (
    <main style={{ padding: 32 }}>
      <h1>VisualForge External Consumer</h1>
      <p>Version: {VISUALFORGE_VERSION}</p>

      <KpiCard
        title="Revenue"
        value="$128,450"
        change="+12.8%"
      />

      <BarChart
        data={data}
        height={260}
        accessibilityLabel="Monthly performance"
      />
    </main>
  );
}
