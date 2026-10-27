import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { AreaChart } from "./AreaChart";

const sampleData = [
  { name: "January", value: 100 },
  { name: "February", value: 150 },
];

describe("AreaChart accessibility", () => {
  it("provides an accessible label", () => {
    const html = renderToStaticMarkup(
      <AreaChart
        data={sampleData}
        accessibilityLabel="Monthly revenue area"
      />,
    );

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Monthly revenue area"');
  });

  it("connects its accessible description", () => {
    const html = renderToStaticMarkup(
      <AreaChart
        data={sampleData}
        accessibilityLabel="Revenue evolution"
        accessibilityDescription="Revenue increased across two months"
      />,
    );

    const match = html.match(/aria-describedby="([^"]+)"/);

    expect(match).not.toBeNull();
    expect(html).toContain(`id="${match![1]}"`);
    expect(html).toContain("Revenue increased across two months");
  });

  it("announces the empty state", () => {
    const html = renderToStaticMarkup(
      <AreaChart data={[]} accessibilityLabel="Empty area chart" />,
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
    expect(html).toContain('aria-label="Empty area chart"');
  });

  it("preserves the description when data is empty", () => {
    const html = renderToStaticMarkup(
      <AreaChart
        data={[]}
        accessibilityDescription="No revenue information"
      />,
    );

    expect(html).toContain("No revenue information");
    expect(html).toContain("No data available");
    expect(html).toContain("aria-describedby=");
  });

  it("generates distinct description identifiers", () => {
    const html = renderToStaticMarkup(
      <>
        <AreaChart
          data={[]}
          accessibilityDescription="First area chart"
        />
        <AreaChart
          data={[]}
          accessibilityDescription="Second area chart"
        />
      </>,
    );

    const ids = [...html.matchAll(/aria-describedby="([^"]+)"/g)]
      .map((match) => match[1]);

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});