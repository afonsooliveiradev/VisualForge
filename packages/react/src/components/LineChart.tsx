import { filterFiniteValues } from "../utils/chartData";
import * as React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDataPoint } from "./BarChart";

export interface LineChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
}

export function LineChart({
  data,
  height = 280,
  color = "#22D3EE",
}: LineChartProps) {
  const validData = filterFiniteValues(data);
  if (!validData.length) return <div role="status">No data available</div>;
  return (
    <div style={{ width: "100%", height, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={validData} accessibilityLayer>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
