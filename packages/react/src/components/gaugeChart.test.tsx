import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GaugeChart } from "./GaugeChart";

describe("GaugeChart", () => {
  it("renders an accessible label", () => {
    const html = renderToStaticMarkup(
      <GaugeChart value={76} accessibilityLabel="Goal progress" />,
    );

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Goal progress"');
  });

  it("provides a default accessible label", () => {
    const html = renderToStaticMarkup(
      <GaugeChart value={76} label="Sales goal" />,
    );

    expect(html).toContain(
      'aria-label="Sales goal: 76 (range 0 to 100)"',
    );
  });

  it("connects an accessible description", () => {
    const html = renderToStaticMarkup(
      <GaugeChart
        value={76}
        accessibilityDescription="Monthly sales target"
      />,
    );

    const match = html.match(/aria-describedby="([^"]+)"/);

    expect(match).not.toBeNull();
    expect(html).toContain(`id="${match![1]}"`);
    expect(html).toContain("Monthly sales target");
  });

  it("renders a calculated percentage", () => {
    const html = renderToStaticMarkup(
      <GaugeChart value={75} min={50} max={150} />,
    );

    expect(html).toContain("25%");
  });

  it("clamps values above the maximum", () => {
    const html = renderToStaticMarkup(
      <GaugeChart value={150} min={0} max={100} />,
    );

    expect(html).toContain("100%");
  });

  it("clamps values below the minimum", () => {
    const html = renderToStaticMarkup(
      <GaugeChart value={-20} min={0} max={100} />,
    );

    expect(html).toContain("0%");
  });

  it.each([
    { value: Number.NaN, min: 0, max: 100 },
    { value: Number.POSITIVE_INFINITY, min: 0, max: 100 },
    { value: 50, min: 100, max: 100 },
    { value: 50, min: 100, max: 0 },
  ])("renders an empty state for invalid values: %o", (props) => {
    const html = renderToStaticMarkup(
      <GaugeChart {...props} />,
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
  });
});