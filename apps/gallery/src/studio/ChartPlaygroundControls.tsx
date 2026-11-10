import type { ChartDataPoint } from "@visualforge/react";

interface ChartPlaygroundControlsProps {
  colorLabel: string;
  color: string;
  height: number;
  data: ChartDataPoint[];
  onColorChange: (color: string) => void;
  onHeightChange: (height: number) => void;
  onPointChange: (
    index: number,
    key: "name" | "value",
    value: string,
  ) => void;
  onReset: () => void;
}

export function ChartPlaygroundControls({
  colorLabel,
  color,
  height,
  data,
  onColorChange,
  onHeightChange,
  onPointChange,
  onReset,
}: ChartPlaygroundControlsProps) {
  return (
    <div className="vf-playground-controls">
      <h3>Properties</h3>

      <label>
        {colorLabel}
        <input
          type="color"
          value={color}
          onChange={(event) => onColorChange(event.target.value)}
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
              onHeightChange(next);
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
                onPointChange(index, "name", event.target.value)
              }
            />
          </label>

          <label>
            Value {index + 1}
            <input
              type="number"
              value={point.value}
              onChange={(event) =>
                onPointChange(index, "value", event.target.value)
              }
            />
          </label>
        </div>
      ))}

      <button type="button" onClick={onReset}>
        Reset properties
      </button>
    </div>
  );
}