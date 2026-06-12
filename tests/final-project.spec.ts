import { test, expect } from '@playwright/test';

test.describe('Final Project - SauceDemo tests', () => {

    test('Valid user can log in and see inventory page', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
        await expect(page, 'User should be redirected to inventory page after successful login').toHaveURL(/inventory/);
        await expect(page.getByText('Products'), 'Products page title should be visible after login').toBeVisible();

    });

    test('Locked user cannot log in and sees correct error message', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('username').fill('locked_out_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
        await expect(
            page.getByTestId('error'),
            'Locked user error message should be displayed'
        ).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('User can add two products to cart and verify badge count', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();

        await expect(
            page.getByTestId('shopping-cart-badge'),
            'Cart badge should show 2 after adding two products'
        ).toHaveText('2');
    });

    test('User can remove one product and verify cart updates', async ({ page }) => {
        await page.goto('/');

        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();

        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await page.getByTestId('add-to-cart-sauce-labs-bike-light').click();

        await expect(
            page.getByTestId('shopping-cart-badge'),
            'Cart badge should show 2 after adding two products'
        ).toHaveText('2');

        await page.getByTestId('remove-sauce-labs-backpack').click();

        await expect(
            page.getByTestId('shopping-cart-badge'),
            'Cart badge should update to 1 after removing one product'
        ).toHaveText('1');
    });

    test('User can complete checkout and see success message', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('username').fill('standard_user');
        await page.getByTestId('password').fill('secret_sauce');
        await page.getByTestId('login-button').click();

        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await page.getByTestId('shopping-cart-link').click();
        await page.getByTestId('checkout').click();
        await page.getByTestId('firstName').fill('Olena');
        await page.getByTestId('lastName').fill('QA');
        await page.getByTestId('postalCode').fill('12345');
        await page.getByTestId('continue').click();
        await page.getByTestId('finish').click();
        await expect(
            page.getByText('Thank you for your order!'),
            'Checkout success message should be displayed'
        ).toBeVisible();
    });
});