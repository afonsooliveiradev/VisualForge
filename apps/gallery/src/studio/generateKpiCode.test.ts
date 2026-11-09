import { describe, expect, it } from "vitest";
import { generateKpiCode } from "./generateKpiCode";

describe("generateKpiCode", () => {
  it("generates a reusable KPI example", () => {
    const code = generateKpiCode({
      title: "Revenue",
      value: "$128,450",
      change: "+12.8%",
      description: "Compared to last month",
      accentColor: "#22D3EE",
    });

    expect(code).toContain(
      'import { KpiCard } from "@visualforge/react";',
    );
    expect(code).toContain('title={"Revenue"}');
    expect(code).toContain('value={"$128,450"}');
    expect(code).toContain('change={"+12.8%"}');
    expect(code).toContain('accentColor={"#22D3EE"}');
  });

  it("preserves numeric values as JSX expressions", () => {
    const code = generateKpiCode({
      title: "Users",
      value: 1250,
    });

    expect(code).toContain("value={1250}");
  });

  it("omits undefined optional properties", () => {
    const code = generateKpiCode({
      title: "Conversion",
      value: "4.8%",
    });

    expect(code).not.toContain("change=");
    expect(code).not.toContain("description=");
    expect(code).not.toContain("accentColor=");
  });

  it("escapes special characters in user-provided strings", () => {
    const code = generateKpiCode({
      title: 'Revenue "Global"',
      value: "Line 1\nLine 2",
    });

    expect(code).toContain(
      'title={"Revenue \\"Global\\""}',
    );
    expect(code).toContain(
      'value={"Line 1\\nLine 2"}',
    );
  });

  it("preserves empty optional strings", () => {
    const code = generateKpiCode({
      title: "Revenue",
      value: 0,
      change: "",
      description: "",
    });

    expect(code).toContain("value={0}");
    expect(code).toContain('change={""}');
    expect(code).toContain('description={""}');
  });
});
