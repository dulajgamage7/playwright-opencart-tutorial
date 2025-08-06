// @ts-check
import { defineConfig, devices } from "@playwright/test";
const path = require("path");
const resolvePath = (...segments) => path.resolve(__dirname, ...segments);

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "tests",

  testMatch: [
    "**/specs/*.js", // Regular test files
 
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  globalSetup: require.resolve(
    resolvePath("tests", "support", "utils", "report-clean.js")
  ),
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
    [
      "allure-playwright",
      {
        outputFolder: "allure-results",
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://cms.demo.katalon.com",
        ignoreHTTPSErrors: true,
        headless: true,
        viewport: { width: 1920, height: 1080 },
        trace: "on-first-retry",
        timeout: 3000,
      },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"],
      baseURL: "https://cms.demo.katalon.com",
      ignoreHTTPSErrors: true,
      headless: true,
      viewport: { width: 1920, height: 1080 },
      trace: "on-first-retry",
      timeout: 3000,
      },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"],
      baseURL: "https://cms.demo.katalon.com",
      ignoreHTTPSErrors: true,
      headless: true,
      viewport: { width: 1920, height: 1080 },
      trace: "on-first-retry",
      timeout: 3000,
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
