import { test as base } from "@playwright/test";
import { SignInPage } from "@pages/sign-in.page";
import { InventoryPage } from "@pages/inventory.page";

/**
 * Shared UI fixtures that expose Page Objects to tests.
 *
 * Exported `test` is an extension of Playwright's `test` that injects
 * `signInPage` and `inventoryPage` helpers so tests can use typed page
 * objects directly in test callbacks:
 *
 *   test('...', async ({ page, signInPage, inventoryPage }) => { ... })
 *
 * Add additional page objects here to make them available to all UI specs.
 */
type PageObjects = {
    signInPage: SignInPage;
    inventoryPage: InventoryPage;
};

export const test = base.extend<PageObjects>({
    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
});

export const expect = test.expect;
