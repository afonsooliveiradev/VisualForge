import { Suspense, useState } from "react";
import { KpiCard } from "@visualforge/react";
import { BarChart, LineChart, AreaChart, DonutChart, StackedBarChart } from "./LazyCharts";
import "./styles/studio.css";

type Category = "all" | "metrics" | "charts";

const donutData = [
  { name: "Produtos", value: 44 },
  { name: "Servicos", value: 32 },
  { name: "Outros", value: 24 },
];

const stackedData = [
  { name: "Jan", online: 28, presencial: 14 },
  { name: "Fev", online: 36, presencial: 22 },
  { name: "Mar", online: 31, presencial: 20 },
  { name: "Abr", online: 45, presencial: 31 },
  { name: "Mai", online: 41, presencial: 28 },
  { name: "Jun", online: 59, presencial: 35 },
];

const stackedSeries = [
  { dataKey: "online", name: "Online", color: "#2563EB" },
  { dataKey: "presencial", name: "Presencial", color: "#22D3EE" },
];

const chartData = [
  { name: "Jan", value: 42 },
  { name: "Fev", value: 58 },
  { name: "Mar", value: 51 },
  { name: "Abr", value: 76 },
  { name: "Mai", value: 69 },
  { name: "Jun", value: 94 },
];

const examples = [
  { id: "revenue", title: "Revenue KPI", category: "metrics", description: "Financial performance" },
  { id: "users", title: "Active Users KPI", category: "metrics", description: "User engagement" },
  { id: "conversion", title: "Conversion KPI", category: "metrics", description: "Conversion rate" },
  { id: "bar", title: "Bar Chart", category: "charts", description: "Compare categories" },
  { id: "line", title: "Line Chart", category: "charts", description: "Analyze trends" },

  { id: "area", title: "Area Chart", category: "charts", description: "Time-series volume and trends" },
  { id: "donut", title: "Donut Chart", category: "charts", description: "Category shares and distribution" },
  { id: "stacked", title: "Stacked Bar Chart", category: "charts", description: "Composition across periods" },] as const;

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Components" },
  { id: "metrics", label: "Metrics & KPIs" },
  { id: "charts", label: "Charts" },
];

