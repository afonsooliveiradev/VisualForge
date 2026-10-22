import { filterStackedChartData } from "../utils/stackedChartData";
import * as React from "react";
import {
  Bar, BarChart as RechartsBarChart, CartesianGrid,
  Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export interface StackedBarDataPoint {
  name: string;
  [key: string]: string | number;
}
export interface StackedBarSeries {
  dataKey: string;
  name?: string;
  color?: string;
}
export interface StackedBarChartProps {
  data: StackedBarDataPoint[];
  series: StackedBarSeries[];
  height?: number;
}
const COLORS = ["#2563EB", "#22D3EE", "#8B5CF6", "#34D399", "#FBBF24"];

export function StackedBarChart({ data, series, height = 280 }: StackedBarChartProps) {
  const validData = filterStackedChartData(data, series);
  if (!validData.length || !series.length) return <div role="status">No data available</div>;
  return (
    <div style={{ width: "100%", height, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={validData} accessibilityLayer>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Legend />
          {series.map((item, index) => (
            <Bar key={item.dataKey} dataKey={item.dataKey} name={item.name ?? item.dataKey} stackId="total" fill={item.color ?? COLORS[index % COLORS.length]} />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
