import { TestUsers } from "@env/test-users";
import { expect, test } from "@fixtures/ui.fixture";

test("default sort state after login", async ({ page, signInPage }) => {
    await signInPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);

    await expect(page).toHaveURL(/inventory\.html/);

    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await expect(sortDropdown).toBeVisible();
    await expect(sortDropdown).toHaveValue("az");
    await expect(sortDropdown.locator("option:checked")).toHaveText("Name (A to Z)");

    const productNames = await page.locator(".inventory_item_name").allTextContents();

    expect(productNames).toEqual([
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie",
        "Test.allTheThings() T-Shirt (Red)",
    ]);
});
