/**
 * Test: default sort state after login
 * Verifies the default sort dropdown value and product ordering immediately
 * after a successful sign-in. Uses POM `signInPage` and `inventoryPage`.
 */
import { TestUsers } from "@env/test-users";
import { expect, test } from "@fixtures/ui.fixture";

test("default sort state after login", async ({ page, signInPage, inventoryPage }) => {
    await signInPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);

    await expect(page).toHaveURL(/inventory\.html/);

    const sortDropdown = inventoryPage.elements.sortDropdown();
    await expect(sortDropdown).toBeVisible();
    await expect(sortDropdown).toHaveValue("az");
    await expect(sortDropdown.locator("option:checked")).toHaveText("Name (A to Z)");

    const productNames = await inventoryPage.getProductNames();

    expect(productNames).toEqual([
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie",
        "Test.allTheThings() T-Shirt (Red)",
    ]);
});
