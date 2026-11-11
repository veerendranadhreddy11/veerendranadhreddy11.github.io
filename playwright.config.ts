import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:8091",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
      args: [
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
    },
    trace: "retain-on-failure",
  },
  webServer: process.env.PORTFOLIO_TEST_URL
    ? undefined
    : {
        command: "python3 -m http.server 8091 --bind 127.0.0.1",
        url: "http://127.0.0.1:8091",
        reuseExistingServer: true,
      },
});