export default function App() {
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const visible = examples.filter((item) =>
    (category === "all" || item.category === category) &&
    `${item.title} ${item.description}`.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const has = (id: string) => visible.some((item) => item.id === id);
  const hasMetrics = ["revenue", "users", "conversion"].some(has);
  const hasCharts = ["bar", "line", "area", "donut", "stacked"].some((id) => has(id));
  const chooseCategory = (next: Category) => {
    setCategory(next);
    setMenuOpen(false);
  };

  return (
    <div className="vf-app">
      <aside className={`vf-sidebar ${menuOpen ? "is-open" : ""}`} aria-label="Component navigation">
        <div className="vf-brand">
          <div className="vf-brand-mark" aria-hidden="true">V</div>
          <div><strong>Visual<span>Forge</span></strong><small>COMPONENT STUDIO</small></div>
        </div>
        <p className="vf-nav-caption">WORKSPACE</p>
        <nav className="vf-navigation" aria-label="Categories">
          {categories.map((item) => (
            <button key={item.id} type="button" aria-pressed={category === item.id}
              className={`vf-nav-item ${category === item.id ? "is-active" : ""}`}
              onClick={() => chooseCategory(item.id)}>
              <span aria-hidden="true">{item.id === "all" ? "ALL" : item.id === "metrics" ? "KPI" : "CHT"}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="vf-sidebar-footer"><span className="vf-online-dot" /> Open Source - Alpha <small>v0.1.0</small></div>
      </aside>
      {menuOpen && <button type="button" className="vf-overlay" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <div className="vf-main">
        <header className="vf-topbar">
          <div className="vf-topbar-group">
            <button type="button" className="vf-menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}>Menu</button>
            <span className="vf-breadcrumb">Workspace <span>/</span> Components</span>
          </div>
          <div className="vf-topbar-group">
            <span className="vf-version">v0.1.0-alpha</span>
            <a className="vf-github" href="https://github.com/afonsooliveiradev/VisualForge" target="_blank" rel="noopener noreferrer">GitHub -&gt;</a>
          </div>
        </header>
        <main className="vf-content">
          <div className="vf-heading">
            <div>
              <span className="vf-eyebrow">VISUALFORGE / COMPONENT LIBRARY</span>
              <h1>Component Studio</h1>
              <p>Explore reusable React components for modern analytics applications.</p>
            </div>
            <span className="vf-preview-label">Library Preview</span>
          </div>
          <section className="vf-summary" aria-label="Library summary">
            <div className="vf-summary-card"><span>Catalog examples</span><strong>{examples.length}</strong><small>6 reusable component types</small></div>
            <div className="vf-summary-card"><span>Categories</span><strong>02</strong><small>Metrics and charts</small></div>
            <div className="vf-summary-card"><span>Visible examples</span><strong>{visible.length}</strong><small>Matching current filters</small></div>
          </section>
          <section className="vf-catalog-heading">
            <div><h2>Explore components</h2><p>Browse and preview the available visualizations.</p></div>
            <label className="vf-search"><span aria-hidden="true">Search</span><input type="search" aria-label="Search components"
              placeholder="Search components..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          </section>
          <div className="vf-filters" aria-label="Filter components">
            {categories.map((item) => <button key={item.id} type="button" aria-pressed={category === item.id}
              className={`vf-filter ${category === item.id ? "is-active" : ""}`}
              onClick={() => chooseCategory(item.id)}>{item.label}</button>)}
          </div>
          {visible.length === 0 ? (
            <div className="vf-empty"><h3>No components found</h3><p>Try a different search or category.</p>
              <button type="button" onClick={() => { setSearch(""); chooseCategory("all"); }}>Clear filters</button></div>
          ) : <>
            {hasMetrics && <section className="vf-section">
              <div className="vf-section-heading"><div><h3>Metrics & KPIs</h3><p>High-level performance indicators</p></div><span>METRICS</span></div>
              <div className="vf-kpi-grid">
                {has("revenue") && <KpiCard title="Revenue" value="$128,450" change="+12.8%" description="Compared to last month" />}
                {has("users") && <KpiCard title="Active Users" value="8,942" change="+8.2%" description="Monthly active users" />}
                {has("conversion") && <KpiCard title="Conversion Rate" value="4.8%" change="+1.3%" description="Current conversion rate" />}
              </div>
            </section>}
            {hasCharts && <section className="vf-section">
              <div className="vf-section-heading"><div><h3>Data Visualizations</h3><p>Reusable charts for business analytics</p></div><span>CHARTS</span></div>
              <Suspense fallback={<div role="status" aria-live="polite">Loading charts...</div>}>
              <div className="vf-chart-grid">
                {has("bar") && <article className="vf-chart-panel"><div className="vf-chart-heading"><div><small>COMPARISON</small><h4>Bar Chart</h4><p>Monthly performance</p></div><span aria-hidden="true">CHART</span></div><div className="vf-chart-body"><BarChart data={chartData} accessibilityLabel="Monthly performance bar chart" accessibilityDescription="Comparison of monthly performance values." /></div><div className="vf-chart-footer"><span>React / Recharts</span><span>Reusable</span></div></article>}
                {has("area") && <article className="vf-chart-panel"><div className="vf-chart-heading"><div><small>TIME SERIES</small><h4>Area Chart</h4><p>Volume and performance trend</p></div><span aria-hidden="true">CHART</span></div><div className="vf-chart-body"><AreaChart data={chartData} accessibilityLabel="Monthly performance area chart" accessibilityDescription="Area visualization of the performance trend over time." /></div><div className="vf-chart-footer"><span>React / Recharts</span><span>Reusable</span></div></article>}
                {has("donut") && <article className="vf-chart-panel"><div className="vf-chart-heading"><div><small>DISTRIBUTION</small><h4>Donut Chart</h4><p>Share by category</p></div><span aria-hidden="true">CHART</span></div><div className="vf-chart-body"><DonutChart data={donutData} accessibilityLabel="Category distribution donut chart" accessibilityDescription="Distribution of values across categories." /></div><div className="vf-chart-footer"><span>React / Recharts</span><span>Reusable</span></div></article>}
                {has("stacked") && <article className="vf-chart-panel"><div className="vf-chart-heading"><div><small>COMPOSITION</small><h4>Stacked Bar Chart</h4><p>Channels by month</p></div><span aria-hidden="true">CHART</span></div><div className="vf-chart-body"><StackedBarChart data={stackedData} series={stackedSeries} accessibilityLabel="Monthly channel composition chart" accessibilityDescription="Stacked comparison of channels by month." /></div><div className="vf-chart-footer"><span>React / Recharts</span><span>Reusable</span></div></article>}
                {has("line") && <article className="vf-chart-panel"><div className="vf-chart-heading"><div><small>TIME SERIES</small><h4>Line Chart</h4><p>Performance trend</p></div><span aria-hidden="true">CHART</span></div><div className="vf-chart-body"><LineChart data={chartData} accessibilityLabel="Monthly performance line chart" accessibilityDescription="Line visualization of the performance trend over time." /></div><div className="vf-chart-footer"><span>React / Recharts</span><span>Reusable</span></div></article>}
              </div>
              </Suspense>
            </section>}
          </>}
          <footer className="vf-footer"><span>VisualForge - Open Source Component Library</span><span>Built with React & TypeScript</span></footer>
        </main>
      </div>
    </div>
  );
}
