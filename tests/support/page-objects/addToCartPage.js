class AddToCartPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = page.context()._options.baseURL;

    // --- Locators ---
    // Link to open Katalon Shop
    this.katalonShopLink = page.getByRole("link", { name: "Katalon Shop" });

    // Button to add Ninja Silhouette to cart (used multiple times)
    this.ninjaSilhouetteAddLinks = page.getByRole("link", {name: "Add “Ninja Silhouette” to",
    });

    // Button to add Happy Ninja to cart
    this.happyNinjaAddButton = page.getByRole("listitem").filter({ hasText: "Add to cart Happy Ninja $35.00" }).getByLabel("Add “Happy Ninja” to your cart");

    // View cart and cart navigation links
    this.viewCartLink = page.getByRole("link", { name: "View cart" });
    this.cartLink = page.getByRole("link", { name: "Cart" });

    // Checkout buttons
    this.proceedToCheckoutLink = page.getByRole("link", {name: "Proceed to checkout",});
    this.placeOrderButton = page.getByRole("button", {name: "Place order",});

    // Order confirmation (Cash on Delivery)
    this.cashOnDeliveryConfirmation = page.getByRole("strong").filter({ hasText: "Cash on delivery" });

    // Account and logout elements
    this.myAccountLink = page.getByRole("link", { name: "My account" });
    this.logoutLink = page.locator("#post-10").getByRole("link", { name: "Log out" });

    // Login button for post-logout verification
    this.loginButton = page.getByRole("button", { name: "Log in" });
  }

  // Navigates to My Account page
  async gotoMyAccount() {
    await this.page.goto(`${this.baseUrl}/my-account/`);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Performs all add-to-cart actions
  async addItemsToCart() {
    await this.katalonShopLink.click();
    await this.ninjaSilhouetteAddLinks.click(); // Add Ninja Silhouette - 1st time
    await this.ninjaSilhouetteAddLinks.click(); // Add Ninja Silhouette - 2nd time
    await this.happyNinjaAddButton.click();     // Add Happy Ninja
  }

  // Navigates to View Cart page
  async goToViewCart() {
    await this.viewCartLink.first().click();
  }

  // Navigates to Cart via header/menu
  async goToCart() {
    await this.cartLink.first().click();
  }

  // Proceeds to checkout and places the order
  async proceedToCheckoutAndPlaceOrder() {
    await this.proceedToCheckoutLink.click();
    await this.placeOrderButton.click();
  }

  // Confirms "Cash on Delivery" payment method was selected
  async confirmCashOnDelivery() {
    await this.cashOnDeliveryConfirmation.click();
  }

  // Navigates to My Account and logs out
  async logout() {
    await this.myAccountLink.click();
    await this.logoutLink.click();
  }

  // Returns the login button element (useful for assertion after logout)
  async assertLoginButtonVisible() {
    return this.loginButton;
  }

  // Retrieves and calculates subtotal, shipping, and total
  async getCartTotals() {
    // Get all product subtotals
    const subtotalElements = await this.page
      .locator(".product-subtotal .amount")
      .all();

    let calculatedSubtotal = 0;
    for (const el of subtotalElements) {
      const text = await el.innerText(); // e.g., "$40.00"
      const amount = parseFloat(text.replace("$", ""));
      calculatedSubtotal += amount;
    }

    // Get shipping fee
    const shippingText = await this.page
      .locator(".shipping .amount")
      .innerText();
    const shipping = parseFloat(shippingText.replace("$", ""));

    // Get displayed cart total
    const displayedTotalText = await this.page
      .locator(".order-total .amount")
      .innerText();
    const displayedTotal = parseFloat(displayedTotalText.replace("$", ""));

    // Return all values
    return {
      calculatedSubtotal,
      shipping,
      displayedTotal,
    };
  }
}

module.exports = { AddToCartPage };
