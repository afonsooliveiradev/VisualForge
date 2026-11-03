export interface BaseChartProps {
  height?: number;
  accessibilityLabel?: string;
  accessibilityDescription?: string;
}

export interface CartesianDataPoint {
  name: string;
  value: number;
}

export interface ScatterDataPoint {
  x: number;
  y: number;
  name?: string;
}
