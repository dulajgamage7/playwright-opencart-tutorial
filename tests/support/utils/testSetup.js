const fs = require("fs");
const { expect } = require("@playwright/test");
let webContext;
let page;

async function beforeAllSetup({ browser, baseURL }) {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  page = await context.newPage();

  // Perform login
  await page.goto(`${baseURL}/my-account/`, { waitUntil: "networkidle" });
  await page
    .getByRole("textbox", {
      name: /username or email/i,
    })
    .fill("demouser1@gmail.com");
  await page.getByRole("textbox", { name: /password/i }).fill("User@1234");
  await page.locator('button[name="login"]').click();

  // Wait for navigation to dashboard
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(`${baseURL}/my-account/`);

  // Capture cookies
  const cookies = await context.cookies();

  // Capture localStorage
  const localStorage = await page.evaluate(() => {
    const storage = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      storage[key] = localStorage.getItem(key);
    }
    return storage;
  });

  // Save combined state
  const storageState = { cookies, localStorage };
  fs.writeFileSync("state.json", JSON.stringify(storageState, null, 2));

  webContext = await browser.newContext({ storageState: "state.json" });
}

async function beforeEachSetup({ browser, baseURL }) {
  const state = JSON.parse(fs.readFileSync("state.json", "utf8"));
  webContext = await browser.newContext();
  page = await webContext.newPage();

  // Navigate to the base domain
  await page.goto(`${baseURL}/`);

  // Set cookies and localStorage
  if (state.cookies) {
    await webContext.addCookies(state.cookies);
  }
  if (state.localStorage) {
    await page.evaluate((localStorageData) => {
      for (const [key, value] of Object.entries(localStorageData)) {
        localStorage.setItem(key, value);
      }
    }, state.localStorage);
  }

  // Reload the page
  await page.reload();

  // Debug session state
  const cookies = await webContext.cookies();
  console.log("Cookies:", cookies);
  console.log("URL after reload:", page.url());

  return page; // Ensure that the page is returned
}

module.exports = { beforeAllSetup, beforeEachSetup };
