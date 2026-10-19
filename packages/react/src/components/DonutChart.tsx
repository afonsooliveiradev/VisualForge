import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

export interface DonutDataPoint {
  name: string;
  value: number;
}
export interface DonutChartProps {
  data: DonutDataPoint[];
  height?: number;
  colors?: string[];
  showLegend?: boolean;
}
const DEFAULT_COLORS = ["#22D3EE", "#2563EB", "#8B5CF6", "#34D399", "#FBBF24", "#FB7185"];

export function DonutChart({ data, height = 280, colors = DEFAULT_COLORS, showLegend = true }: DonutChartProps) {
  const validData = data.filter((item) => Number.isFinite(item.value) && item.value > 0);
  if (!validData.length) return <div role="status">No data available</div>;
  return (
    <div style={{ width: "100%", height, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart accessibilityLayer>
          <Pie data={validData} dataKey="value" nameKey="name" innerRadius="53%" outerRadius="76%" paddingAngle={2}>
            {validData.map((item, index) => (
              <Cell key={`${item.name}-${index}`} fill={colors.length ? colors[index % colors.length] : DEFAULT_COLORS[index % DEFAULT_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
