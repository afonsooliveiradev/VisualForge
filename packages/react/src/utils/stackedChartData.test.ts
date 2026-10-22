import { describe, expect, it } from "vitest";
import { filterStackedChartData } from "./stackedChartData";

const series = [{ dataKey: "vendas" }, { dataKey: "custos" }];

describe("filterStackedChartData", () => {
  it("preserves valid series when another series is invalid", () => {
    const data = [
      { name: "Jan", vendas: 100, custos: NaN },
      { name: "Fev", vendas: -20, custos: 40 },
    ];

    expect(filterStackedChartData(data, series)).toEqual([
      { name: "Jan", vendas: 100 },
      { name: "Fev", vendas: -20, custos: 40 },
    ]);
  });

  it("preserves zero values", () => {
    expect(
      filterStackedChartData([{ name: "Jan", vendas: 0 }], series),
    ).toEqual([{ name: "Jan", vendas: 0 }]);
  });

  it("removes rows without any valid series", () => {
    expect(
      filterStackedChartData(
        [{ name: "Jan", vendas: NaN, custos: Infinity }],
        series,
      ),
    ).toEqual([]);
  });

  it("does not mutate the original records", () => {
    const data = [{ name: "Jan", vendas: 10, custos: NaN }];

    filterStackedChartData(data, series);

    expect(Number.isNaN(data[0].custos)).toBe(true);
  });
});