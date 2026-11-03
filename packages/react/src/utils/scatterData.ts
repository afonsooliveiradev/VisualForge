import type { ScatterDataPoint } from "../types/chart";

export function filterScatterData(
  data: readonly ScatterDataPoint[]
): ScatterDataPoint[] {
  return data.filter(
    (point) =>
      Number.isFinite(point.x) &&
      Number.isFinite(point.y)
  );
}