// Import necessary Playwright test functions and custom modules
const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../support/page-objects/loginPage.js"); // Page Object Model for login functionality
const loginData = require("../fixtures/test-data/login-data.js"); // Test data for login scenarios

let loginPage;

// Grouping all login-related test cases
test.describe("User Authentication: Login Scenarios", () => {
  // Setup before each test - instantiate the LoginPage object
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  // Positive Test: Successful login with valid credentials
  test("Verify that a user can log in successfully using a valid email and password", async ({ page }) => {
    await test.step("GIVEN I am on the login page", async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step("WHEN I enter valid credentials and click login", async () => {
      await loginPage.login(loginData.validUser.email, loginData.validUser.password);
      await loginPage.clickOnloginButton();
    });

    await test.step("THEN I should be redirected to the dashboard", async () => {
      await expect(loginPage.logoutLink).toBeVisible(); // Validate user is logged in
      await expect(page).toHaveURL(loginData.verifyUrl(page).expectedUrl); // Check correct redirection
    });
  });

  // Negative Test: Incorrect credentials
  test("Verify that the error message is shown when incorrect login credentials are entered", async ({ page }) => {
    await test.step("GIVEN I am on the login page", async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step("WHEN I enter invalid credentials and click login", async () => {
      await loginPage.login(loginData.invalidUser.email, loginData.invalidUser.password);
      await loginPage.clickOnloginButton();
    });

    await test.step("THEN I should see an error message", async () => {
      await expect(loginPage.errorMessage).toContainText(loginData.errorMessage.invalidEmail); // Assert error message
      await expect(page).toHaveURL(loginData.verifyUrl(page).expectedUrl); // Should remain on the same page
    });
  });

  // Negative Test: Empty email field
  test("Verify that the system shows a validation message when the email field is left blank", async ({ page }) => {
    await test.step("GIVEN I am on the login page", async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step("WHEN I leave the email field empty and click login", async () => {
      await loginPage.login(loginData.emptyEmail.email, loginData.emptyEmail.password);
      await loginPage.clickOnloginButton();
    });

    await test.step("THEN I should see an email required error", async () => {
      await expect(loginPage.errorMessage).toContainText(loginData.errorMessage.emptyEmail); // Assert validation message
      await expect(page).toHaveURL(loginData.verifyUrl(page).expectedUrl);
    });
  });

  // Negative Test: Empty password field
  test("Verify that the system shows a validation message when the password field is left blank", async ({ page }) => {
    await test.step("GIVEN I am on the login page", async () => {
      await loginPage.gotoLoginPage();
    });

    await test.step("WHEN I leave the password field empty and click login", async () => {
      await loginPage.login(loginData.emptyPassword.email, loginData.emptyPassword.password);
      await loginPage.clickOnloginButton();
    });

    await test.step("THEN I should see a password required error", async () => {
      await expect(loginPage.errorMessage).toContainText(loginData.errorMessage.emptyPassword); // Assert validation message
      await expect(page).toHaveURL(loginData.verifyUrl(page).expectedUrl);
    });
  });
});
