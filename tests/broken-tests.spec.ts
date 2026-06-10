import { test, expect } from "@playwright/test";


test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});
// Test #1
// Root cause: The locator used the placeholder "User Name", but the actual placeholder is "Username".
// Fix: Changed getByPlaceholder("User Name") to getByPlaceholder("Username").
// How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium and confirmed the test passes.


test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByTestId("error")).toHaveText("Epic sadface: Username and password do not match any user in this service");
});
// Test #2
// Root cause: The expected error text did not match the actual error message displayed by the app.
// Fix: Updated the expected text to "Epic sadface: Username and password do not match any user in this service".
// How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium and confirmed the test passes.


test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
}); 
// Test #3
// Root cause: The click action on the Add to cart button was missing await.
// Fix: Added await before page.locator(...).click().
// How I verified: Ran npx playwright test tests/broken-tests.spec.ts --project=chromium and confirmed the test passes.