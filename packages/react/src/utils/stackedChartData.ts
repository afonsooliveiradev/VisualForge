import type {
  StackedBarDataPoint,
  StackedBarSeries,
} from "../components/StackedBarChart";

export function filterStackedChartData(
  data: StackedBarDataPoint[],
  series: StackedBarSeries[],
): StackedBarDataPoint[] {
  return data
    .map((item) => {
      const result: StackedBarDataPoint = { name: item.name };

      for (const { dataKey } of series) {
        const value = item[dataKey];

        if (typeof value === "number" && Number.isFinite(value)) {
          result[dataKey] = value;
        }
      }

      return result;
    })
    .filter((item) =>
      series.some(({ dataKey }) => typeof item[dataKey] === "number"),
    );
}