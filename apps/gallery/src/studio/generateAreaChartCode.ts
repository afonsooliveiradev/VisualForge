import type { AreaChartProps } from "@visualforge/react";

/**
 * Generates a reusable React/TSX example.
 * JSON.stringify safely serializes user-provided data.
 */
export function generateAreaChartCode(
  props: AreaChartProps,
): string {
  const data = JSON.stringify(props.data, null, 2);

  const attributes = [
    "  data={data}",
    `  height={${JSON.stringify(props.height ?? 280)}}`,
    `  color={${JSON.stringify(props.color ?? "#22D3EE")}}`,
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
    'import { AreaChart } from "@visualforge/react";',
    "",
    `const data = ${data};`,
    "",
    "<AreaChart",
    ...attributes,
    "/>",
  ].join("\n");
}
