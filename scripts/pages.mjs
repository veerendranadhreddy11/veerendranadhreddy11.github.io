import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { projects, profile } from "../app/data.ts";
const escape = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const rootUrl = "https://veerendranadhreddy11.github.io";
await rm("assets/build", { recursive: true, force: true });
await cp("dist/assets", "assets", { recursive: true });
await cp("dist/fonts", "fonts", { recursive: true });
await cp("dist/licenses", "licenses", { recursive: true });
if (await readFile("dist/data/github.json", "utf8").catch(() => null)) {
  await mkdir("data", { recursive: true });
  await cp("dist/data/github.json", "data/github.json");
}
let html = await readFile("dist/index.html", "utf8");
const person = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: rootUrl,
  jobTitle: "MSc student in Cybersecurity and Data Science",
  sameAs: [profile.github, profile.linkedin],
});
html = html.replace(
  "</head>",
  `<script type="application/ld+json">${person}</script></head>`,
);
const fallback = `<div style="padding:40px;font-family:system-ui;background:#080e18;color:#e6f0f7"><h1>${escape(profile.name)}</h1><p>MSc Cybersecurity &amp; Data Science at ESAIP, Angers, France. Python developer building tools for authorized security assessment.</p><h2>Projects</h2>${projects.map((p) => `<article><h3><a style="color:#a4ddeb" href="/projects/${p.slug}/">${escape(p.title)}</a></h3><p>${escape(p.description)} ${escape(p.status)}.</p></article>`).join("")}<p><a style="color:#a4ddeb" href="mailto:${profile.email}">Contact ${escape(profile.name)}</a></p><noscript><p>Enable JavaScript for the interactive simulation, topology, filters, and terminal. Project summaries and contact links remain available here.</p></noscript></div>`;
html = html.replace(
  '<div id="root"></div>',
  `<div id="root">${fallback}</div>`,
);
await writeFile("index.html", html);
for (const p of projects) {
  const dir = `projects/${p.slug}`;
  await mkdir(dir, { recursive: true });
  let page = html
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${escape(p.title)} | ${escape(profile.name)}</title>`,
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?\s*>/,
      `<meta name="description" content="${escape(p.description)}">`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?\s*>/,
      `<link rel="canonical" href="${rootUrl}/projects/${p.slug}/">`,
    );
  page = page
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?\s*>/,
      `<meta property="og:title" content="${escape(p.title)} | ${escape(profile.name)}">`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?\s*>/,
      `<meta property="og:description" content="${escape(p.description)}">`,
    );
  page = page.replace(
    fallback,
    `<div style="padding:40px;font-family:system-ui;background:#080e18;color:#e6f0f7"><a style="color:#a4ddeb" href="/">Back to portfolio</a><h1>${escape(p.title)}</h1><p>${escape(p.description)}</p><h2>Capabilities</h2><ul>${p.features.map((f) => `<li>${escape(f)}</li>`).join("")}</ul><h2>Evidence and limitations</h2><p>${escape(p.evidence)}</p><noscript>Enable JavaScript to explore the interactive project workflow.</noscript></div>`,
  );
  await writeFile(dir + "/index.html", page);
}
await writeFile(
  "robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${rootUrl}/sitemap.xml\n`,
);
await writeFile(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", ...projects.map((p) => "/projects/" + p.slug + "/")].map((path) => `<url><loc>${rootUrl}${path}</loc></url>`).join("")}</urlset>`,
);
console.log(
  "Generated project detail pages, static SEO fallbacks, structured data, and sitemap.",
);
