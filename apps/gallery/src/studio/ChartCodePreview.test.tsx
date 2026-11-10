// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChartCodePreview } from "./ChartCodePreview";

const generatedCode = '<BarChart data={data} />';

afterEach(() => {
  cleanup();
});

describe("ChartCodePreview", () => {
  it("renders generated TSX and language label", () => {
    render(
      <ChartCodePreview
        generatedCode={generatedCode}
        copyStatus="idle"
        onCopy={vi.fn()}
        chartName="Bar Chart"
      />,
    );

    expect(screen.getByText("Code Preview")).toBeTruthy();
    expect(screen.getByText("React / TSX")).toBeTruthy();
    expect(screen.getByText(generatedCode)).toBeTruthy();
  });

  it("provides an accessible copy button", () => {
    render(
      <ChartCodePreview
        generatedCode={generatedCode}
        copyStatus="idle"
        onCopy={vi.fn()}
        chartName="Bar Chart"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Copy generated Bar Chart code",
      }),
    ).toBeTruthy();
  });

  it("calls the copy handler when clicked", () => {
    const onCopy = vi.fn();

    render(
      <ChartCodePreview
        generatedCode={generatedCode}
        copyStatus="idle"
        onCopy={onCopy}
        chartName="Bar Chart"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Copy generated Bar Chart code",
      }),
    );

    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it("shows success feedback", () => {
    render(
      <ChartCodePreview
        generatedCode={generatedCode}
        copyStatus="success"
        onCopy={vi.fn()}
        chartName="Bar Chart"
      />,
    );

    const status = screen.getByRole("status");

    expect(status.textContent).toBe(
      "Code copied successfully.",
    );

    expect(status.getAttribute("data-copy-status")).toBe(
      "success",
    );
  });

  it("shows error feedback", () => {
    render(
      <ChartCodePreview
        generatedCode={generatedCode}
        copyStatus="error"
        onCopy={vi.fn()}
        chartName="Bar Chart"
      />,
    );

    const status = screen.getByRole("status");

    expect(status.textContent).toBe(
      "Unable to copy code.",
    );

    expect(status.getAttribute("data-copy-status")).toBe(
      "error",
    );
  });

  it("keeps idle feedback empty", () => {
    render(
      <ChartCodePreview
        generatedCode={generatedCode}
        copyStatus="idle"
        onCopy={vi.fn()}
        chartName="Area Chart"
      />,
    );

    const status = screen.getByRole("status");

    expect(status.textContent).toBe("");
    expect(status.getAttribute("aria-live")).toBe("polite");
  });
});