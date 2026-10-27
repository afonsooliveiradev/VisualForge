import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AreaChart, BarChart, DonutChart, LineChart, StackedBarChart } from "../index";

describe("analytical chart components", () => {
  it("shows an empty state for invalid stacked series", () => {
    const html = renderToStaticMarkup(
      createElement(StackedBarChart, {
        data: [{ name: "Jan", vendas: NaN, custos: Infinity }],
        series: [{ dataKey: "vendas" }, { dataKey: "custos" }],
      }),
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
  });

  it("rejects non-finite bar chart values", () => {
    const html = renderToStaticMarkup(
      createElement(BarChart, {
        data: [
          { name: "A", value: NaN },
          { name: "B", value: Infinity },
        ],
      }),
    );
    expect(html).toContain("No data available");
  });

  it("rejects non-finite line chart values", () => {
    const html = renderToStaticMarkup(
      createElement(LineChart, {
        data: [
          { name: "A", value: NaN },
          { name: "B", value: -Infinity },
        ],
      }),
    );
    expect(html).toContain("No data available");
  });

  it("rejects non-finite area chart values", () => {
    const html = renderToStaticMarkup(
      createElement(AreaChart, {
        data: [
          { name: "A", value: NaN },
          { name: "B", value: Infinity },
        ],
      }),
    );
    expect(html).toContain("No data available");
  });

  it("shows an empty state for an empty bar chart", () => {
    const html = renderToStaticMarkup(createElement(BarChart, { data: [] }));
    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
  });

  it("shows an empty state for an empty line chart", () => {
    const html = renderToStaticMarkup(createElement(LineChart, { data: [] }));
    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
  });

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
