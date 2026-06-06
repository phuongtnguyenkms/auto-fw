import { Page } from "@playwright/test";
import { AbstractPage } from "@pages/abstract.page";

/**
 * Page object for the inventory (products) listing page.
 * It exposes element getters and small helper methods so tests remain
 * readable and high-level (the test asserts behaviour, not DOM details).
 */
export class InventoryPage extends AbstractPage {
    // Reusable locators grouped under `elements` to keep selectors in one place.
    elements = {
        sortDropdown: () => this.page.locator('[data-test="product-sort-container"]'),
        productNames: () => this.page.locator('.inventory_item_name'),
        productPrices: () => this.page.locator('.inventory_item_price'),
        cartBadge: () => this.page.locator('[data-test="shopping-cart-badge"]'),
        addToCart: (id: string) => this.page.locator(`[data-test="add-to-cart-${id}"]`),
        removeFromCart: (id: string) => this.page.locator(`[data-test="remove-${id}"]`),
        menuButton: () => this.page.getByRole('button', { name: 'Open Menu' }),
        logoutLink: () => this.page.getByRole('link', { name: 'Logout' }),
    };

    /** Return visible product names in page order. */
    async getProductNames(): Promise<string[]> {
        return this.elements.productNames().allTextContents();
    }

    /** Return visible product prices in page order. */
    async getProductPrices(): Promise<string[]> {
        return this.elements.productPrices().allTextContents();
    }

    /** Select a sort option by value (e.g. 'az', 'za', 'hilo', 'lohi'). */
    async selectSort(option: string): Promise<void> {
        await this.elements.sortDropdown().selectOption(option);
    }

    /** Read the current value of the sort dropdown. */
    async getSortValue(): Promise<string> {
        return this.elements.sortDropdown().evaluate((el: HTMLSelectElement) => el.value);
    }

    /** Click the add-to-cart button for a product id (dashed-id used in data-test). */
    async addToCart(id: string): Promise<void> {
        await this.elements.addToCart(id).click();
    }

    /** Click the remove button for a product id. */
    async removeFromCart(id: string): Promise<void> {
        await this.elements.removeFromCart(id).click();
    }

    /** Return the cart badge text (number of items). */
    async getCartBadgeText(): Promise<string> {
        return this.elements.cartBadge().innerText();
    }

    /** Open the side menu and click logout. Useful for re-login flows in tests. */
    async openMenuAndLogout(): Promise<void> {
        await this.elements.menuButton().click();
        await this.elements.logoutLink().click();
    }
}
