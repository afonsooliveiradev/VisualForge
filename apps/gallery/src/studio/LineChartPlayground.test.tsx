// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LineChartPlayground } from "./LineChartPlayground";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LineChartPlayground", () => {
  it("renders chart controls and code preview", () => {
    render(<LineChartPlayground />);

    expect(screen.getByText("Line Chart Playground")).toBeTruthy();
    expect(screen.getByText("Code Preview")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copy generated Line Chart code" })).toBeTruthy();
  });

  it("updates a category in generated code", () => {
    render(<LineChartPlayground />);

    fireEvent.change(screen.getByLabelText("Category 1"), {
      target: { value: "January" },
    });

    expect(screen.getByText(/January/, { selector: "code" })).toBeTruthy();
  });

  it("updates a numeric value in generated code", () => {
    render(<LineChartPlayground />);

    fireEvent.change(screen.getByLabelText("Value 1"), {
      target: { value: "150" },
    });

    expect(screen.getByText(/150/, { selector: "code" })).toBeTruthy();
  });

  it("resets modified properties", () => {
    render(<LineChartPlayground />);

    fireEvent.change(screen.getByLabelText("Category 1"), {
      target: { value: "Changed" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset properties" }));

    expect(
      (screen.getByLabelText("Category 1") as HTMLInputElement).value,
    ).toBe("Jan");
  });

  it("provides an accessible chart label", () => {
    render(<LineChartPlayground />);

    expect(screen.getByLabelText("Interactive line chart preview")).toBeTruthy();
  });

  it("copies generated TSX successfully", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<LineChartPlayground />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Copy generated Line Chart code",
      }),
    );

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledOnce();
      expect(screen.getByRole("status").textContent).toContain(
        "Code copied successfully.",
      );
    });

    expect(writeText.mock.calls[0][0]).toContain("<LineChart");
  });

  it("reports clipboard permission errors", async () => {
    const writeText = vi.fn().mockRejectedValue(
      new Error("Permission denied"),
    );

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<LineChartPlayground />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Copy generated Line Chart code",
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toContain(
        "Unable to copy code.",
      );
    });
  });

  it("clears copy feedback after editing chart data", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<LineChartPlayground />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Copy generated Line Chart code",
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toContain(
        "Code copied successfully.",
      );
    });

    fireEvent.change(screen.getByLabelText("Category 1"), {
      target: { value: "Updated" },
    });

    expect(screen.getByRole("status").textContent).toBe("");
  });
});
