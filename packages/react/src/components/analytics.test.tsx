import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AreaChart, DonutChart, StackedBarChart } from "../index";

describe("analytical chart components", () => {
  it("exports the three chart components", () => {
    expect(typeof AreaChart).toBe("function");
    expect(typeof DonutChart).toBe("function");
    expect(typeof StackedBarChart).toBe("function");
  });
  it("shows an empty state for an empty area chart", () => {
    expect(renderToStaticMarkup(createElement(AreaChart, { data: [] }))).toContain("No data available");
  });
  it("shows an empty state for invalid donut values", () => {
    expect(renderToStaticMarkup(createElement(DonutChart, { data: [{ name: "A", value: 0 }] }))).toContain("No data available");
  });
  it("shows an empty state when stacked series are missing", () => {
    expect(renderToStaticMarkup(createElement(StackedBarChart, { data: [{ name: "Jan", a: 1 }], series: [] }))).toContain("No data available");
  });
});
