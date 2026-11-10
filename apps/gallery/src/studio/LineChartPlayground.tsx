import { useState } from "react";
import { useCodeClipboard } from "./useCodeClipboard";
import { ChartCodePreview } from "./ChartCodePreview";
import { ChartPlaygroundControls } from "./ChartPlaygroundControls";
import { LineChart } from "@visualforge/react";
import { generateLineChartCode } from "./generateLineChartCode";
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

export function LineChartPlayground() {
  const [data, setData] = useState<ChartDataPoint[]>(() =>
    initialData.map((item) => ({ ...item })),
  );
  const [color, setColor] = useState(initialColor);
  const [height, setHeight] = useState(280);
  const { copyStatus, setCopyStatus, copyCode } = useCodeClipboard();

  const generatedCode = generateLineChartCode({
    data,
    color,
    height,
    accessibilityLabel: "Interactive line chart preview",
    accessibilityDescription: "Line chart updated from playground controls.",
  });



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
    <section aria-label="Line Chart component playground">
      <header>
        <h2>Line Chart Playground</h2>
        <p>Customize chart data and preview changes instantly.</p>
      </header>

      <div className="vf-playground">
        <ChartPlaygroundControls
          colorLabel="Line color"
          color={color}
          height={height}
          data={data}
          onColorChange={(next) => {
            setColor(next);
            setCopyStatus("idle");
          }}
          onHeightChange={(next) => {
            setHeight(next);
            setCopyStatus("idle");
          }}
          onPointChange={updatePoint}
          onReset={reset}
        />
        <div className="vf-playground-preview">
          <h3>Live Preview</h3>
          <LineChart
            data={data}
            color={color}
            height={height}
            accessibilityLabel="Interactive line chart preview"
            accessibilityDescription="Line chart updated from playground controls."
          />
        </div>
      </div>

      <ChartCodePreview
        generatedCode={generatedCode}
        copyStatus={copyStatus}
        onCopy={() => copyCode(generatedCode)}
        chartName="Line Chart"
      />
    </section>
  );
}
