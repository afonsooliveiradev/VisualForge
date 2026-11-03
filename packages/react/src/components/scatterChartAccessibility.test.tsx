import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ScatterChart } from "./ScatterChart";

describe("ScatterChart accessibility", () => {
  it("renders a labelled chart with valid data", () => {
    const html = renderToStaticMarkup(
      <ScatterChart
        data={[
          { x: 10, y: 20 },
          { x: 30, y: 40 },
        ]}
        accessibilityLabel="Sales correlation"
        accessibilityDescription="Sales and conversion relationship"
      />
    );

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Sales correlation"');
    expect(html).toContain("Sales and conversion relationship");
  });

  it("provides a default accessibility label", () => {
    const html = renderToStaticMarkup(
      <ScatterChart data={[{ x: 1, y: 2 }]} />
    );

    expect(html).toContain('aria-label="Scatter chart"');
  });

  it("renders an empty state for no data", () => {
    const html = renderToStaticMarkup(
      <ScatterChart data={[]} />
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
  });

  it("renders an empty state when all coordinates are invalid", () => {
    const html = renderToStaticMarkup(
      <ScatterChart
        data={[
          { x: Number.NaN, y: 10 },
          { x: 10, y: Number.POSITIVE_INFINITY },
        ]}
      />
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
  });

  it("does not mutate the input array", () => {
    const data = [
      { x: 1, y: 2 },
      { x: Number.NaN, y: 3 },
    ];

    const original = [...data];

    renderToStaticMarkup(<ScatterChart data={data} />);

    expect(data).toEqual(original);
  });
});