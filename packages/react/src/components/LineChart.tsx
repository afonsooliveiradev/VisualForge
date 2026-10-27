import { ChartAccessibility } from "./ChartAccessibility";
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
  accessibilityLabel?: string;
  accessibilityDescription?: string;
  color?: string;
}

export function LineChart({
  data,
  height = 280,
  color = "#22D3EE",
  accessibilityLabel,
  accessibilityDescription,
}: LineChartProps) {
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
      )}
    </ChartAccessibility>
  );
}
