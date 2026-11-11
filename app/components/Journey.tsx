import { useState } from "react";
import { Award, BookOpen, Briefcase, Code2 } from "lucide-react";
const items = [
  {
    group: "Education",
    date: "2026 — present",
    title: "MSc in Cybersecurity and Data Science",
    org: "ESAIP Graduate School of Engineering",
    text: "Current postgraduate study in Angers, France.",
    Icon: BookOpen,
  },
  {
    group: "Education",
    date: "2022 — 2026",
    title: "BTech in Computer Science and Engineering",
    org: "CMR University",
    text: "A foundation in programming, software development, and computer science.",
    Icon: BookOpen,
  },
  {
    group: "Experience",
    date: "February 2026 · one month · online",
    title: "Cybersecurity Intern",
    org: "Future Interns",
    text: "Cybersecurity fundamentals, ethical hacking concepts, vulnerability identification, system security, and exposure to risk assessment.",
    Icon: Briefcase,
  },
  {
    group: "Credentials",
    date: "October 2026",
    title: "Full Stack Web Development with Java",
    org: "QSpiders",
    text: "Credential listed in the supplied CV.",
    Icon: Award,
  },
  {
    group: "Credentials",
    date: "February 2026",
    title: "Cybersecurity Internship",
    org: "Future Interns",
    text: "Internship credential listed in the supplied CV.",
    Icon: Award,
  },
  {
    group: "Projects",
    date: "Current project",
    title: "PentestMate",
    org: "Personal security automation project",
    text: "Implemented assessment workflow, recorded demonstration, and documented Kali test evidence.",
    Icon: Code2,
  },
  {
    group: "Projects",
    date: "May 2026 onward",
    title: "AI-Driven General Physician Agent",
    org: "Academic capstone · in development",
    text: "Data processing, model development, system evaluation, and recommendation concepts.",
    Icon: Code2,
  },
];
export default function Journey() {
  const [filter, setFilter] = useState("All");
  return (
    <section className="section" id="journey">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">06 / EDUCATION & EXPERIENCE</p>
            <h2>
              A foundation in software.
              <br />
              <span>A direction in security.</span>
            </h2>
          </div>
          <p>
            My studies, early experience, and project work. Credentials and
            dates follow my CV; project results are separately documented.
          </p>
        </div>
        <div className="filter-row" role="group" aria-label="Filter timeline">
          {["All", "Education", "Experience", "Credentials", "Projects"].map(
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
        <div className="journey-grid">
          {items
            .filter((i) => filter === "All" || i.group === filter)
            .map((i) => (
              <article className="journey-item" key={i.title + i.date}>
                <div className="journey-icon">
                  <i.Icon size={19} />
                </div>
                <div>
                  <p className="eyebrow">{i.date}</p>
                  <h3>{i.title}</h3>
                  <strong>{i.org}</strong>
                  <p>{i.text}</p>
                </div>
              </article>
            ))}
        </div>
        <div className="languages">
          <span>Languages</span>
          <p>
            English <b>Fluent</b>
          </p>
          <p>
            Telugu <b>Native</b>
          </p>
          <p>
            French <b>Beginner</b>
          </p>
        </div>
      </div>
    </section>
  );
}
