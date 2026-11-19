import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { BaseChartProps } from "../types/chart";
import { ChartAccessibility } from "./ChartAccessibility";

export interface GaugeChartProps extends BaseChartProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  color?: string;
  trackColor?: string;
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  label,
  color = "#22D3EE",
  trackColor = "#334155",
  height = 240,
  accessibilityLabel,
  accessibilityDescription,
}: GaugeChartProps) {
  const valid =
    Number.isFinite(value) &&
    Number.isFinite(min) &&
    Number.isFinite(max) &&
    max > min;

  const clampedValue = valid
    ? Math.min(max, Math.max(min, value))
    : min;

  const percentage = valid
    ? ((clampedValue - min) / (max - min)) * 100
    : 0;

  const data = [
    { name: "Progress", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const defaultLabel = valid
    ? `${label ?? "Gauge"}: ${value} (range ${min} to ${max})`
    : label ?? "Gauge";

  return (
    <ChartAccessibility
      label={accessibilityLabel ?? defaultLabel}
      description={accessibilityDescription}
      height={height}
      empty={!valid}
    >
      {valid && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minWidth: 0,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart accessibilityLayer>
              <Pie
                data={data}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="75%"
                innerRadius="65%"
                outerRadius="85%"
                stroke="none"
                isAnimationActive={false}
              >
                <Cell fill={color} />
                <Cell fill={trackColor} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "12%",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700 }}>
              {Math.round(percentage)}%
            </div>
            {label && (
              <div style={{ fontSize: 13, opacity: 0.75 }}>
                {label}
              </div>
            )}
          </div>
        </div>
      )}
    </ChartAccessibility>
  );
}