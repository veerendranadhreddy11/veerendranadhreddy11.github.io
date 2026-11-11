import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  Github,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Play,
  Pause,
  Shield,
  TerminalSquare,
  X,
} from "lucide-react";
import { profile, projects, repositories, type Project } from "./data";
import Terminal from "./components/Terminal";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
const Topology = lazy(() => import("./components/Topology"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const root = "https://veerendranadhreddy11.github.io";
function Header({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);
  const anchor = (id: string) => (detail ? "/" : "") + "#" + id;
  return (
    <header className="site-header">
      <div className="shell navigation">
        <a href="/" className="brand" aria-label="Veerendranadh Reddy home">
          <span className="brand-symbol">
            <Shield size={20} />
          </span>
          <span>
            VR<span className="accent">.</span>
            <small>SECURITY & SOFTWARE</small>
          </span>
        </a>
        <button
          type="button"
          className="mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav
          id="main-nav"
          className={open ? "open" : ""}
          aria-label="Main navigation"
        >
          <a href={anchor("projects")} onClick={() => setOpen(false)}>
            Projects
          </a>
          <a href={anchor("command-center")} onClick={() => setOpen(false)}>
            Command center
          </a>
          <a href={anchor("skills")} onClick={() => setOpen(false)}>
            Skills
          </a>
          <a href={anchor("journey")} onClick={() => setOpen(false)}>
            About
          </a>
          <a
            className="nav-cta"
            href={anchor("contact")}
            onClick={() => setOpen(false)}
          >
            Let’s connect <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="shell footer">
      <a className="footer-logo" href="/">
        VR<span>.</span>
      </a>
      <p>
        © {new Date().getFullYear()} {profile.name}
        <small>
          Owner-authorized work. Learning in public, documenting carefully.
        </small>
      </p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
function Hero() {
  const [node, setNode] = useState("application");
  return (
    <section className="hero" id="home">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="shell">
        <div className="hero-layout">
          <div className="hero-copy reveal-intro">
            <p className="eyebrow">
              <span className="signal-dot" /> CYBERSECURITY / PYTHON DEVELOPMENT
            </p>
            <h1>
              Veerendranadh
              <br />
              <span>Reddy Tangirala.</span>
            </h1>
            <p className="hero-role">
              A security mindset.
              <br />
              An engineer’s curiosity.
            </p>
            <p className="hero-description">
              MSc student in Cybersecurity and Data Science at ESAIP, France. I
              build Python tools for authorized assessment and turn technical
              observations into clear, traceable evidence.
            </p>
            <div className="hero-buttons">
              <a className="button primary" href="#projects">
                Explore projects <ArrowDown size={15} />
              </a>
              <a
                className="button secondary"
                href="/assets/veerendranadh-reddy-cv.pdf"
                download
              >
                <Download size={15} />
                Download CV
              </a>
            </div>
            <div className="hero-links">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <span>{profile.location}</span>
            </div>
          </div>
          <div className="hero-topology panel">
            <div className="panel-heading">
              <span className="small caps">
                <Fingerprint size={14} /> PERSONAL SECURITY LAB
              </span>
              <span className="tag">INTERACTIVE 3D</span>
            </div>
            <Suspense
              fallback={
                <div className="loading-visual">
                  Preparing interactive topology…
                </div>
              }
            >
              <Topology selected={node} onSelect={setNode} />
            </Suspense>
            <div className="hero-topology-foot">
              <span className="signal-dot" />
              <span>Synthetic topology · portfolio visualization</span>
              <Code2 size={14} />
            </div>
          </div>
        </div>
        <div className="hero-proof">
          <div>
            <BookOpen size={20} />
            <span>
              <strong>MSc Cybersecurity & Data Science</strong>
              <small>ESAIP · Angers, France</small>
            </span>
          </div>
          <div>
            <CheckCircle2 size={20} />
            <span>
              <strong>25 tests passed on Kali</strong>
              <small>Documented PentestMate validation</small>
            </span>
          </div>
          <div>
            <FileCheck2 size={20} />
            <span>
              <strong>Evidence before claims</strong>
              <small>Real source, explicit project limits</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function Workflow({ project }: { project: Project }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const el = widget.current;
      if (
        !document.hidden &&
        el &&
        el.getClientRects().length &&
        el.getBoundingClientRect().bottom > 0 &&
        el.getBoundingClientRect().top < innerHeight
      ) {
        setStep((value) => (value + 1) % project.architecture.length);
      }
    }, 2400);
    return () => window.clearInterval(timer);
  }, [playing, project.architecture.length]);
  return (
    <div className="workflow-widget" ref={widget}>
      <button
        className="workflow-play"
        type="button"
        aria-pressed={playing}
        onClick={() => setPlaying((value) => !value)}
      >
        {playing ? <Pause size={12} /> : <Play size={12} />}
        {playing ? "Pause walkthrough" : "Play walkthrough"}
      </button>
      <div
        className="workflow-nodes"
        role="group"
        aria-label="Explore project architecture"
      >
        {project.architecture.map((name, i) => (
          <button
            type="button"
            key={name}
            aria-pressed={step === i}
            className={step === i ? "active" : ""}
            onClick={() => {
              setPlaying(false);
              setStep(i);
            }}
          >
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>{name}</span>
            {i < project.architecture.length - 1 && <ArrowRight size={13} />}
          </button>
        ))}
      </div>
      <div className="workflow-description">
        <span className="tag">STEP {step + 1}</span>
        <strong>{project.architecture[step]}</strong>
        <p>
          {project.slug === "pentestmate"
            ? [
                "Confirm authorization and select the target and TCP port scope.",
                "Run a TCP-connect service scan with Nmap. No exploit is launched.",
                "Validate XML before saving the latest scan and historical JSON records.",
                "Review potential findings, document analyst status, and attach evidence with hashes.",
                "Generate the report from saved observations, findings, and evidence references.",
              ][step]
            : project.features[Math.min(step, project.features.length - 1)]}
        </p>
        <small>
          Architecture explanation · this diagram does not execute the project.
        </small>
      </div>
    </div>
  );
}
function PentestFeature() {
  const [tab, setTab] = useState("Overview");
  const p = projects[0];
  const tabs = ["Overview", "Workflow", "Validation"];
  return (
    <article className="featured-project panel">
      <div className="feature-content">
        <div className="project-top">
          <span className="tag green">FEATURED / SECURITY AUTOMATION</span>
          <span className="small">PROJECT 01</span>
        </div>
        <h3>
          PentestMate<span>.</span>
        </h3>
        <p className="feature-subtitle">
          An assessment workflow you can inspect.
        </p>
        <div
          className="case-tabs"
          role="tablist"
          aria-label="PentestMate case study"
        >
          {tabs.map((name, i) => (
            <button
              key={name}
              type="button"
              role="tab"
              id={"case-tab-" + name}
              aria-controls={"case-panel-" + name}
              aria-selected={tab === name}
              tabIndex={tab === name ? 0 : -1}
              onClick={() => setTab(name)}
              onKeyDown={(e) => {
                const next =
                  e.key === "ArrowRight"
                    ? (i + 1) % 3
                    : e.key === "ArrowLeft"
                      ? (i + 2) % 3
                      : e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 2
                          : -1;
                if (next < 0) return;
                e.preventDefault();
                setTab(tabs[next]);
                document.getElementById("case-tab-" + tabs[next])?.focus();
              }}
            >
              {name}
            </button>
          ))}
        </div>
        {tabs.map((name) => (
          <div
            key={name}
            id={"case-panel-" + name}
            role="tabpanel"
            aria-labelledby={"case-tab-" + name}
            hidden={tab !== name}
          >
            {name === "Overview" ? (
              <>
                <p>{p.description}</p>
                <ul className="check-list">
                  <li>
                    <Check size={13} />
                    Explicit authorization before a scan
                  </li>
                  <li>
                    <Check size={13} />
                    Analyst-controlled finding lifecycle
                  </li>
                  <li>
                    <Check size={13} />
                    SHA-256 evidence checks and PDF export
                  </li>
                </ul>
              </>
            ) : name === "Workflow" ? (
              <Workflow project={p} />
            ) : (
              <>
                <div className="validation-stats">
                  <div>
                    <strong>25 / 25</strong>
                    <small>Tests passed on Kali</small>
                  </div>
                  <div>
                    <strong>11</strong>
                    <small>Menu actions exercised</small>
                  </div>
                  <div>
                    <strong>1</strong>
                    <small>Open local test service</small>
                  </div>
                  <div>
                    <strong>0</strong>
                    <small>Automatic rule matches</small>
                  </div>
                </div>
                <p className="small">
                  Recorded validation, not live telemetry. One synthetic manual
                  finding was marked False Positive.
                </p>
              </>
            )}
          </div>
        ))}
        <div className="tech-tags">
          {p.stack.slice(0, 4).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="feature-links">
          <a href="/projects/pentestmate/">
            Read the case study <ArrowUpRight size={14} />
          </a>
          <a href={p.repo} target="_blank" rel="noopener noreferrer">
            Source code <Github size={14} />
          </a>
        </div>
      </div>
      <div className="feature-media">
        <div className="media-top">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>KALI / DOCUMENTED WORKFLOW</span>
        </div>
        <video
          controls
          playsInline
          preload="metadata"
          poster="/assets/pentestmate-poster.webp"
          aria-label="PentestMate narrated Kali demonstration"
        >
          <source src="/assets/pentestmate-demo.mp4" type="video/mp4" />
          <track
            kind="captions"
            src="/assets/pentestmate-captions.vtt"
            srcLang="en"
            label="English"
            default
          />
        </video>
        <div className="media-caption">
          <Play size={12} />
          Actual Kali capture · male AI narration · English captions
        </div>
        <a
          href={p.repo + "/blob/main/docs/examples/demo-validation.json"}
          target="_blank"
          rel="noopener noreferrer"
          className="evidence-link"
        >
          <FileCheck2 size={15} />
          <span>Review the recorded validation evidence</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </article>
  );
}
function Projects() {
  const [filter, setFilter] = useState("All"),
    [search, setSearch] = useState("");
  const other = projects
    .slice(1)
    .filter(
      (p) =>
        (filter === "All" ||
          (filter === "Repositories" ? !!p.repo : !p.repo)) &&
        (p.title + " " + p.description)
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  return (
    <section className="section projects-section" id="projects">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">01 / BUILT, DOCUMENTED, VERIFIED</p>
            <h2>
              Projects with
              <br />
              <span>something behind them.</span>
            </h2>
          </div>
          <p>
            Actual source and honest engineering context. Demonstrations,
            limitations, and development status stay visible.
          </p>
        </div>
        <PentestFeature />
        <div className="project-toolbar">
          <div
            className="filter-row"
            role="group"
            aria-label="Filter project cards"
          >
            {["All", "Repositories", "Academic"].map((f) => (
              <button
                type="button"
                key={f}
                className={filter === f ? "selected" : ""}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type="search"
            aria-label="Search projects"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects…"
          />
        </div>
        <div className="project-cards">
          {other.map((p, i) => (
            <article className="project-card panel" key={p.slug}>
              <div className="project-card-top">
                {p.slug === "cybersoc" ? (
                  <Shield size={24} />
                ) : p.slug === "physician-agent" ? (
                  <Layers size={24} />
                ) : (
                  <Code2 size={24} />
                )}
                <span className="tag">{p.status}</span>
              </div>
              <p className="eyebrow">{p.category}</p>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tech-tags">
                {p.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a className="card-link" href={"/projects/" + p.slug + "/"}>
                Project details <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
        {!other.length && (
          <p className="empty-state">
            No projects match this search. Try a different term or filter.
          </p>
        )}
      </div>
    </section>
  );
}
function Repositories() {
  return (
    <section className="section repository-section" id="github">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">03 / CONNECTED TO THE SOURCE</p>
            <h2>
              Open the repository.
              <br />
              <span>Check the work.</span>
            </h2>
          </div>
          <p>
            Repository snapshot verified {profile.verifiedOn}. Status is based
            on inspected content, not fabricated contribution statistics.
          </p>
        </div>
        <div className="repo-list">
          {repositories.map((r) => (
            <a
              href={r.url}
              key={r.name}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-row"
            >
              <Github size={20} />
              <span>
                <strong>{r.name}</strong>
                <small>{r.description}</small>
              </span>
              <span className="repo-language">{r.language}</span>
              <span className="tag">{r.state}</span>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
        <p className="repository-note">
          Academic projects without a verified public repository are identified
          separately. PentestMate is proprietary; viewing source does not grant
          reuse rights.
        </p>
      </div>
    </section>
  );
}
function Contact() {
  const [status, setStatus] = useState("");
  return (
    <section className="section contact-section" id="contact">
      <div className="shell">
        <p className="eyebrow">
          <span className="signal-dot" /> CONTACT / OPPORTUNITIES
        </p>
        <h2>
          Let’s start a<br />
          <span>useful conversation.</span>
        </h2>
        <p>
          Interested in cybersecurity internships, hands-on learning,
          <br className="desktop-break" /> and building tools that make
          technical work clearer.
        </p>
        <a className="contact-email" href={"mailto:" + profile.email}>
          {profile.email}
          <ArrowUpRight size={24} />
        </a>
        <div className="contact-links">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} />
            GitHub
          </a>
          <a href="/assets/veerendranadh-reddy-cv.pdf" download>
            <Download size={16} />
            Download CV
          </a>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(profile.email);
                setStatus("Email copied.");
              } catch {
                setStatus("Use the email link above to get in touch.");
              }
            }}
          >
            <Copy size={15} />
            Copy email
          </button>
        </div>
        <p className="copy-status" role="status">
          {status}
        </p>
        <small>
          Based in {profile.location} · English fluent · Telugu native · French
          beginner
        </small>
      </div>
    </section>
  );
}
function ProjectDetail({ project: p }: { project: Project }) {
  useEffect(() => {
    document.title = p.title + " | " + profile.name;
  }, [p]);
  return (
    <>
      <div id="top" />
      <Header detail />
      <main id="main">
        <section className="section detail-section">
          <div className="shell">
            <a className="back-link" href="/#projects">
              <ArrowLeft size={15} />
              Back to selected work
            </a>
            <div className="detail-title">
              <p className="eyebrow">{p.category}</p>
              <h1>{p.title}</h1>
              <span className="tag green">{p.status}</span>
              <p>{p.description}</p>
              <div className="tech-tags">
                {p.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {p.repo && (
                <a
                  className="button secondary"
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  View repository <ArrowUpRight size={14} />
                </a>
              )}
            </div>
            <div className="detail-grid">
              <article className="panel">
                <p className="eyebrow">TECHNICAL CAPABILITIES</p>
                <h2>What it does.</h2>
                <ul className="detail-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="panel">
                <p className="eyebrow">ENGINEERING CONTEXT</p>
                <h2>What needed care.</h2>
                <ul className="detail-list">
                  {p.challenges.map((f) => (
                    <li key={f}>
                      <Code2 size={15} />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <article className="panel architecture-detail">
              <p className="eyebrow">INTERACTIVE ARCHITECTURE</p>
              <h2>Follow the workflow.</h2>
              <Workflow project={p} />
            </article>
            <article className="panel evidence-detail">
              <FileCheck2 size={24} />
              <div>
                <p className="eyebrow">EVIDENCE & LIMITATIONS</p>
                <p>{p.evidence}</p>
                {p.slug === "pentestmate" && (
                  <a
                    href={
                      p.repo + "/blob/main/docs/examples/demo-validation.json"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read the validation manifest <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </article>
            {p.slug === "pentestmate" && (
              <div className="detail-video">
                <h2>The recorded demonstration.</h2>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/assets/pentestmate-poster.webp"
                >
                  <source src="/assets/pentestmate-demo.mp4" type="video/mp4" />
                  <track
                    kind="captions"
                    src="/assets/pentestmate-captions.vtt"
                    srcLang="en"
                    label="English"
                    default
                  />
                </video>
                <p>
                  Actual Kali desktop capture · male AI narration · isolated
                  local service.
                </p>
              </div>
            )}
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  const slug = location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const project = projects.find((p) => p.slug === slug);
  if (slug && project)
    return (
      <>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ProjectDetail project={project} />
      </>
    );
  if (slug && !project)
    return (
      <main className="shell section">
        <h1>Project not found.</h1>
        <a href="/">Return to the portfolio</a>
      </main>
    );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Suspense
          fallback={
            <section className="section shell">
              Loading simulation dashboard…
            </section>
          }
        >
          <Dashboard />
        </Suspense>
        <Repositories />
        <Skills />
        <Terminal />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
