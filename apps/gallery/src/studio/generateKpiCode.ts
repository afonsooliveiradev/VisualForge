import type { KpiCardProps } from "@visualforge/react";

/**
 * Generates a reusable React/TSX example.
 * JSON.stringify escapes user-provided string values.
 */
export function generateKpiCode(props: KpiCardProps): string {
  function attribute(
    name: string,
    value: string | number,
  ): string {
    return `  ${name}={${JSON.stringify(value)}}`;
  }

  const attributes = [
    attribute("title", props.title),
    attribute("value", props.value),
  ];

  if (props.change !== undefined) {
    attributes.push(attribute("change", props.change));
  }

  if (props.description !== undefined) {
    attributes.push(attribute("description", props.description));
  }

  if (props.accentColor !== undefined) {
    attributes.push(attribute("accentColor", props.accentColor));
  }

  return [
    'import { KpiCard } from "@visualforge/react";',
    "",
    "<KpiCard",
    ...attributes,
    "/>",
  ].join("\n");
}
