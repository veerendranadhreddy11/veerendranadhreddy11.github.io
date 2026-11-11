import { useState } from "react";
import {
  Code2,
  Database,
  Network,
  Shield,
  Terminal,
  Workflow,
} from "lucide-react";
import { skills } from "../data";
export default function Skills() {
  const [filter, setFilter] = useState("All"),
    [selected, setSelected] = useState("Python");
  const item = skills.find((s) => s.name === selected)!;
  const icons = {
    Code: Code2,
    Data: Database,
    Networks: Network,
    Security: Shield,
    Systems: Terminal,
  };
  return (
    <section className="section skills-section" id="skills">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">04 / SKILLS & FUNDAMENTALS</p>
            <h2>
              Tools I use.
              <br />
              <span>Foundations I’m building.</span>
            </h2>
          </div>
          <p>
            Skills from my CV and documented project work. Select a card for
            context; there are no invented proficiency percentages.
          </p>
        </div>
        <div className="filter-row" role="group" aria-label="Filter skills">
          {["All", "Code", "Security", "Systems", "Networks", "Data"].map(
            (g) => (
              <button
                key={g}
                className={filter === g ? "selected" : ""}
                aria-pressed={filter === g}
                onClick={() => setFilter(g)}
              >
                {g}
              </button>
            ),
          )}
        </div>
        <div className="skill-layout">
          <div className="skill-cards">
            {skills
              .filter((s) => filter === "All" || s.group === filter)
              .map((s) => {
                const Icon = icons[s.group as keyof typeof icons];
                return (
                  <button
                    key={s.name}
                    className={
                      selected === s.name ? "skill-card selected" : "skill-card"
                    }
                    onClick={() => setSelected(s.name)}
                    aria-pressed={selected === s.name}
                  >
                    <Icon size={19} />
                    <strong>{s.name}</strong>
                    <span>{s.group}</span>
                  </button>
                );
              })}
          </div>
          <aside className="panel skill-context">
            <span className="tag">SELECTED TOOL</span>
            <h3>{item.name}</h3>
            <p>{item.note}</p>
            <div className="mini-architecture">
              <div>
                <Workflow size={17} /> PentestMate toolchain
              </div>
              <svg
                key={selected}
                viewBox="0 0 300 150"
                role="img"
                aria-label="Python invokes Nmap and connects XML records, SHA-256 evidence, and ReportLab PDF generation"
              >
                <path
                  d="M150 30V60M150 60H40V100M150 60V100M150 60H260V100"
                  fill="none"
                  stroke="#4b8391"
                />
                <rect
                  x="108"
                  y="8"
                  width="84"
                  height="30"
                  rx="5"
                  fill="#163541"
                  stroke="#477c88"
                />
                <text
                  x="150"
                  y="28"
                  textAnchor="middle"
                  fill="#cceef4"
                  fontSize="11"
                >
                  Python
                </text>
                {[
                  ["Nmap", 40],
                  ["XML / JSON", 150],
                  ["PDF / hashes", 260],
                ].map(([label, x]) => (
                  <g key={label}>
                    <circle cx={x} cy="105" r="5" fill="#8ae2d0" />
                    <text
                      x={x}
                      y="132"
                      textAnchor="middle"
                      fill="#aec6d8"
                      fontSize="10"
                    >
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
              <small>Actual project components, not a proficiency scale.</small>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
