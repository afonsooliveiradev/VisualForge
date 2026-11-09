import { useState } from "react";
import { AreaChart } from "@visualforge/react";
import { generateAreaChartCode } from "./generateAreaChartCode";
import type { ChartDataPoint } from "@visualforge/react";
import "../styles/playground.css";

const initialData: ChartDataPoint[] = [
  { name: "Jan", value: 42 },
  { name: "Feb", value: 58 },
  { name: "Mar", value: 51 },
  { name: "Apr", value: 76 },
  { name: "May", value: 69 },
  { name: "Jun", value: 94 },
];

const initialColor = "#22D3EE";

export function AreaChartPlayground() {
  const [data, setData] = useState<ChartDataPoint[]>(() =>
    initialData.map((item) => ({ ...item })),
  );
  const [color, setColor] = useState(initialColor);
  const [height, setHeight] = useState(280);
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const generatedCode = generateAreaChartCode({
    data,
    color,
    height,
    accessibilityLabel: "Interactive area chart preview",
    accessibilityDescription: "Area chart updated from playground controls.",
  });

  async function copyCode() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(generatedCode);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  }

  function updatePoint(
    index: number,
    key: "name" | "value",
    value: string,
  ) {
    setCopyStatus("idle");
    setData((current) =>
      current.map((point, position) => {
        if (position !== index) return point;

        if (key === "name") {
          return { ...point, name: value };
        }

        const numericValue = Number(value);

        if (!value.trim() || !Number.isFinite(numericValue)) {
          return point;
        }

        return { ...point, value: numericValue };
      }),
    );
  }

  function reset() {
    setData(initialData.map((item) => ({ ...item })));
    setColor(initialColor);
    setHeight(280);
    setCopyStatus("idle");
  }

  return (
    <section aria-label="Area Chart component playground">
      <header>
        <h2>Area Chart Playground</h2>
        <p>Customize chart data and preview changes instantly.</p>
      </header>

      <div className="vf-playground">
        <div className="vf-playground-controls">
          <h3>Properties</h3>

          <label>
            Area color
            <input
              type="color"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
                setCopyStatus("idle");
              }}
            />
          </label>

          <label>
            Chart height
            <input
              type="number"
              min={180}
              max={600}
              value={height}
              onChange={(event) => {
                const next = Number(event.target.value);

                if (
                  Number.isFinite(next) &&
                  next >= 180 &&
                  next <= 600
                ) {
                  setHeight(next);
                  setCopyStatus("idle");
                }
              }}
            />
          </label>

          <h3>Data points</h3>

          {data.map((point, index) => (
            <div className="vf-bar-point-editor" key={index}>
              <label>
                Category {index + 1}
                <input
                  type="text"
                  value={point.name}
                  onChange={(event) =>
                    updatePoint(index, "name", event.target.value)
                  }
                />
              </label>

              <label>
                Value {index + 1}
                <input
                  type="number"
                  value={point.value}
                  onChange={(event) =>
                    updatePoint(index, "value", event.target.value)
                  }
                />
              </label>
            </div>
          ))}

          <button type="button" onClick={reset}>
            Reset properties
          </button>
        </div>

        <div className="vf-playground-preview">
          <h3>Live Preview</h3>
          <AreaChart
            data={data}
            color={color}
            height={height}
            accessibilityLabel="Interactive area chart preview"
            accessibilityDescription="Area chart updated from playground controls."
          />
        </div>
      </div>

      <div className="vf-code-preview">
        <div className="vf-code-preview-heading">
          <h3>Code Preview</h3>
          <span>React / TSX</span>
          <button
            type="button"
            onClick={copyCode}
            aria-label="Copy generated Area Chart code"
          >
            Copy Code
          </button>
        </div>

        <pre>
          <code>{generatedCode}</code>
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
