const { page } = require("@playwright/test");
const { LoginPage } = require("../page-objects/loginPage.js");
const { AddToCartPage } = require("../page-objects/addToCartPage.js");

class pageObjectManager {
  // Declare private fields
 
  #loginPage;
  #addToCartPage;

  constructor(page) {
    this.page = page;
    this.#loginPage = new LoginPage(page);
    this.#addToCartPage = new AddToCartPage(page);
  }

  loginPage() {
    return this.#loginPage;
  }

  addToCartPage() {
    return this.#addToCartPage;
  }
}
module.exports = { pageObjectManager };
