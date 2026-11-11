import { useEffect, useRef, useState } from "react";
import { TerminalSquare, Trash2 } from "lucide-react";
import { education, profile, projects, skills } from "../data";
type Entry = { command: string; output: string; link?: string };
export default function Terminal() {
  const [entries, setEntries] = useState<Entry[]>([
    {
      command: "whoami",
      output: `${profile.name}\nMSc Cybersecurity & Data Science / ESAIP\n${profile.location}\n\nPython developer building practical security skills.\nType help to explore this portfolio.`,
    },
  ]);
  const [input, setInput] = useState("");
  const history = useRef<string[]>([]);
  const index = useRef(0);
  const log = useRef<HTMLDivElement>(null);
  const commands: Record<string, string> = {
    help: "PORTFOLIO COMMANDS\n\nwhoami     Identity and current focus\nabout      Background and interests\nskills     Skills from the CV\nprojects   Real projects and current status\neducation  Education and credentials\ngithub     GitHub profile link\ncontact    Contact information\nlab        Recorded PentestMate validation\nclear      Clear this terminal\n\nThis terminal displays portfolio information only.",
    whoami: `${profile.name}\nMSc Cybersecurity & Data Science at ESAIP\n${profile.location}\nFocus: Python automation, authorized assessment, and reporting.`,
    about:
      "Computer science graduate pursuing an MSc at ESAIP.\nInterested in ethical hacking, secure software development,\nand security operations.\n\nOne-month online cybersecurity internship at Future Interns,\nFebruary 2026. Experience is described at its documented scope.",
    skills:
      skills.map((s) => `${s.group.padEnd(10)} ${s.name}`).join("\n") +
      "\n\nNo invented skill percentages or expertise ratings.",
    projects: projects
      .map((p) => `${p.title}\n  ${p.status}\n  ${p.stack.join(" / ")}`)
      .join("\n\n"),
    education:
      education
        .map((e) => `${e.date}\n${e.title}\n${e.organization}`)
        .join("\n\n") +
      "\n\nCredentials: Future Interns cybersecurity internship, Feb 2026;\nQSpiders Java full-stack web development, Oct 2026.",
    github: profile.github,
    contact: `Email: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}\n\nInterested in cybersecurity internships and learning opportunities.`,
    lab: "RECORDED PENTESTMATE VALIDATION / NOT LIVE TELEMETRY\n\n25 tests passed on Kali.\nReal isolated target: 127.0.0.1, HTTP on TCP 8000.\nBoth scan scopes passed. Zero automatic rule matches.\nOne explicitly synthetic manual finding: False Positive.\nEvidence hash and target isolation verified.\n\nThe command-center dashboard is a separate simulation.",
  };
  function run(value: string) {
    const raw = value.trim().slice(0, 150);
    if (!raw) return;
    history.current.push(raw);
    history.current = history.current.slice(-50);
    index.current = history.current.length;
    setInput("");
    if (raw.toLowerCase() === "clear") {
      setEntries([]);
      return;
    }
    const c = raw.toLowerCase();
    setEntries((items) => [
      ...items.slice(-19),
      {
        command: raw,
        output: Object.hasOwn(commands, c)
          ? commands[c]
          : "Unknown portfolio command. Type help for the supported commands.",
        link: c === "github" ? profile.github : undefined,
      },
    ]);
  }
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [entries]);
  return (
    <section className="section" id="terminal">
      <div className="shell terminal-layout">
        <div>
          <p className="eyebrow">05 / A DIFFERENT WAY TO EXPLORE</p>
          <h2>
            At home in
            <br />
            <span>the terminal.</span>
          </h2>
          <p className="section-copy">
            Explore my background, tools, and projects through a small,
            functional CLI. No shell execution and no access to your device.
          </p>
          <div className="terminal-shortcuts">
            {["help", "projects", "skills", "education"].map((c) => (
              <button type="button" key={c} onClick={() => run(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="terminal-window">
          <div className="terminal-title">
            <span>
              <TerminalSquare size={15} /> vr@portfolio: ~
            </span>
            <button
              type="button"
              onClick={() => setEntries([])}
              aria-label="Clear terminal"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div
            className="terminal-log"
            ref={log}
            role="log"
            aria-live="polite"
            aria-label="Portfolio terminal output"
          >
            {entries.map((entry, i) => (
              <div className="terminal-entry" key={i}>
                <p>
                  <b>visitor@portfolio</b>
                  <span> ~ $ </span>
                  {entry.command}
                </p>
                <pre>{entry.output}</pre>
                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open GitHub profile ↗
                  </a>
                )}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(input);
            }}
            className="terminal-input"
          >
            <label htmlFor="command-input">~ $</label>
            <input
              id="command-input"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={150}
              aria-label="Portfolio terminal command"
              placeholder="type help and press enter"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
                e.preventDefault();
                index.current = Math.min(
                  history.current.length,
                  Math.max(0, index.current + (e.key === "ArrowUp" ? -1 : 1)),
                );
                setInput(history.current[index.current] ?? "");
              }}
            />
            <button type="submit">Run ↵</button>
          </form>
          <div className="terminal-disclaimer">
            Local portfolio commands · input is displayed as text, never
            executed.
          </div>
        </div>
      </div>
    </section>
  );
}
