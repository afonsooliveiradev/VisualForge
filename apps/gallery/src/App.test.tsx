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