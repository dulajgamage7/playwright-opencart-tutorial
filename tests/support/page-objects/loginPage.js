/* eslint-disable */

// Page Object Model for the Login Page
class LoginPage {

  constructor(page) {
    this.page = page;

    // Locator for the username/email input field (case-insensitive match)
    this.usernameInput = page.getByRole("textbox", {
      name: /username or email/i,
    });

    // Locator for the password input field
    this.passwordInput = page.getByRole("textbox", { name: /password/i });

    // Locator for the "Remember Me" checkbox
    this.rememberMeCheckbox = page.getByRole("checkbox", {
      name: /remember me/i,
    });

    // Locator for the login button
    this.loginButton = page.locator('button[name="login"]');

    // Locator for the logout button/link (used to verify successful login)
    this.logoutLink = page.locator('button[name="logout"]');

    // Locator for the error message container (shown on failed login)
    this.errorMessage = page.locator(".woocommerce-error");

    // Base URL retrieved from the Playwright context configuration
    this.baseUrl = page.context()._options.baseURL;
  }

  // Navigates to the login page
  async gotoLoginPage() {
    await this.page.goto(`${this.baseUrl}/my-account/`);
  }

  /**
   * Fills in the login form with provided email and password, and checks "Remember Me"
   * @param {string} email - User email/username
   * @param {string} password - User password
   */
  async login(email, password) {
    await this.usernameInput.fill(email);
    await this.passwordInput.fill(password);
    await this.rememberMeCheckbox.check(); // check "Remember Me"
  }

  // Clicks the login button to submit the form
  async clickOnloginButton() {
    await this.loginButton.click();
  }
}

// Exporting the LoginPage class for use in test files
module.exports = { LoginPage };
