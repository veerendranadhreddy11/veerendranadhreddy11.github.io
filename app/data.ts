export const profile = {
  name: "Veerendranadh Reddy Tangirala",
  email: "veerendranadhreddy11@gmail.com",
  github: "https://github.com/veerendranadhreddy11",
  linkedin: "https://www.linkedin.com/in/veerendranadhreddy-t-aa12aa444/",
  location: "Angers, France",
  verifiedOn: "12 November 2026",
};
export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  description: string;
  stack: string[];
  repo?: string;
  features: string[];
  challenges: string[];
  architecture: string[];
  evidence: string;
};
export const projects: Project[] = [
  {
    slug: "pentestmate",
    title: "PentestMate",
    category: "Security automation",
    status: "Implemented & validated",
    description:
      "An 11-option Python CLI that connects authorized Nmap assessment, analyst findings, evidence integrity, and PDF reporting.",
    stack: ["Python", "Nmap", "Kali Linux", "ReportLab", "JSON / XML"],
    repo: profile.github + "/PentestMate",
    features: [
      "IPv4 target selection and separate assessment records.",
      "Common 1,000 or all 65,535 TCP-port connect scans, with explicit authorization.",
      "Limited exact service-version rules produce potential findings, never exploitation claims.",
      "Manual findings, status updates, safe edits, and SHA-256 evidence verification.",
      "Automated and individual PDF export; a legacy XML-import interface remains available.",
    ],
    challenges: [
      "Preserve the previous result when a scan fails or is cancelled.",
      "Avoid duplicate automated findings while retaining analyst decisions.",
      "Keep evidence references traceable and records isolated per target.",
    ],
    architecture: [
      "Authorized scope",
      "Nmap service scan",
      "XML / JSON records",
      "Analyst findings & evidence",
      "PDF assessment",
    ],
    evidence:
      "25 tests passed in the documented Kali validation. The isolated test service on 127.0.0.1:8000 produced one open service and zero rule matches. The demo adds one explicitly synthetic manual finding, marked False Positive.",
  },
  {
    slug: "cybersoc",
    title: "CyberSOC",
    category: "Repository in preparation",
    status: "Initial scaffold",
    description:
      "A newly created repository for future cybersecurity work. The current public tree contains a README, license, and gitignore; no application is published.",
    stack: ["Repository scaffold"],
    repo: profile.github + "/CyberSOC",
    features: [
      "Public repository verified through GitHub.",
      "README, license, and gitignore are present.",
      "No implemented SOC monitoring functionality is claimed.",
    ],
    challenges: [
      "Define a testable project scope before implementing monitoring features.",
    ],
    architecture: [
      "Repository scaffold",
      "Scope to be defined",
      "Implementation not published",
    ],
    evidence:
      "Repository inspected on 12 November 2026. The simulation dashboard in this portfolio is a portfolio feature, not a published CyberSOC product.",
  },
  {
    slug: "physician-agent",
    title: "AI-Driven General Physician Agent",
    category: "Academic capstone",
    status: "In development",
    description:
      "A Python-based healthcare assistant capstone exploring data processing, model development, evaluation, and automated recommendations.",
    stack: ["Python", "Machine-learning concepts"],
    features: [
      "Data processing and model-development work described in the CV.",
      "System evaluation and recommendation concepts.",
      "Development status is retained; no clinical efficacy is claimed.",
    ],
    challenges: [
      "Evaluate outputs carefully and communicate the limitations of a healthcare prototype.",
    ],
    architecture: [
      "Data processing",
      "Model development",
      "System evaluation",
      "Prototype recommendations",
    ],
    evidence:
      "CV-reported capstone, May 2026 onward. A public source repository or reproducible benchmark was not available for independent inspection.",
  },
  {
    slug: "future-fit",
    title: "Future Fit College App",
    category: "Application development",
    status: "Academic project",
    description:
      "A student-facing application to explore colleges and academic opportunities through search, filtering, and comparison.",
    stack: ["Search & filtering", "Information management"],
    features: [
      "College and academic-opportunity search.",
      "Filtering and information-management features.",
      "College comparison to support exploration.",
    ],
    challenges: [
      "Organize college information so search and comparisons are useful.",
    ],
    architecture: [
      "College information",
      "Search & filters",
      "Comparison",
      "Student exploration",
    ],
    evidence:
      "CV-reported project, November 2025. The CV does not specify a technical framework, and no public source link is invented.",
  },
];
export const skills = [
  {
    name: "Python",
    group: "Code",
    note: "CLI development, file handling, assessment automation.",
  },
  {
    name: "Java",
    group: "Code",
    note: "Programming foundation; Java full-stack training.",
  },
  {
    name: "C",
    group: "Code",
    note: "Computer science programming foundation.",
  },
  { name: "MySQL", group: "Data", note: "Database fundamentals from the CV." },
  {
    name: "Kali Linux",
    group: "Security",
    note: "PentestMate lab environment and security tooling.",
  },
  {
    name: "Nmap",
    group: "Security",
    note: "Authorized TCP service scans and XML interpretation.",
  },
  {
    name: "Wireshark",
    group: "Security",
    note: "Network analysis tool listed in the CV.",
  },
  {
    name: "Linux",
    group: "Systems",
    note: "Operating-system and security fundamentals.",
  },
  { name: "Windows", group: "Systems", note: "Operating-system foundation." },
  {
    name: "TCP/IP & DNS",
    group: "Networks",
    note: "Protocols and networking fundamentals.",
  },
  {
    name: "HTTP / HTTPS",
    group: "Networks",
    note: "Web protocol fundamentals.",
  },
  {
    name: "Security reporting",
    group: "Security",
    note: "Findings, evidence references, remediation, and PDF export.",
  },
];
export const education = [
  {
    date: "2026 — present",
    title: "MSc in Cybersecurity and Data Science",
    organization: "ESAIP Graduate School of Engineering",
    detail: "Angers, France. Current postgraduate study.",
  },
  {
    date: "2022 — 2026",
    title: "BTech in Computer Science and Engineering",
    organization: "CMR University",
    detail:
      "Computer science, programming, and software-development foundation.",
  },
];
export const repositories = [
  {
    name: "PentestMate",
    language: "Python",
    description:
      "Implemented assessment automation; reviewed source and documentation.",
    url: profile.github + "/PentestMate",
    state: "Source available",
  },
  {
    name: "CyberSOC",
    language: "Scaffold",
    description:
      "README, license, and gitignore only. Implementation not published.",
    url: profile.github + "/CyberSOC",
    state: "Initial scaffold",
  },
  {
    name: "Portfolio",
    language: "React / TypeScript",
    description:
      "This portfolio: interactive simulation, 3D topology, project evidence, and safe terminal.",
    url: profile.github + "/veerendranadhreddy11.github.io",
    state: "Current build",
  },
];
