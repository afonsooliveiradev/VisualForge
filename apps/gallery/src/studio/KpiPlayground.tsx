import { useState } from "react";
import { useCodeClipboard } from "./useCodeClipboard";
import "../styles/playground.css";
import { KpiCard } from "@visualforge/react";
import { generateKpiCode } from "./generateKpiCode";
import type { KpiCardProps } from "@visualforge/react";

const initialProps: KpiCardProps = {
  title: "Revenue",
  value: "$128,450",
  change: "+12.8%",
  description: "Compared to last month",
  accentColor: "#22D3EE",
};

export function KpiPlayground() {
  const [props, setProps] = useState<KpiCardProps>(initialProps);
  const { copyStatus, setCopyStatus, copyCode } = useCodeClipboard();



  function update<K extends keyof KpiCardProps>(
    key: K,
    value: KpiCardProps[K],
  ) {
    setProps((current) => ({ ...current, [key]: value }));
    setCopyStatus("idle");
  }

  return (
    <section aria-label="KPI component playground">
      <header>
        <h2>KPI Playground</h2>
        <p>Customize component properties and preview changes.</p>
      </header>

      <div className="vf-playground">
        <div className="vf-playground-controls">
          <h3>Properties</h3>

          <label>
            Title
            <input
              type="text"
              value={props.title}
              onChange={(event) => update("title", event.target.value)}
            />
          </label>

          <label>
            Value
            <input
              type="text"
              value={String(props.value)}
              onChange={(event) => update("value", event.target.value)}
            />
          </label>

          <label>
            Change
            <input
              type="text"
              value={props.change ?? ""}
              onChange={(event) => update("change", event.target.value)}
            />
          </label>

          <label>
            Description
            <input
              type="text"
              value={props.description ?? ""}
              onChange={(event) =>
                update("description", event.target.value)
              }
            />
          </label>

          <label>
            Accent color
            <input
              type="color"
              value={props.accentColor ?? "#22D3EE"}
              onChange={(event) =>
                update("accentColor", event.target.value)
              }
            />
          </label>

          <button
            type="button"
            onClick={() => {
              setProps({ ...initialProps });
              setCopyStatus("idle");
            }}
          >
            Reset properties
          </button>
        </div>

        <div className="vf-playground-preview">
          <h3>Live Preview</h3>
          <KpiCard {...props} />
        </div>
      </div>

      <div className="vf-code-preview">
        <div className="vf-code-preview-heading">
          <h3>Code Preview</h3>
          <span>React / TSX</span>
          <button
            type="button"
            onClick={() => void copyCode(generateKpiCode(props))}
            aria-label="Copy generated code"
          >
            Copy Code
          </button>
        </div>

        <pre>
          <code>{generateKpiCode(props)}</code>
        </pre>

        <p role="status" aria-live="polite" data-copy-status={copyStatus}>
          {copyStatus === "success"
            ? "Code copied successfully."
            : copyStatus === "error"
              ? "Unable to copy code."
              : ""}
        </p>
      </div>
    </section>
  );
}
