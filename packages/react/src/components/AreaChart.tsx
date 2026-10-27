import { filterFiniteValues } from "../utils/chartData";
import * as React from "react";
import {
  Area, AreaChart as RechartsAreaChart, CartesianGrid,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import type { ChartDataPoint } from "./BarChart";
import { ChartAccessibility } from "./ChartAccessibility";

export interface AreaChartProps {
  data: ChartDataPoint[];
  height?: number;
  color?: string;
  accessibilityLabel?: string;
  accessibilityDescription?: string;
}

export function AreaChart({
  data,
  height = 280,
  color = "#22D3EE",
  accessibilityLabel,
  accessibilityDescription,
}: AreaChartProps) {
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
          <RechartsAreaChart data={validData} accessibilityLayer>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.2} strokeWidth={3} />
          </RechartsAreaChart>
        </ResponsiveContainer>
      )}
    </ChartAccessibility>
  );
}
