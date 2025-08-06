const { test, expect } = require("@playwright/test");
const { AddToCartPage } = require("../support/page-objects/addToCartPage.js");
const { Helper } = require("../support/utils/helper.js");
const {
  beforeAllSetup,
  beforeEachSetup,
} = require("../support/utils/testSetup.js");
let page;
let addToCart;
let helper;

test.beforeAll(async ({ browser, baseURL }) => {
  await beforeAllSetup({ browser, baseURL });
  page = await beforeEachSetup({ browser, baseURL });
});

test.describe("Add to cart: Login Scenarios", () => {
  test.describe.configure({ mode: 'serial' });
  test.beforeEach(async () => {
    addToCart = new AddToCartPage(page);
    helper = new Helper(page);
  });

  test("Verify user can add items to cart and cart total is calculated correctly", async () => {
    await test.step("GIVEN I am on the My Account page", async () => {
      await addToCart.gotoMyAccount(); // Navigate to the My Account page using session state
    });

    await test.step("WHEN I add items to the cart", async () => {
      await addToCart.addItemsToCart();
    });

    await test.step("THEN I navigate to the cart to view the items", async () => {
      await addToCart.goToViewCart();
    });

      // Validate that the cart total matches the sum of item subtotal and shipping cost
  await test.step("AND I validate the cart total matches subtotal + shipping", async () => {
    const { calculatedSubtotal, shipping, displayedTotal } = await addToCart.getCartTotals();

    // Calculate expected total and compare with displayed total in the cart
    const expectedTotal = calculatedSubtotal + shipping;
    console.log(`Expected: $${expectedTotal}, Displayed: $${displayedTotal}`);
    expect(displayedTotal).toBe(expectedTotal); // Exact match expected
  });
});
  // Test case: Verify the checkout and logout functionality
  test("Verify whether the user is able to checkout successfully", async () => {
    test.setTimeout(120000); // Extend timeout for slower checkout processes

    // Navigate to the My Account page using session state
    await test.step("GIVEN I am on the My Account page", async () => {
      await addToCart.gotoMyAccount();
    });

    // Navigate to the cart to begin checkout
    await test.step("WHEN I navigate to the cart", async () => {
      await addToCart.goToCart();
    });

    // Perform the checkout by proceeding and placing the order
    await test.step("AND I complete the checkout process", async () => {
      await addToCart.proceedToCheckoutAndPlaceOrder();
      await helper.waitForNumberOfSeconds(40); // Wait for confirmation to appear
    });

    // Confirm the order, log out, and verify the login button is visible again
    await test.step("THEN I verify I can log out successfully", async () => {
      await addToCart.confirmCashOnDelivery(); // Confirm the payment method
      await addToCart.logout(); // Log out from account
      await expect(await addToCart.assertLoginButtonVisible()).toBeVisible(); // Validate logout
    });
  });
});