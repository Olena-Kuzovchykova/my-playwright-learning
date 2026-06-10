// Import Playwright test tools from the Playwright library
// test is used to create test cases
// expect is used to check the expected result
import { test, expect } from '@playwright/test';

// Test case with the name "has title"
// async means this test contains actions that need time to complete
// { page } gives us a browser page that Playwright can control
test('has title', async ({ page }) => { 

  // Open the Playwright website in the browser 
  // await means Playwright waits until the page is opened before moving to the next step
  await page.goto('https://playwright.dev/');   

  // Check that page title contains the word "Playwright" 
  // expect(page) means we are checking the current page
  // toHaveTitle(/Playwright/) means the title should match the word Playwright
  await expect(page).toHaveTitle(/Playwright/);
});

// Another test case with the name "get started link"
test('get started link', async ({ page }) => {

// Open the Playwright website in the browser
  await page.goto('https://playwright.dev/');

  // Find a link with the name "Get started" and click it
  // getByRole('link') searches for a link element
  // { name: 'Get started' } tells Playwright which link to find
  await page.getByRole('link', { name: 'Get started' }).click();

  // Check that the page shows a heading with the name "Installation"
  // getByRole('heading') searches for a heading element
  // toBeVisible() checks that this heading is visible on the page
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
