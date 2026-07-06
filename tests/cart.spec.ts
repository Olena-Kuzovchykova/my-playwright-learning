import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../test-data/users';

test.describe('Cart functionality', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);
    });

    test('Cart badge shows correct count after adding a product', async () => {

        await inventoryPage.addProductToCart('Sauce Labs Backpack');

        await expect(
            inventoryPage.cartBadge,
            'Cart badge should show 1 after adding one product'
        ).toHaveText('1');
    });

    test('Cart page shows selected product', async () => {

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();

        await expect(
            cartPage.cartItemByName('Sauce Labs Backpack'),
            'Cart should contain the selected product'
        ).toBeVisible();
    });

    test('Removing product from cart updates the cart', async () => {

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();
        await cartPage.removeProduct('Sauce Labs Backpack');

        await expect(
            cartPage.cartItemByName('Sauce Labs Backpack'),
            'Removed product should no longer be visible in the cart'
        ).toBeHidden();
    });

    test('Cart badge shows correct count after adding multiple products', async () => {

        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await expect(
            inventoryPage.cartBadge,
            'Cart badge should show 2 after adding two products'
        ).toHaveText('2');
    });

});