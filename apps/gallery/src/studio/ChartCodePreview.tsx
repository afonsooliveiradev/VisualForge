export type CopyStatus = "idle" | "success" | "error";

interface ChartCodePreviewProps {
  generatedCode: string;
  copyStatus: CopyStatus;
  onCopy: () => void | Promise<void>;
  chartName: string;
}

export function ChartCodePreview({
  generatedCode,
  copyStatus,
  onCopy,
  chartName,
}: ChartCodePreviewProps) {
  return (
    <div className="vf-code-preview">
      <div className="vf-code-preview-heading">
        <h3>Code Preview</h3>
        <span>React / TSX</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy generated ${chartName} code`}
        >
          Copy Code
        </button>
      </div>

      <pre>
        <code>{generatedCode}</code>
      </pre>

      <p
        role="status"
        aria-live="polite"
        data-copy-status={copyStatus}
      >
        {copyStatus === "success"
          ? "Code copied successfully."
          : copyStatus === "error"
            ? "Unable to copy code."
            : ""}
      </p>
    </div>
  );
}