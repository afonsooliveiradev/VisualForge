import { filterFiniteValues } from "../utils/chartData";
import * as React from "react";
import {
  Area, AreaChart as RechartsAreaChart, CartesianGrid,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import type { ChartDataPoint } from "./BarChart";

export interface AreaChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
}

export function AreaChart({ data, height = 280, color = "#22D3EE" }: AreaChartProps) {
  const validData = filterFiniteValues(data);
  if (!validData.length) return <div role="status">No data available</div>;
  return (
    <div style={{ width: "100%", height, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={validData} accessibilityLayer>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={3} />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
