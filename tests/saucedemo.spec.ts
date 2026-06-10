import { test, expect } from '@playwright/test';

test.describe("SauceDemo login tests", () => {    

  test.beforeEach(async ({ page }) => {                
    await page.goto("/");
  });

  // Task 1 — Login (happy path) 
  test("Verify user can log in with valid credentials", async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await expect(page, 'User should be redirected to inventory page after login').toHaveURL(/inventory/);
  });

  // Task 2 — Negative login
  test("Verify error is displayed with wrong password", async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("wrong_password");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error"), "Error should appear for wrong credentials").toBeVisible();
    await expect(page.getByTestId("error")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service");
  });

  // Task 2.1 — Negative login for locked user
  test('Locked out user should see error message', async ({ page }) => {
    await page.getByTestId("username").fill("locked_out_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error"), "Error should appear for locked out user").toBeVisible();
    await expect(page.getByTestId("error")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});

test.describe('SauceDemo authenticated user tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await expect(
      page,
      'User should be redirected to inventory page'
    ).toHaveURL(/inventory/);
  });

  // Task 3 — Add product to cart
  test('Verify cart badge shows 1 after adding product', async ({ page }) => {
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge"), "Cart badge should show 1 after adding a product").toHaveText("1");
  });

  // Task 4 — Remove product from cart
  test('Verify cart badge disappears after removing product', async ({ page }) => {
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await page.getByTestId("remove-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge"), "Cart badge should not be visible after removing product").not.toBeVisible();
  });
});


test.describe('Empty fields validation', () => {

  test.beforeEach(async ({ page }) => {               
    await page.goto("/");
  });

  // Task 5 — Empty form validation
  test('Verify validation error is displayed for empty login form', async ({ page }) => {
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error"), "Validation error should be displayed for empty login form").toBeVisible();
    await expect(page.getByTestId("error")).toHaveText("Epic sadface: Username is required");
  });


  // Task 5.1 — Empty form validation - Empty username
  test('Verify validation error is displayed when username is missing', async ({ page }) => {
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error"), "Validation error should be displayed when username is missing").toBeVisible();
    await expect(page.getByTestId("error")).toHaveText("Epic sadface: Username is required");
  });


  // Task 5.2 — Empty form validation - Empty password
  test('Verify validation error is displayed when password is missing', async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error"), "Validation error should be displayed when password is missing").toBeVisible();
    await expect(page.getByTestId("error")).toHaveText("Epic sadface: Password is required");
  });
});


test.describe("Bonus challenges (for advanced learners)", () => {           

  test.beforeEach(async ({ page }) => {              
    await page.goto("/");
  });

  // Task "Bonus challenges (for advanced learners)" - Multiple products
  test('Verify cart badge updates after adding 3 products and removing 1', async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await page.getByTestId("add-to-cart-sauce-labs-bike-light").click();
    await page.getByTestId("add-to-cart-test.allthethings()-t-shirt-(red)").click();
    await expect(page.locator(".shopping_cart_badge"), "Cart badge should show 3 after adding a product").toHaveText("3");
    await page.getByTestId("remove-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge"), "Cart badge should show 2 after removing a product").toHaveText("2");
  });

  // Task "Bonus challenges (for advanced learners)" - Sorting
  test('Verify first product changes after sorting products by price low to high', async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    const firstProductBeforeSorting = await page
      .locator(".inventory_item_name")
      .nth(0)
      .textContent();
    await page.locator('[data-test="product-sort-container"]').selectOption("lohi");
    const firstProductAfterSorting = await page
      .locator(".inventory_item_name")
      .nth(0)
      .textContent();
    expect(firstProductAfterSorting).not.toBe(firstProductBeforeSorting);
  });

  // Task "Bonus challenges (for advanced learners)" - State after refresh
  test('Verify cart keeps product after page refresh', async ({ page }) => {
    await page.getByTestId("username").fill("standard_user");
    await page.getByTestId("password").fill("secret_sauce");
    await page.getByTestId("login-button").click();
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge"), "Cart badge should show 1 after adding a product").toHaveText("1");
    await page.reload();
    await expect(page.locator(".shopping_cart_badge"), "Cart badge should still show 1 after page refresh").toHaveText("1");
  });
});


test.describe("Visual tests", () => { 

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

// Task — Find a bug 
  test('Verify Add to cart buttons are aligned inside product cards on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.getByTestId('username').fill('visual_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    const cards = page.locator('.inventory_item');
    const count = await cards.count();

    const firstCardBox = await cards.nth(0).boundingBox();
    const firstButtonBox = await cards.nth(0).locator('button').boundingBox();

    expect(firstCardBox).not.toBeNull();
    expect(firstButtonBox).not.toBeNull();

    const referenceButtonXInsideCard = firstButtonBox!.x - firstCardBox!.x;

    for (let i = 1; i < count; i++) {
      const cardBox = await cards.nth(i).boundingBox();
      const buttonBox = await cards.nth(i).locator('button').boundingBox();

      expect(cardBox).not.toBeNull();
      expect(buttonBox).not.toBeNull();

      const currentButtonXInsideCard = buttonBox!.x - cardBox!.x;

      expect(currentButtonXInsideCard).toBe(referenceButtonXInsideCard); // Will fail if button is not aligned at the same X position inside the card as the first one - > bug found!
    }
  });
});