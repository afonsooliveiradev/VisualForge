import type { CSSProperties } from "react";

export interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  description?: string;
  accentColor?: string;
}

export function KpiCard({
  title,
  value,
  change,
  description,
  accentColor = "#22D3EE",
}: KpiCardProps) {
  const style: CSSProperties = {
    background: "#172554",
    border: "1px solid #334155",
    borderRadius: 16,
    padding: 20,
    color: "#F8FAFC",
    minWidth: 0,
  };

  return (
    <article style={style}>
      <div style={{ color: "#94A3B8", fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 30, fontWeight: 700, marginTop: 10 }}>
        {value}
      </div>
      {change && (
        <div style={{ color: accentColor, marginTop: 8 }}>
          {change}
        </div>
      )}
      {description && (
        <p style={{ color: "#94A3B8", fontSize: 13 }}>
          {description}
        </p>
      )}
    </article>
  );
}
