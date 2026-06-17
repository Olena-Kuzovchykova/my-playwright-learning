import { type Locator, type Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.cartItems = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
    }

    cartItemByName(productName: string) {
        return this.cartItems.filter({ hasText: productName });
    }

    async removeProduct(productName: string) {
        await this.cartItemByName(productName)
            .getByRole('button', { name: 'Remove' })
            .click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}
