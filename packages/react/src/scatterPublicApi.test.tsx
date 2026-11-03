import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { ScatterChart } from "./index";
import type {
  ScatterChartProps,
  ScatterDataPoint,
} from "./index";

describe("ScatterChart public API", () => {
  it("exports ScatterChart as a React component", () => {
    expect(typeof ScatterChart).toBe("function");
  });

  it("exposes its public TypeScript contracts", () => {
    const data: ScatterDataPoint[] = [
      { x: 10, y: 20, name: "Point A" },
    ];

    const props: ScatterChartProps = {
      data,
      height: 320,
      accessibilityLabel: "Public scatter chart",
    };

    const html = renderToStaticMarkup(
      <ScatterChart {...props} />
    );

    expect(html).toContain(
      'aria-label="Public scatter chart"'
    );
  });

  it("preserves the public empty-state behavior", () => {
    const html = renderToStaticMarkup(
      <ScatterChart data={[]} />
    );

    expect(html).toContain("No data available");
  });
});