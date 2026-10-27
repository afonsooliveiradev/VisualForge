import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LineChart } from "./LineChart";

const sampleData = [
  { name: "January", value: 100 },
  { name: "February", value: 150 },
];

describe("LineChart accessibility", () => {
  it("provides an accessible label", () => {
    const html = renderToStaticMarkup(
      <LineChart
        data={sampleData}
        accessibilityLabel="Monthly revenue"
      />,
    );

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Monthly revenue"');
  });

  it("connects its accessible description", () => {
    const html = renderToStaticMarkup(
      <LineChart
        data={sampleData}
        accessibilityLabel="Revenue trend"
        accessibilityDescription="Revenue across two months"
      />,
    );

    const match = html.match(/aria-describedby="([^"]+)"/);

    expect(match).not.toBeNull();
    expect(html).toContain(
      `id="${match![1]}"`,
    );
    expect(html).toContain("Revenue across two months");
  });

  it("announces the empty state", () => {
    const html = renderToStaticMarkup(
      <LineChart data={[]} accessibilityLabel="Empty trend" />,
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
    expect(html).toContain('aria-label="Empty trend"');
  });

  it("preserves the description when data is empty", () => {
    const html = renderToStaticMarkup(
      <LineChart
        data={[]}
        accessibilityDescription="No revenue data recorded"
      />,
    );

    expect(html).toContain("No revenue data recorded");
    expect(html).toContain("No data available");
    expect(html).toContain("aria-describedby=");
  });

  it("generates distinct description identifiers", () => {
    const html = renderToStaticMarkup(
      <>
        <LineChart
          data={[]}
          accessibilityDescription="First chart"
        />
        <LineChart
          data={[]}
          accessibilityDescription="Second chart"
        />
      </>,
    );

    const ids = [...html.matchAll(/aria-describedby="([^"]+)"/g)]
      .map((match) => match[1]);

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });
});