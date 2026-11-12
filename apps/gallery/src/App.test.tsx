/**
 * @vitest-environment jsdom
 */

import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("./LazyCharts", async () => {
  const React = await import("react");

  const MockChart = ({ accessibilityLabel }: {
    accessibilityLabel?: string;
  }) => React.createElement(
    "div",
    { role: "img", "aria-label": accessibilityLabel },
    "Chart preview"
  );

  return {
    BarChart: MockChart,
    LineChart: MockChart,
    AreaChart: MockChart,
    DonutChart: MockChart,
    StackedBarChart: MockChart,
    ScatterChart: MockChart,
  };
});

import App from "./App";

afterEach(() => {
  cleanup();
});

describe("VisualForge Component Studio", () => {
  it("renders only the active playground content", async () => {
    const user = userEvent.setup();

    render(<App />);

    const tabs = screen.getByRole("tablist", {
      name: "Playground components",
    });

    const playgroundNames = [
      "KPI component playground",
      "Bar Chart component playground",
      "Line Chart component playground",
      "Area Chart component playground",
    ];

    const selections = [
      { tab: "Bar", playground: "Bar Chart component playground" },
      { tab: "Line", playground: "Line Chart component playground" },
      { tab: "Area", playground: "Area Chart component playground" },
      { tab: "KPI", playground: "KPI component playground" },
    ];

    expect(screen.getByRole("region", {
      name: "KPI component playground",
    })).toBeTruthy();

    for (const selection of selections) {
      await user.click(
        within(tabs).getByRole("tab", {
          name: selection.tab,
        })
      );

      expect(await screen.findByRole("region", {
        name: selection.playground,
      })).toBeTruthy();

      for (const name of playgroundNames) {
        if (name !== selection.playground) {
          expect(screen.queryByRole("region", {
            name,
          })).toBeNull();
        }
      }
    }
  });

  it("selects KPI as the default playground", () => {
    render(<App />);

    const tabs = screen.getByRole("tablist", {
      name: "Playground components",
    });

    expect(within(tabs).getByRole("tab", {
      name: "KPI",
    }).getAttribute("aria-selected")).toBe("true");

    expect(within(tabs).getByRole("tab", {
      name: "Bar",
    }).getAttribute("aria-selected")).toBe("false");

    expect(screen.getByRole("tabpanel")).toBeTruthy();
  });

  it("switches between chart playground tabs", async () => {
    const user = userEvent.setup();
    render(<App />);

    const tabs = screen.getByRole("tablist", {
      name: "Playground components",
    });

    for (const name of ["Bar", "Line", "Area"]) {
      const tab = within(tabs).getByRole("tab", { name });

      await user.click(tab);

      expect(tab.getAttribute("aria-selected")).toBe("true");
    }
  });

  it("supports arrow keys, Home and End navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    const tabs = screen.getByRole("tablist", {
      name: "Playground components",
    });

    const kpi = within(tabs).getByRole("tab", { name: "KPI" });
    const bar = within(tabs).getByRole("tab", { name: "Bar" });
    const area = within(tabs).getByRole("tab", { name: "Area" });

    kpi.focus();

    await user.keyboard("{ArrowRight}");

    expect(bar.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(bar);

    await user.keyboard("{End}");

    expect(area.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(area);

    await user.keyboard("{Home}");

    expect(kpi.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(kpi);

    await user.keyboard("{ArrowLeft}");

    expect(area.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(area);
  });

  it("keeps exactly one playground tab selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    const tabs = screen.getByRole("tablist", {
      name: "Playground components",
    });

    for (const name of ["KPI", "Bar", "Line", "Area"]) {
      await user.click(within(tabs).getByRole("tab", { name }));

      const selectedTabs = within(tabs)
        .getAllByRole("tab")
        .filter((tab) => tab.getAttribute("aria-selected") === "true");

      expect(selectedTabs).toHaveLength(1);
      expect(selectedTabs[0].textContent).toBe(name);

      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    }
  });

  it("displays the catalog summary", () => {
    render(<App />);

    expect(
      screen.getByText("9", {
        selector: ".vf-summary-card:first-child strong",
      })
    ).toBeTruthy();
    expect(screen.getByText("7 reusable component types")).toBeTruthy();
    expect(screen.getByRole("heading", {
      name: "Component Studio",
    })).toBeTruthy();
  });

  it("filters charts through the category navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    const navigation = screen.getByRole("navigation", {
      name: "Categories",
    });

    await user.click(within(navigation).getByRole("button", {
      name: /Charts/i,
    }));

    expect(screen.getByRole("heading", {
      name: "Scatter Chart",
    })).toBeTruthy();

    expect(screen.queryByRole("heading", {
      name: "Metrics & KPIs",
    })).toBeNull();
  });

  it("filters the catalog by Scatter search", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByRole("searchbox", {
        name: "Search components",
      }),
      "Scatter"
    );

    expect(screen.getByRole("heading", {
      name: "Scatter Chart",
    })).toBeTruthy();

    expect(screen.queryByRole("heading", {
      name: "Bar Chart",
    })).toBeNull();

    expect(screen.getByText("1", {
      selector: ".vf-summary-card strong",
    })).toBeTruthy();
  });

  it("shows an empty state for unmatched searches", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByRole("searchbox", {
        name: "Search components",
      }),
      "component-that-does-not-exist"
    );

    expect(screen.getByRole("heading", {
      name: "No components found",
    })).toBeTruthy();

    await user.click(screen.getByRole("button", {
      name: "Clear filters",
    }));

    expect(screen.getByRole("heading", {
      name: "Scatter Chart",
    })).toBeTruthy();
  });
});