const { page } = require("@playwright/test");
const { LoginPage } = require("../page-objects/loginPage.js");
const { AddToCartPage } = require("../page-objects/addToCartPage.js");

// This class manages and provides access to all page objects.
// It helps centralize page object creation and reuse them across tests.
class pageObjectManager {
  // Declare private fields for encapsulating page object instances
  #loginPage;
  #addToCartPage;

  // Constructor initializes all required page objects with the shared 'page' instance
  constructor(page) {
    this.page = page;
    this.#loginPage = new LoginPage(page);
    this.#addToCartPage = new AddToCartPage(page);
  }

  // Returns the LoginPage object
  loginPage() {
    return this.#loginPage;
  }

  // Returns the AddToCartPage object
  addToCartPage() {
    return this.#addToCartPage;
  }
}

module.exports = { pageObjectManager };
