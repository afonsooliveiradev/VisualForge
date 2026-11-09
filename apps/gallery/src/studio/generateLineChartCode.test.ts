import { describe, expect, it } from "vitest";
import { generateLineChartCode } from "./generateLineChartCode";

describe("generateLineChartCode", () => {
  const props = {
    data: [
      { name: "Jan", value: 42 },
      { name: "Feb", value: 58 },
    ],
    height: 320,
    color: "#22D3EE",
  };

  it("generates a LineChart import", () => {
    expect(generateLineChartCode(props)).toContain(
      'import { LineChart } from "@visualforge/react";',
    );
  });

  it("includes chart data", () => {
    const code = generateLineChartCode(props);

    expect(code).toContain('"name": "Jan"');
    expect(code).toContain('"value": 42');
  });

  it("includes chart properties", () => {
    const code = generateLineChartCode(props);

    expect(code).toContain("height={320}");
    expect(code).toContain('color={"#22D3EE"}');
  });

  it("escapes user-provided category strings", () => {
    const code = generateLineChartCode({
      ...props,
      data: [{ name: 'A "quoted" category', value: 12 }],
    });

    expect(code).toContain('A \\"quoted\\" category');
  });

  it("includes accessibility properties when provided", () => {
    const code = generateLineChartCode({
      ...props,
      accessibilityLabel: "Sales chart",
      accessibilityDescription: "Monthly sales",
    });

    expect(code).toContain(
      'accessibilityLabel={"Sales chart"}',
    );
    expect(code).toContain(
      'accessibilityDescription={"Monthly sales"}',
    );
  });
});
