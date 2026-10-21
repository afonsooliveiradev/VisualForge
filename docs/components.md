# Component API Reference

This reference describes the current `@visualforge/react` workspace API in VisualForge `v0.1.0-alpha.0`. The package is not published to npm. Examples assume code running inside this repository's npm workspace.

## Imports

```tsx
import {
  KpiCard, BarChart, LineChart, AreaChart, DonutChart, StackedBarChart,
} from '@visualforge/react';
import type {
  KpiCardProps, ChartDataPoint, BarChartProps, LineChartProps,
  AreaChartProps, DonutDataPoint, DonutChartProps,
  StackedBarDataPoint, StackedBarSeries, StackedBarChartProps,
} from '@visualforge/react';
```

## KpiCard

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| `title` | `string` | Yes | - |
| `value` | `string \| number` | Yes | - |
| `change` | `string` | No | Not displayed |
| `description` | `string` | No | Not displayed |
| `accentColor` | `string` | No | `#22D3EE` |

```tsx
<KpiCard title="Revenue" value="$128,450" change="+12.8%" description="This month" />
```

`change` and `description` are shown only when their values are truthy. `accentColor` controls the change text color.

## Shared data type for BarChart, LineChart, and AreaChart

```ts
interface ChartDataPoint {
  name: string;
  value: number;
}
```

All three components require `data: ChartDataPoint[]` and accept optional `height?: number` (default `280`) and `color?: string`.

| Component | Default color | Empty array behavior |
| --- | --- | --- |
| `BarChart` | `#2563EB` | No explicit empty-state message |
| `LineChart` | `#22D3EE` | No explicit empty-state message |
| `AreaChart` | `#22D3EE` | Displays `No data available` |

```tsx
const monthly = [
  { name: 'Jan', value: 42 },
  { name: 'Feb', value: 58 },
];

<BarChart data={monthly} height={300} />
<LineChart data={monthly} color="#34D399" />
<AreaChart data={monthly} />
```

These charts use Recharts `ResponsiveContainer` and need a parent with usable width.

## DonutChart

```ts
interface DonutDataPoint {
  name: string;
  value: number;
}
```

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| `data` | `DonutDataPoint[]` | Yes | - |
| `height` | `number` | No | `280` |
| `colors` | `string[]` | No | Six built-in colors |
| `showLegend` | `boolean` | No | `true` |

```tsx
<DonutChart
  data={[{ name: 'Products', value: 65 }, { name: 'Services', value: 35 }]}
  showLegend={true}
/>
```

Only finite values greater than zero are included. If no valid values remain, the component displays `No data available`. When the provided `colors` array is empty, built-in colors are used.

## StackedBarChart

```ts
interface StackedBarDataPoint {
  name: string;
  [key: string]: string | number;
}

interface StackedBarSeries {
  dataKey: string;
  name?: string;
  color?: string;
}
```

| Prop | Type | Required | Default |
| --- | --- | --- | --- |
| `data` | `StackedBarDataPoint[]` | Yes | - |
| `series` | `StackedBarSeries[]` | Yes | - |
| `height` | `number` | No | `280` |

```tsx
<StackedBarChart
  data={[
    { name: 'Jan', online: 30, offline: 12 },
    { name: 'Feb', online: 42, offline: 18 },
  ]}
  series={[
    { dataKey: 'online', name: 'Online', color: '#2563EB' },
    { dataKey: 'offline', name: 'Offline', color: '#22D3EE' },
  ]}
/>
```

Each `series[].dataKey` should match a numeric field in the data. All series use the same stack group (`total`). If `data` or `series` is empty, the component displays `No data available`.

## Current alpha limitations

- The package is private and exports TypeScript source files, not a built npm distribution.
- Empty-state behavior is not yet consistent across all chart types.
- Data validation is limited; callers should supply correctly typed and meaningful data.
- The chart implementations currently expose a small set of customization props.
