import * as React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartAccessibility } from "./ChartAccessibility";
import { filterScatterData } from "../utils/scatterData";
import type {
  BaseChartProps,
  ScatterDataPoint,
} from "../types/chart";

export interface ScatterChartProps extends BaseChartProps {
  data: ScatterDataPoint[];
  color?: string;
}

export function ScatterChart({
  data,
  height = 280,
  color = "#22D3EE",
  accessibilityLabel = "Scatter chart",
  accessibilityDescription,
}: ScatterChartProps) {
  const validData = filterScatterData(data);

  return (
    <ChartAccessibility
      label={accessibilityLabel}
      description={accessibilityDescription}
      height={height}
      empty={validData.length === 0}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name="X"
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Y"
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            data={validData}
            fill={color}
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </ChartAccessibility>
  );
}