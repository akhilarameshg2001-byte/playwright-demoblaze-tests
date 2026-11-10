// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  timeout: 90000,
  expect: { timeout: 16000 },
  reporter: 'html',

  use: {
    baseURL: 'https://demoblaze.com/',
    headless: true,
    actionTimeout: 13000,
    navigationTimeout: 20000,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    launchOptions: {
      slowMo: Number(process.env.SLOWMO) || 0,   // off unless you set SLOWMO
    },
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});