# Veerendranadh Reddy Tangirala · Security portfolio

**Live:** https://veerendranadhreddy11.github.io/

A React/TypeScript cybersecurity portfolio with a Three.js topology, interactive SOC-style simulation, documented project case studies, a safe portfolio terminal, skills explorer, timeline, and downloadable CV.

## Content is evidence-led

- Education, internship, credentials, languages, and foundational skills follow the supplied CV.
- PentestMate has implemented source, a narrated Kali demonstration, and documented test evidence. Its 25-test validation is a recorded result, not a live status indicator.
- CyberSOC was inspected as an initial scaffold containing README, license, and gitignore. No implemented SOC product is claimed.
- Academic projects without available public source are labeled accordingly. The healthcare capstone remains in development.
- All dashboard traffic, events, severity records, topology nodes, and documentation-range IP addresses are **simulated**. The dashboard does not monitor devices, scan networks, or connect to external security services.
- The terminal accepts allowlisted portfolio commands and renders input as text. It never executes arbitrary shell commands.
- No GitHub contribution counts or proficiency percentages are invented.

## Develop

Requires Node.js 22.18+ and npm. The project uses React, TypeScript, Vite, Three.js, and Lucide icons. SVG charts keep the simulation lightweight; fonts are self-hosted.

```bash
npm ci
npm run dev
```

Open the URL printed by Vite. The source lives in `app/`.

## Production and GitHub Pages

```bash
npm run build
```

TypeScript is checked before Vite builds into ignored `dist/`. `scripts/pages.mjs` publishes the generated HTML, hashed bundles under `assets/build/`, local fonts/licenses, CV, and static project detail pages to this repository's root. Only the generated build-bundle folder is refreshed; source and retained media are preserved. The root HTML also includes static profile/project summaries, JSON-LD, project-specific metadata, robots.txt, and a sitemap.

The existing GitHub Pages configuration serves **main / root**. Commit the source, lockfile, and regenerated Pages artifacts, then push `main`. No server or credentials are required by the deployed site. `npm run preview` serves Vite's `dist/`; testing the root publication also checks the generated detail-page HTML.

## Test

```bash
npx playwright install chromium
npm run build
npm test
```

Python 3 is used by the test server. To use an installed Chromium:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test
```

The browser suite checks WebGL or fallback topology, simulation scenarios and pause/reset/filter controls, terminal commands and injection resistance, case-study tabs, play/pause architecture walkthroughs, direct detail routes, project and skill filters, timeline, CV download, video/captions, copy-email, five viewport widths, mobile navigation, reduced motion, no-JavaScript fallback, static metadata/assets, and axe WCAG A/AA checks. These are portfolio browser tests; they do not rerun PentestMate's original lab suite. `.github/workflows/portfolio.yml` runs the build and browser suite on main pushes and pull requests.

## Maintain content

- `app/data.ts`: CV-based profile, projects, skill context, repository presentation, and evidence statements.
- `app/components/`: topology, simulation/charts, terminal, skills, and journey.
- `app/App.tsx`: recruiter-facing homepage, source explorer, detail pages, contact, navigation.
- `public/`: retained demo assets, downloadable CV, locally hosted fonts, licenses, and source snapshots.
- `scripts/refresh-github.mjs`: refresh the public repository metadata snapshot with an already authenticated `gh` CLI. No token is written to the website. Run `npm run refresh:github`, review the project status in `app/data.ts`, update its verification date, and rebuild. The deployed site uses a reviewed snapshot to avoid public API rate limits.
- `scripts/create_cv.py`: generate a privacy-conscious CV from the supplied CV and verified project work (requires ReportLab 4.4.9). The original uploaded PDF, phone number, and academic percentages are not published.

## Accessibility and motion

Every 3D node has an equivalent button. A 2D interactive fallback remains available when WebGL cannot initialize. Graph rendering pauses offscreen and in hidden tabs; auto-rotation and opening animation respect reduced motion. Simulation starts paused for reduced-motion users and can always be paused manually. Filters, controls, tabs, keyboard history, and labeled chart summaries remain usable without relying on color alone. Without JavaScript, static profile/project summaries and source/contact links remain in the published HTML.

## Rights and media

Copyright © 2026 Veerendranadh Reddy Tangirala in original portfolio materials. Third-party materials retain their licenses. Served notices are in `licenses/`; self-hosted DM Sans and Space Grotesk include their SIL Open Font License texts in `fonts/`.

PentestMate is proprietary; inspect its repository license before reusing it. Its demo is owner-authorized project media, includes male AI narration, and has English captions. The decorative security-workspace artwork is generated art, not a photograph of the owner's workplace or a claim to own pictured equipment.
