import { useState } from "react";
import type { CopyStatus } from "./ChartCodePreview";

export function useCodeClipboard() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  async function copyCode(code: string): Promise<void> {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(code);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  }

  return {
    copyStatus,
    setCopyStatus,
    copyCode,
  };
}