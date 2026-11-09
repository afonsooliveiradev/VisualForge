/* @vitest-environment jsdom */

import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { KpiPlayground } from "./KpiPlayground";

afterEach(cleanup);

describe("KpiPlayground", () => {
  it("renders the initial KPI preview", () => {
    render(<KpiPlayground />);

    const preview = screen.getByRole("article");

    expect(preview.textContent).toContain("Revenue");
    expect(preview.textContent).toContain("$128,450");
    expect(preview.textContent).toContain("+12.8%");
  });

  it("updates the preview when properties change", () => {
    render(<KpiPlayground />);

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Monthly Sales" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Value" }), {
      target: { value: "$250,000" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Description" }), {
      target: { value: "Current month" },
    });

    const preview = screen.getByRole("article");

    expect(preview.textContent).toContain("Monthly Sales");
    expect(preview.textContent).toContain("$250,000");
    expect(preview.textContent).toContain("Current month");
  });

  it("updates the accent color", () => {
    const { container } = render(<KpiPlayground />);

    const colorInput = container.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement | null;

    expect(colorInput).not.toBeNull();

    fireEvent.change(colorInput!, {
      target: { value: "#ff8800" },
    });

    expect(colorInput!.value).toBe("#ff8800");

    const preview = screen.getByRole("article");
    const changeText = Array.from(preview.querySelectorAll("div")).find(
      (element) => element.textContent === "+12.8%",
    );

    expect(changeText?.getAttribute("style")).toContain(
      "rgb(255, 136, 0)",
    );
  });

  it("restores the initial properties", () => {
    render(<KpiPlayground />);

    fireEvent.change(screen.getByRole("textbox", { name: "Title" }), {
      target: { value: "Edited KPI" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Reset properties" }),
    );

    expect(
      (screen.getByRole("textbox", { name: "Title" }) as HTMLInputElement)
        .value,
    ).toBe("Revenue");

    expect(screen.getByRole("article").textContent).toContain(
      "$128,450",
    );
  });
  it("copies the updated generated code", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal("navigator", {
      clipboard: { writeText },
    });

    try {
      render(<KpiPlayground />);

      fireEvent.change(
        screen.getByRole("textbox", { name: "Title" }),
        { target: { value: "Monthly Revenue" } },
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: "Copy generated code",
        }),
      );

      await waitFor(() => {
        expect(writeText).toHaveBeenCalledOnce();
      });

      const copied = writeText.mock.calls[0][0] as string;

      expect(copied).toContain('title={"Monthly Revenue"}');
      expect(copied).toContain(
        'import { KpiCard } from "@visualforge/react";',
      );

      expect(
        await screen.findByText("Code copied successfully."),
      ).toBeTruthy();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("reports clipboard failures", async () => {
    const writeText = vi.fn().mockRejectedValue(
      new Error("Clipboard permission denied"),
    );

    vi.stubGlobal("navigator", {
      clipboard: { writeText },
    });

    try {
      render(<KpiPlayground />);

      fireEvent.click(
        screen.getByRole("button", {
          name: "Copy generated code",
        }),
      );

      expect(
        await screen.findByText("Unable to copy code."),
      ).toBeTruthy();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("handles unavailable clipboard APIs", async () => {
    vi.stubGlobal("navigator", {});

    try {
      render(<KpiPlayground />);

      fireEvent.click(
        screen.getByRole("button", {
          name: "Copy generated code",
        }),
      );

      expect(
        await screen.findByText("Unable to copy code."),
      ).toBeTruthy();
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it("clears copy feedback after editing", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      clipboard: { writeText },
    });

    try {
      render(<KpiPlayground />);

      fireEvent.click(
        screen.getByRole("button", {
          name: "Copy generated code",
        }),
      );

      expect(
        await screen.findByText("Code copied successfully."),
      ).toBeTruthy();

      fireEvent.change(
        screen.getByRole("textbox", { name: "Title" }),
        { target: { value: "Updated Revenue" } },
      );

      expect(
        screen.queryByText("Code copied successfully."),
      ).toBeNull();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("clears copy feedback after reset", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      clipboard: { writeText },
    });

    try {
      render(<KpiPlayground />);

      fireEvent.click(
        screen.getByRole("button", {
          name: "Copy generated code",
        }),
      );

      expect(
        await screen.findByText("Code copied successfully."),
      ).toBeTruthy();

      fireEvent.click(
        screen.getByRole("button", {
          name: "Reset properties",
        }),
      );

      expect(
        screen.queryByText("Code copied successfully."),
      ).toBeNull();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
