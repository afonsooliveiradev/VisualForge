import {
  KpiCard,
  BarChart,
  LineChart,
} from "@visualforge/react";

const chartData = [
  { name: "Jan", value: 42 },
  { name: "Fev", value: 58 },
  { name: "Mar", value: 51 },
  { name: "Abr", value: 76 },
  { name: "Mai", value: 69 },
  { name: "Jun", value: 94 },
];

const panelStyle = {
  background: "#172554",
  border: "1px solid #334155",
  borderRadius: 16,
  padding: 20,
};

export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0B1220",
        color: "#F8FAFC",
        padding: "32px 20px",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ marginBottom: 36 }}>
          <div style={{ color: "#22D3EE", fontSize: 13 }}>
            OPEN SOURCE · REACT · TYPESCRIPT
          </div>

          <h1 style={{ fontSize: 42, marginBottom: 8 }}>
            Visual<span style={{ color: "#22D3EE" }}>Forge</span>
          </h1>

          <p style={{ color: "#94A3B8" }}>
            Reusable data visualization components for modern applications.
          </p>
        </header>

        <h2>Components Gallery</h2>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <KpiCard
            title="Revenue"
            value="$128,450"
            change="+12.8%"
            description="Compared to last month"
          />
          <KpiCard
            title="Active Users"
            value="8,942"
            change="+8.2%"
            description="Monthly active users"
          />
          <KpiCard
            title="Conversion Rate"
            value="4.8%"
            change="+1.3%"
            description="Current conversion rate"
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))",
            gap: 20,
          }}
        >
          <article style={panelStyle}>
            <h3>BarChart</h3>
            <p style={{ color: "#94A3B8" }}>
              Monthly performance
            </p>
            <BarChart data={chartData} />
          </article>

          <article style={panelStyle}>
            <h3>LineChart</h3>
            <p style={{ color: "#94A3B8" }}>
              Performance trend
            </p>
            <LineChart data={chartData} />
          </article>
        </section>

        <footer
          style={{
            marginTop: 48,
            color: "#94A3B8",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          VisualForge · Open Source Component Library · v0.1.0-alpha
        </footer>
      </div>
    </main>
  );
}
