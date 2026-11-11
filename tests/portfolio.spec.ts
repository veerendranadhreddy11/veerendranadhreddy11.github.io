import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("home renders the real profile and WebGL or accessible topology", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Veerendranadh Reddy Tangirala." }),
  ).toBeVisible();
  await expect(
    page.locator(".hero-topology .node-controls button"),
  ).toHaveCount(6);
  await page.locator(".hero-topology").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  expect(
    await page
      .locator(".hero-topology canvas,.hero-topology .topology-stage>svg")
      .count(),
  ).toBeGreaterThan(0);
  await expect(page.locator(".hero-topology-foot")).toContainText("Synthetic");
  expect(errors).toEqual([]);
});
test("dashboard scenarios, nodes, chart metric, severity filter, pause, and reset work", async ({
  page,
}) => {
  await page.goto("/#command-center");
  const d = page.locator("#command-center");
  await expect(d.getByText("SIMULATED DATA", { exact: true })).toBeVisible();
  await d.getByRole("button", { name: "Login anomaly", exact: true }).click();
  await expect(
    d.getByRole("button", { name: "Login anomaly", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await d.getByRole("button", { name: "Identity", exact: true }).click();
  await expect(d.locator(".node-detail")).toContainText("Identity");
  await d.getByLabel("Traffic chart metric").selectOption("Volume (KB)");
  await expect(d.locator(".chart-caption")).toContainText("Volume (KB)");
  await d
    .getByLabel("Filter simulated events by severity")
    .selectOption("High");
  await expect(d.locator(".event-row")).toHaveCount(2);
  await expect(d.locator(".event-severity").first()).toHaveText("High");
  await d.getByRole("button", { name: "Play simulation", exact: true }).click();
  await expect(
    d.getByRole("button", { name: "Pause simulation", exact: true }),
  ).toBeVisible();
  await page.waitForTimeout(4200);
  await d
    .getByRole("button", { name: "Pause simulation", exact: true })
    .click();
  const frozen = await d.locator(".dashboard-actions>.small").textContent();
  await page.waitForTimeout(4200);
  expect(await d.locator(".dashboard-actions>.small").textContent()).toBe(
    frozen,
  );
  await d
    .getByRole("button", { name: "Reset simulation", exact: true })
    .click();
  await expect(
    d.getByRole("button", { name: "Baseline", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(d.getByLabel("Filter simulated events by severity")).toHaveValue(
    "All",
  );
});
test("all terminal commands are safe and history and clear work", async ({
  page,
}) => {
  await page.goto("/#terminal");
  const input = page.getByLabel("Portfolio terminal command");
  for (const command of [
    "help",
    "whoami",
    "about",
    "skills",
    "projects",
    "education",
    "github",
    "contact",
    "lab",
  ]) {
    await input.fill(command);
    await input.press("Enter");
    await expect(page.locator(".terminal-entry").last()).not.toContainText(
      "Unknown portfolio command",
    );
  }
  await input.press("ArrowUp");
  await expect(input).toHaveValue("lab");
  await input.fill('<img src=x onerror="window.__injected=1">');
  await input.press("Enter");
  expect(
    await page.evaluate(
      () => (window as unknown as { __injected?: number }).__injected,
    ),
  ).toBeUndefined();
  await expect(page.locator(".terminal-log img")).toHaveCount(0);
  for (const unknown of ["constructor", "__proto__", "not-a-command"]) {
    await input.fill(unknown);
    await input.press("Enter");
    await expect(page.locator(".terminal-entry").last()).toContainText(
      "Unknown portfolio command",
    );
  }
  await input.fill("clear");
  await input.press("Enter");
  await expect(page.locator(".terminal-entry")).toHaveCount(0);
});
test("project tabs and architecture steps work with keyboard and case study links", async ({
  page,
}) => {
  await page.goto("/#projects");
  await page.getByRole("tab", { name: "Workflow", exact: true }).click();
  await page.locator(".featured-project .workflow-nodes button").last().click();
  await expect(
    page.locator(".featured-project .workflow-description"),
  ).toContainText("PDF assessment");
  await page.getByRole("tab", { name: "Workflow", exact: true }).press("End");
  await expect(
    page.getByRole("tab", { name: "Validation", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("tabpanel", { name: "Validation", exact: true }),
  ).toContainText("25 / 25");
  await page.getByRole("link", { name: "Read the case study" }).click();
  await expect(page).toHaveURL(/projects\/pentestmate/);
  await expect(
    page.getByRole("heading", { name: "PentestMate", exact: true }),
  ).toBeVisible();
});
test("all project detail URLs load directly with accurate status and metadata", async ({
  page,
  request,
}) => {
  for (const [slug, title] of [
    ["pentestmate", "PentestMate"],
    ["cybersoc", "CyberSOC"],
    ["physician-agent", "AI-Driven General Physician Agent"],
    ["future-fit", "Future Fit College App"],
  ]) {
    const r = await request.get("/projects/" + slug + "/");
    expect(r.status()).toBe(200);
    expect(await r.text()).toContain("<title>" + title);
    await page.goto("/projects/" + slug + "/");
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp("/projects/" + slug + "/"),
    );
  }
  await page.goto("/projects/cybersoc/");
  await expect(page.locator(".detail-title")).toContainText("Initial scaffold");
  await expect(page.locator(".evidence-detail")).toContainText(
    "not a published CyberSOC product",
  );
});
test("project search and filters reflect real academic and repository states", async ({
  page,
}) => {
  await page.goto("/#projects");
  await page.getByRole("button", { name: "Academic", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Repositories", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("CyberSOC");
  await page.getByRole("button", { name: "All", exact: true }).first().click();
  await page.getByLabel("Search projects").fill("nonsense-project");
  await expect(page.locator(".empty-state")).toBeVisible();
  await page.getByLabel("Search projects").fill("physician");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("In development");
});
test("skill selection, timeline filters, and email copying work", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#skills");
  await page.getByRole("button", { name: "Code", exact: true }).click();
  await expect(page.locator(".skill-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Java Code", exact: true }).click();
  await expect(page.locator(".skill-context>h3")).toHaveText("Java");
  await page
    .locator("#journey")
    .getByRole("button", { name: "Experience", exact: true })
    .click();
  await expect(page.locator(".journey-item")).toHaveCount(1);
  await expect(page.locator(".journey-item")).toContainText(
    "Cybersecurity Intern",
  );
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "veerendranadhreddy11@gmail.com",
  );
});
test("CV downloads and media and captions are functional", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page
      .getByRole("link", { name: "Download CV", exact: true })
      .first()
      .click(),
  ]);
  expect(download.suggestedFilename()).toContain(".pdf");
  const cv = await request.get("/assets/veerendranadh-reddy-cv.pdf");
  expect(cv.headers()["content-type"]).toContain("pdf");
  const result = await page
    .locator(".featured-project video")
    .evaluate(async (v) => {
      const video = v as HTMLVideoElement;
      video.load();
      if (video.readyState < 1)
        await new Promise<void>((res, rej) => {
          video.addEventListener("loadedmetadata", () => res(), { once: true });
          video.addEventListener(
            "error",
            () => rej(Error("Media load error")),
            { once: true },
          );
        });
      video.muted = true;
      await video.play();
      await new Promise((r) => setTimeout(r, 600));
      video.pause();
      return {
        time: video.currentTime,
        duration: video.duration,
        tracks: video.textTracks.length,
      };
    });
  expect(result.time).toBeGreaterThan(0);
  expect(result.duration).toBeGreaterThan(180);
  expect(result.tracks).toBe(1);
});
test("mobile navigation and five viewport widths do not overflow", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(150);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Overflow at " + width,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await expect(page.locator("#main-nav")).toBeVisible();
  await page
    .locator("#main-nav")
    .getByRole("link", { name: "Skills", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Toggle navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Toggle navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});
test("accessible topology remains functional without WebGL", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      type: string,
      ...args: unknown[]
    ) {
      if (/webgl/.test(type)) return null;
      return (original as Function).call(this, type, ...args);
    } as typeof original;
  });
  await page.goto("/#command-center");
  const graph = page.locator("#command-center");
  await expect(graph.locator(".topology-stage>svg")).toBeVisible();
  await graph.getByRole("button", { name: "Analyst", exact: true }).click();
  await expect(graph.locator(".node-detail")).toContainText("Analyst");
});
test("home and detail page have no WCAG A or AA axe violations", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".hero-topology .node-controls").waitFor();
  const home = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    home.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.goto("/projects/pentestmate/");
  const detail = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    detail.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
test("static SEO, fonts, public snapshot and sitemap are available", async ({
  request,
}) => {
  const home = await request.get("/");
  const html = await home.text();
  expect(html).toContain("application/ld+json");
  expect(html).toContain("Veerendranadh Reddy Tangirala");
  for (const path of [
    "/sitemap.xml",
    "/robots.txt",
    "/fonts/dm-sans.woff2",
    "/fonts/space-grotesk.woff2",
    "/data/github.json",
  ])
    expect((await request.get(path)).status(), path).toBe(200);
});

test("architecture walkthrough advances only while playing", async ({
  page,
}) => {
  await page.goto("/projects/pentestmate/");
  const flow = page.locator(".workflow-widget");
  await flow
    .getByRole("button", { name: "Play walkthrough", exact: true })
    .click();
  await expect(flow.locator(".workflow-description .tag")).toHaveText(
    "STEP 2",
    { timeout: 5000 },
  );
  await flow
    .getByRole("button", { name: "Pause walkthrough", exact: true })
    .click();
  await page.waitForTimeout(2700);
  await expect(flow.locator(".workflow-description .tag")).toHaveText("STEP 2");
  await flow.locator(".workflow-nodes button").last().click();
  await expect(flow.locator(".workflow-description .tag")).toHaveText("STEP 5");
});

test("published pages retain useful content without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:8091");
  await expect(
    page.getByRole("heading", { name: "Veerendranadh Reddy Tangirala" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "PentestMate" })).toBeVisible();
  await page.getByRole("link", { name: "PentestMate" }).click();
  await expect(
    page.getByRole("heading", { name: "PentestMate", exact: true }),
  ).toBeVisible();
  await context.close();
});
