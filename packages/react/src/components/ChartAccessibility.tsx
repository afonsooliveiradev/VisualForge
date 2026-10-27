import * as React from "react";

export interface ChartAccessibilityProps {
  label?: string;
  description?: string;
  height?: number;
  empty?: boolean;
  children?: React.ReactNode;
}

const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export function ChartAccessibility({
  label,
  description,
  height = 280,
  empty = false,
  children,
}: ChartAccessibilityProps) {
  const descriptionId = React.useId();

  return (
    <div
      role="group"
      aria-label={label}
      aria-describedby={description ? descriptionId : undefined}
      style={empty ? undefined : { width: "100%", height, minWidth: 0 }}
    >
      {description && (
        <span id={descriptionId} style={visuallyHidden}>
          {description}
        </span>
      )}
      {empty ? <div role="status">No data available</div> : children}
    </div>
  );
}