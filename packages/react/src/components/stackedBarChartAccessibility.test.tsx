import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { StackedBarChart } from "./StackedBarChart";

const sampleData = [
  { name: "January", sales: 100, services: 50 },
  { name: "February", sales: 150, services: 80 },
];

const sampleSeries = [
  { dataKey: "sales", name: "Sales", color: "#2563EB" },
  { dataKey: "services", name: "Services", color: "#22D3EE" },
];

describe("StackedBarChart accessibility", () => {
  it("provides an accessible label", () => {
    const html = renderToStaticMarkup(
      <StackedBarChart
        data={sampleData}
        series={sampleSeries}
        accessibilityLabel="Monthly revenue by category"
      />,
    );

    expect(html).toContain('role="group"');
    expect(html).toContain(
      'aria-label="Monthly revenue by category"',
    );
  });

  it("connects its accessible description", () => {
    const html = renderToStaticMarkup(
      <StackedBarChart
        data={sampleData}
        series={sampleSeries}
        accessibilityDescription="Sales and services by month"
      />,
    );

    const match = html.match(/aria-describedby="([^"]+)"/);

    expect(match).not.toBeNull();
    expect(html).toContain(`id="${match![1]}"`);
    expect(html).toContain("Sales and services by month");
  });

  it("announces the empty state when data is missing", () => {
    const html = renderToStaticMarkup(
      <StackedBarChart
        data={[]}
        series={sampleSeries}
        accessibilityLabel="Empty stacked chart"
      />,
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
    expect(html).toContain('aria-label="Empty stacked chart"');
  });

  it("announces the empty state when series are missing", () => {
    const html = renderToStaticMarkup(
      <StackedBarChart
        data={sampleData}
        series={[]}
        accessibilityDescription="No configured series"
      />,
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
    expect(html).toContain("No configured series");
  });

  it("generates unique description identifiers", () => {
    const html = renderToStaticMarkup(
      <>
        <StackedBarChart
          data={[]}
          series={sampleSeries}
          accessibilityDescription="First stacked chart"
        />
        <StackedBarChart
          data={[]}
          series={sampleSeries}
          accessibilityDescription="Second stacked chart"
        />
      </>,
    );

    const ids = [...html.matchAll(/aria-describedby="([^"]+)"/g)]
      .map((match) => match[1]);

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});