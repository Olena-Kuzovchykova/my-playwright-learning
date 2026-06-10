import { test, expect } from '@playwright/test';

test('validate locators on SauceDemo', async ({ page }) => {

  await page.goto('/');

  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await page.locator('[data-test="username"]').fill('standard_user');

  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);

  const products = page.locator('.inventory_item');
  const count = await products.count();
  console.log(`Number of products: ${count}`);
  await products.nth(1).click();
  
await products
  .filter({ hasText: 'Sauce Labs Backpack' })
  .getByText('Sauce Labs Backpack')
  .click();});

