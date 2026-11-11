import { lazy, Suspense, useEffect, useState } from "react";
import {
  Activity,
  Pause,
  Play,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { LineChart, SeverityChart } from "./Charts";
import { nodes } from "./Topology";
const Topology = lazy(() => import("./Topology"));
const scenarios = [
  {
    name: "Baseline",
    summary:
      "Routine application requests and expected authentication activity.",
    base: 28,
    severity: [0, 1, 4, 9],
    events: [
      "Expected sign-in",
      "Application request",
      "Evidence checksum checked",
      "Scheduled policy check",
    ],
  },
  {
    name: "Login anomaly",
    summary:
      "Illustrative repeated sign-in attempts. This is a synthetic detection exercise.",
    base: 65,
    severity: [1, 5, 7, 4],
    events: [
      "Repeated sign-in attempt",
      "Identity rule matched",
      "Session review suggested",
      "Analyst triage queued",
    ],
  },
  {
    name: "Blocked requests",
    summary:
      "Illustrative request filtering and policy denials. No real traffic is involved.",
    base: 92,
    severity: [0, 6, 8, 3],
    events: [
      "Request policy denied",
      "Application input flagged",
      "Synthetic endpoint event",
      "Review note created",
    ],
  },
];
export default function Dashboard() {
  const [scenario, setScenario] = useState(0),
    [tick, setTick] = useState(0),
    [playing, setPlaying] = useState(
      () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
    [node, setNode] = useState("application"),
    [filter, setFilter] = useState("All"),
    [metric, setMetric] = useState("Requests");
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (!document.hidden) setTick((t) => t + 1);
    }, 4000);
    return () => clearInterval(id);
  }, [playing]);
  const current = scenarios[scenario];
  const values = Array.from({ length: 24 }, (_, i) =>
    Math.round(
      current.base +
        Math.sin((i + tick) * 0.7) * 12 +
        Math.cos(i * 1.9 + scenario) * 6,
    ),
  );
  const counts = current.severity;
  const events = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    title: current.events[(i + tick) % 4],
    node: nodes[(i + scenario) % nodes.length].label,
    severity: ["Low", "Medium", "High", "Low"][(i + scenario) % 4],
    time: `T+${String(Math.max(0, tick * 4 + 56 - i * 7)).padStart(3, "0")}s`,
  })).filter((e) => filter === "All" || e.severity === filter);
  const selected = nodes.find((n) => n.id === node)!;
  return (
    <section id="command-center" className="section command-section">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">02 / INTERACTIVE SIMULATION</p>
            <h2>
              Your view into the
              <br />
              <span>security lab.</span>
            </h2>
          </div>
          <p>
            Explore how signals, systems, and analyst context fit together.
            Every event and chart in this dashboard is simulated.
          </p>
        </div>
        <div className="simulation-banner">
          <span className="tag amber">SIMULATED DATA</span>
          <p>
            Portfolio demonstration · no live monitoring, real incidents,
            external scans, or access to your devices.
          </p>
        </div>
        <div className="dashboard-toolbar">
          <div
            className="scenario-controls"
            role="group"
            aria-label="Simulation scenario"
          >
            {scenarios.map((s, i) => (
              <button
                key={s.name}
                type="button"
                className={scenario === i ? "selected" : ""}
                aria-pressed={scenario === i}
                onClick={() => {
                  setScenario(i);
                  setTick(0);
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="dashboard-actions">
            <span className="small">T+{tick * 4 + 56}s</span>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "Pause simulation" : "Play simulation"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}{" "}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTick(0);
                setScenario(0);
                setFilter("All");
              }}
              aria-label="Reset simulation"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
        <div className="dashboard-metrics">
          <div>
            <span>
              <Activity size={14} />
              Simulated requests / min
            </span>
            <strong>{values[23]}</strong>
            <small>Scenario-generated sample</small>
          </div>
          <div>
            <span>
              <ShieldCheck size={14} />
              Synthetic policy denials
            </span>
            <strong>{scenario === 0 ? 1 : scenario === 1 ? 12 : 26}</strong>
            <small>Illustrative events only</small>
          </div>
          <div>
            <span>
              <SlidersHorizontal size={14} />
              Nodes in the model
            </span>
            <strong>06</strong>
            <small>Selectable synthetic services</small>
          </div>
          <div>
            <span>Sample severity records</span>
            <strong>{counts.reduce((a, b) => a + b, 0)}</strong>
            <small>Not real vulnerabilities</small>
          </div>
        </div>
        <div className="dashboard-grid">
          <article className="panel topology-panel">
            <div className="panel-heading">
              <h3>Interactive topology</h3>
              <span className="tag">SYNTHETIC</span>
            </div>
            <Suspense
              fallback={<div className="loading-visual">Loading topology…</div>}
            >
              <Topology compact selected={node} onSelect={setNode} />
            </Suspense>
            <div className="node-detail">
              <span>Selected node</span>
              <strong>{selected.label}</strong>
              <p>
                {selected.role} · documentation address 192.0.2.
                {nodes.indexOf(selected) + 10}
              </p>
            </div>
          </article>
          <div className="chart-stack">
            <article className="panel">
              <div className="panel-heading">
                <h3>Traffic over time</h3>
                <select
                  aria-label="Traffic chart metric"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                >
                  <option>Requests</option>
                  <option>Volume (KB)</option>
                </select>
              </div>
              <LineChart
                values={
                  metric === "Requests" ? values : values.map((v) => v * 7)
                }
                label={`Simulated ${metric.toLowerCase()} over 24 samples`}
              />
              <div className="chart-axis">
                <span>Earlier samples</span>
                <span>Latest sample</span>
              </div>
              <p className="chart-caption">
                {metric} · {current.summary}
              </p>
            </article>
            <article className="panel">
              <div className="panel-heading">
                <h3>Severity distribution</h3>
                <span className="small">Synthetic records</span>
              </div>
              <SeverityChart counts={counts} />
            </article>
          </div>
          <article className="panel events-panel">
            <div className="panel-heading">
              <h3>Activity timeline</h3>
              <select
                aria-label="Filter simulated events by severity"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {["All", "High", "Medium", "Low"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="event-list">
              {events.length ? (
                events.map((e) => (
                  <div className="event-row" key={e.id}>
                    <time>{e.time}</time>
                    <span>
                      <strong>{e.title}</strong>
                      <small>{e.node} · synthetic event</small>
                    </span>
                    <b className={"event-severity " + e.severity.toLowerCase()}>
                      {e.severity}
                    </b>
                  </div>
                ))
              ) : (
                <p>No synthetic events match this filter.</p>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
