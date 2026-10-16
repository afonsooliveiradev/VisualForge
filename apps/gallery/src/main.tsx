import React from 'react';
import { createRoot } from 'react-dom/client';
import { VISUALFORGE_VERSION } from '@visualforge/react';
import './styles.css';
function App() { return <main className="shell"><div className="eyebrow">OPEN SOURCE · REACT · DATA VISUALIZATION</div><h1>Visual<span>Forge</span></h1><p>Build. Visualize. Reuse.</p><section className="panel"><div className="label">SPRINT 01 · FOUNDATION</div><h2>A home for reusable visual components.</h2><p>Our React component gallery is taking shape. Charts, KPIs and integration examples arrive in upcoming sprints.</p><div className="chips"><span>React</span><span>TypeScript</span><span>Dark Tech</span><span>v{VISUALFORGE_VERSION}</span></div></section><footer>VisualForge · Open source by design</footer></main>; }
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
