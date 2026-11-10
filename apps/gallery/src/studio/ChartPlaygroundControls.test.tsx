// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ChartPlaygroundControls } from "./ChartPlaygroundControls";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function setup() {
  const onColorChange = vi.fn();
  const onHeightChange = vi.fn();
  const onPointChange = vi.fn();
  const onReset = vi.fn();

  render(
    <ChartPlaygroundControls
      colorLabel="Bar color"
      color="#2563EB"
      height={280}
      data={[{ name: "Jan", value: 42 }]}
      onColorChange={onColorChange}
      onHeightChange={onHeightChange}
      onPointChange={onPointChange}
      onReset={onReset}
    />,
  );

  return {
    onColorChange,
    onHeightChange,
    onPointChange,
    onReset,
  };
}

describe("ChartPlaygroundControls", () => {
  it("renders accessible property controls", () => {
    setup();

    expect(screen.getByLabelText("Bar color")).toBeTruthy();
    expect(screen.getByLabelText("Chart height")).toBeTruthy();
    expect(screen.getByLabelText("Category 1")).toBeTruthy();
    expect(screen.getByLabelText("Value 1")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Reset properties" }),
    ).toBeTruthy();
  });

  it("notifies color changes", () => {
    const { onColorChange } = setup();

    fireEvent.change(screen.getByLabelText("Bar color"), {
      target: { value: "#ff0000" },
    });

    expect(onColorChange).toHaveBeenCalledWith("#ff0000");
  });

  it("accepts valid chart heights", () => {
    const { onHeightChange } = setup();

    fireEvent.change(screen.getByLabelText("Chart height"), {
      target: { value: "400" },
    });

    expect(onHeightChange).toHaveBeenCalledWith(400);
  });

  it("rejects chart heights outside the allowed range", () => {
    const { onHeightChange } = setup();
    const input = screen.getByLabelText("Chart height");

    fireEvent.change(input, { target: { value: "100" } });
    fireEvent.change(input, { target: { value: "700" } });

    expect(onHeightChange).not.toHaveBeenCalled();
  });

  it("notifies category and value changes", () => {
    const { onPointChange } = setup();

    fireEvent.change(screen.getByLabelText("Category 1"), {
      target: { value: "July" },
    });

    fireEvent.change(screen.getByLabelText("Value 1"), {
      target: { value: "75" },
    });

    expect(onPointChange).toHaveBeenCalledWith(0, "name", "July");
    expect(onPointChange).toHaveBeenCalledWith(0, "value", "75");
  });

  it("calls the reset handler", () => {
    const { onReset } = setup();

    fireEvent.click(
      screen.getByRole("button", { name: "Reset properties" }),
    );

    expect(onReset).toHaveBeenCalledOnce();
  });
});