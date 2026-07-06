import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../test-data/users';

test.describe('Login functionality', () => {

    test('Standard user can log in and see inventory page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);

        await expect(page, 'User should be redirected to inventory page after successful login').toHaveURL(/inventory/);

        await expect(
            inventoryPage.pageTitle,
            'Products page title should be visible after login'
        ).toBeVisible();
    });

    test('Locked user cannot log in and sees correct error message', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(users.locked.username, users.locked.password);

        await expect(
            loginPage.errorMessage,
            'Locked user should see the correct error message'
        ).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('User sees error message when password is incorrect', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            users.invalidPassword.username,
            users.invalidPassword.password
        );

        await expect(
            loginPage.errorMessage,
            'User should see the correct error message for invalid password'
        ).toContainText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    test('User sees validation error when username is empty', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();
        await loginPage.login(
            users.emptyUsername.username,
            users.emptyUsername.password
        );

        await expect(
            loginPage.errorMessage,
            'User should see a validation error when username is empty'
        ).toContainText(
            'Epic sadface: Username is required'
        );
    });

});