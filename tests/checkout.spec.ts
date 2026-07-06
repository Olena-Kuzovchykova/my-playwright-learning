import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users } from '../test-data/users';

test.describe('Checkout functionality', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
    });

    test('User can complete checkout successfully', async () => {
        await test.step('Add selected product to cart', async () => {
            await inventoryPage.addProductToCart('Sauce Labs Backpack');
            await inventoryPage.openCart();
        });

        await test.step('Start checkout', async () => {
            await cartPage.checkout();

            await expect(
                checkoutPage.pageTitle,
                'Checkout information page should be opened'
            ).toHaveText('Checkout: Your Information');
        });

        await test.step('Fill checkout information', async () => {
            await checkoutPage.fillCheckoutInformation('John', 'Smith', '12345');

            await expect(
                checkoutPage.pageTitle,
                'Checkout overview page should be opened after submitting information'
            ).toHaveText('Checkout: Overview');
        });

        await test.step('Verify selected product on overview page', async () => {
            await expect(
                cartPage.cartItemByName('Sauce Labs Backpack'),
                'Checkout overview should show the selected product'
            ).toBeVisible();
        });

        await test.step('Finish checkout and verify success message', async () => {
            await checkoutPage.finishCheckout();

            await expect(
                checkoutPage.successMessage,
                'Success message should be visible after completing checkout'
            ).toHaveText('Thank you for your order!');
        });
    });
});