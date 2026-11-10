// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCodeClipboard } from "./useCodeClipboard";

const originalClipboardDescriptor = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();

  if (originalClipboardDescriptor) {
    Object.defineProperty(
      navigator,
      "clipboard",
      originalClipboardDescriptor,
    );
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
});

describe("useCodeClipboard", () => {
  it("starts with idle status", () => {
    const { result } = renderHook(() => useCodeClipboard());

    expect(result.current.copyStatus).toBe("idle");
  });

  it("copies the exact generated code successfully", async () => {
    const writeText = vi.fn(async (_text: string) => {});
    mockClipboard(writeText);

    const { result } = renderHook(() => useCodeClipboard());
    const code = "<BarChart data={data} />";

    await act(async () => {
      await result.current.copyCode(code);
    });

    expect(writeText).toHaveBeenCalledExactlyOnceWith(code);
    expect(result.current.copyStatus).toBe("success");
  });

  it("reports an error when clipboard writing fails", async () => {
    const writeText = vi.fn(async (_text: string) => {
      throw new Error("Permission denied");
    });
    mockClipboard(writeText);

    const { result } = renderHook(() => useCodeClipboard());

    await act(async () => {
      await result.current.copyCode("test");
    });

    expect(writeText).toHaveBeenCalledOnce();
    expect(result.current.copyStatus).toBe("error");
  });

  it("reports an error when the Clipboard API is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useCodeClipboard());

    await act(async () => {
      await result.current.copyCode("test");
    });

    expect(result.current.copyStatus).toBe("error");
  });

  it("resets feedback to idle after a successful copy", async () => {
    const writeText = vi.fn(async (_text: string) => {});
    mockClipboard(writeText);

    const { result } = renderHook(() => useCodeClipboard());

    await act(async () => {
      await result.current.copyCode("test");
    });

    expect(result.current.copyStatus).toBe("success");

    act(() => {
      result.current.setCopyStatus("idle");
    });

    expect(result.current.copyStatus).toBe("idle");
  });
});