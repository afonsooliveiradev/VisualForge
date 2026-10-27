import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BarChart } from "./BarChart";

describe("BarChart accessibility", () => {
  it("preserves accessibility context when empty", () => {
    const html = renderToStaticMarkup(
      createElement(BarChart, {
        data: [],
        accessibilityLabel: "Faturamento mensal",
        accessibilityDescription: "Valores mensais em reais",
      }),
    );

    const describedBy = html.match(/aria-describedby="([^"]+)"/)?.[1];

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Faturamento mensal"');
    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
    expect(describedBy).toBeTruthy();
    expect(html).toContain(`id="${describedBy}"`);
    expect(html).toContain("Valores mensais em reais");
  });

  it("links the description to the correct element", () => {
    const html = renderToStaticMarkup(
      createElement(BarChart, {
        data: [{ name: "Jan", value: 100 }],
        accessibilityDescription: "Receita mensal",
      }),
    );

    const describedBy = html.match(/aria-describedby="([^"]+)"/)?.[1];

    expect(describedBy).toBeTruthy();
    expect(html).toContain(`id="${describedBy}"`);
  });

  it("generates unique description IDs for multiple charts", () => {
    const html = renderToStaticMarkup(
      createElement(
        "section",
        null,
        createElement(BarChart, {
          data: [{ name: "Jan", value: 100 }],
          accessibilityDescription: "Primeiro gráfico",
        }),
        createElement(BarChart, {
          data: [{ name: "Fev", value: 200 }],
          accessibilityDescription: "Segundo gráfico",
        }),
      ),
    );

    const ids = [...html.matchAll(/aria-describedby="([^"]+)"/g)].map(
      (match) => match[1],
    );

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
  });

  it("provides an accessible label", () => {
    const html = renderToStaticMarkup(
      createElement(BarChart, {
        data: [{ name: "Jan", value: 100 }],
        accessibilityLabel: "Faturamento mensal",
      }),
    );

    expect(html).toContain('role="group"');
    expect(html).toContain('aria-label="Faturamento mensal"');
  });

  it("associates an accessible description", () => {
    const html = renderToStaticMarkup(
      createElement(BarChart, {
        data: [{ name: "Jan", value: 100 }],
        accessibilityLabel: "Faturamento",
        accessibilityDescription: "Valores mensais em reais",
      }),
    );

    expect(html).toContain("Valores mensais em reais");
    expect(html).toMatch(/aria-describedby="([^"]+)"/);
    expect(html).toMatch(/id="([^"]+)"/);
  });

  it("preserves the empty state", () => {
    const html = renderToStaticMarkup(
      createElement(BarChart, {
        data: [],
        accessibilityLabel: "Faturamento",
      }),
    );

    expect(html).toContain('role="status"');
    expect(html).toContain("No data available");
  });
});