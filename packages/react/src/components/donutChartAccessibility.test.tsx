import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DonutChart } from "./DonutChart";

const sampleData = [
  { name: "Revenue", value: 60 },
  { name: "Expenses", value: 40 },
];

describe("DonutChart accessibility", () => {
  it("provides an accessible label", () => {
    const html = renderToStaticMarkup(
      <DonutChart
        data={sampleData}
        accessibilityLabel="Financial distribution"
      />,
    );

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Financial distribution"');
  });

  it("connects its accessible description", () => {
    const html = renderToStaticMarkup(
      <DonutChart
        data={sampleData}
        accessibilityLabel="Financial overview"
        accessibilityDescription="Revenue represents sixty percent"
      />,
    );

    const match = html.match(/aria-describedby="([^"]+)"/);

    expect(match).not.toBeNull();
    expect(html).toContain(`id="${match![1]}"`);
    expect(html).toContain("Revenue represents sixty percent");
  });

  it("announces the empty state", () => {
    const html = renderToStaticMarkup(
      <DonutChart
        data={[]}
        accessibilityLabel="Empty financial chart"
      />,
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
    expect(html).toContain('aria-label="Empty financial chart"');
  });

  it("preserves its description when data is empty", () => {
    const html = renderToStaticMarkup(
      <DonutChart
        data={[]}
        accessibilityDescription="No financial data recorded"
      />,
    );

    expect(html).toContain("No financial data recorded");
    expect(html).toContain("No data available");
    expect(html).toContain("aria-describedby=");
  });

  it("generates unique description identifiers", () => {
    const html = renderToStaticMarkup(
      <>
        <DonutChart
          data={[]}
          accessibilityDescription="First donut chart"
        />
        <DonutChart
          data={[]}
          accessibilityDescription="Second donut chart"
        />
      </>,
    );

    const ids = [...html.matchAll(/aria-describedby="([^"]+)"/g)]
      .map((match) => match[1]);

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});