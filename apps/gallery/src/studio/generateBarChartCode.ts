import type { BarChartProps } from "@visualforge/react";

/**
 * Generates a reusable React/TSX example.
 * JSON.stringify safely serializes user-provided data.
 */
export function generateBarChartCode(
  props: BarChartProps,
): string {
  const data = JSON.stringify(props.data, null, 2);

  const attributes = [
    "  data={data}",
    `  height={${JSON.stringify(props.height ?? 280)}}`,
    `  color={${JSON.stringify(props.color ?? "#2563EB")}}`,
  ];

  if (props.accessibilityLabel !== undefined) {
    attributes.push(
      `  accessibilityLabel={${JSON.stringify(props.accessibilityLabel)}}`,
    );
  }

  if (props.accessibilityDescription !== undefined) {
    attributes.push(
      `  accessibilityDescription={${JSON.stringify(props.accessibilityDescription)}}`,
    );
  }

  return [
    'import { BarChart } from "@visualforge/react";',
    "",
    `const data = ${data};`,
    "",
    "<BarChart",
    ...attributes,
    "/>",
  ].join("\n");
}
