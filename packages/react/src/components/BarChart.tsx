import * as React from "react";
import { filterFiniteValues } from "../utils/chartData";
import { ChartAccessibility } from "./ChartAccessibility";
import {
  BarChart as RechartsBarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface BarChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  accessibilityLabel?: string;
  accessibilityDescription?: string;
}

export function BarChart({
  data,
  height = 280,
  color = "#2563EB",
  accessibilityLabel,
  accessibilityDescription,
}: BarChartProps) {
  const validData = filterFiniteValues(data);
  const empty = validData.length === 0;

  return (
    <ChartAccessibility
      label={accessibilityLabel}
      description={accessibilityDescription}
      height={height}
      empty={empty}
    >
      {!empty && (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={validData} accessibilityLayer>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip />
            <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      )}
    </ChartAccessibility>
  );
}