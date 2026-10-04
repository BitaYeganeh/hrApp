import { defineConfig, devices } from '@playwright/test';

const API_PORT = 3101;
const APP_PORT = 5179;

export default defineConfig({
  testDir: './e2e',
  // Tests share one local database, so run them in order
  workers: 1,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${APP_PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      // Locally reuse the installed Chrome; CI installs Playwright's Chromium
      use: { ...devices['Desktop Chrome'], channel: process.env.CI ? undefined : 'chrome' },
    },
  ],
  webServer: [
    {
      // Fresh copy of the test data on every run, so the live API is never touched
      command: `cp e2e/fixtures/db.json e2e/.db.json && npx json-server e2e/.db.json --port ${API_PORT}`,
      url: `http://localhost:${API_PORT}/employees`,
      reuseExistingServer: false,
    },
    {
      command: `npx vite --port ${APP_PORT} --strictPort`,
      url: `http://localhost:${APP_PORT}`,
      env: { VITE_API_URL: `http://localhost:${API_PORT}` },
      reuseExistingServer: false,
    },
  ],
});
