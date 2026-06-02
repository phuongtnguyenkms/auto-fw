import { TestUsers } from "@env/test-users";
import { expect, test } from "@fixtures/ui.fixture";

test("sort works with cart items and equal-price order stays stable", async ({
    page,
    signInPage,
}) => {
    await signInPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);

    await expect(page).toHaveURL(/inventory\.html/);

    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    const backpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    const onesieButton = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');

    await backpackButton.click();
    await onesieButton.click();

    await expect(cartBadge).toHaveText("2");

    await sortDropdown.selectOption("hilo");

    const highToLowProducts = await page.locator(".inventory_item_name").allTextContents();
    const highToLowPrices = await page.locator(".inventory_item_price").allTextContents();

    expect(highToLowProducts).toEqual([
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Backpack",
        "Sauce Labs Bolt T-Shirt",
        "Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Bike Light",
        "Sauce Labs Onesie",
    ]);

    expect(highToLowPrices).toEqual(["$49.99", "$29.99", "$15.99", "$15.99", "$9.99", "$7.99"]);
    await expect(cartBadge).toHaveText("2");
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText("Remove");
    await expect(page.locator('[data-test="remove-sauce-labs-onesie"]')).toHaveText("Remove");
    await expect(page.locator('[data-test^="add-to-cart-"]')).toHaveCount(4);

    await sortDropdown.selectOption("lohi");

    const lowToHighProducts = await page.locator(".inventory_item_name").allTextContents();
    const lowToHighPrices = await page.locator(".inventory_item_price").allTextContents();

    expect(lowToHighProducts).toEqual([
        "Sauce Labs Onesie",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Test.allTheThings() T-Shirt (Red)",
        "Sauce Labs Backpack",
        "Sauce Labs Fleece Jacket",
    ]);

    expect(lowToHighPrices).toEqual(["$7.99", "$9.99", "$15.99", "$15.99", "$29.99", "$49.99"]);

    const lowToHighEqualPriceNames = lowToHighProducts.filter((name) =>
        ["Sauce Labs Bolt T-Shirt", "Test.allTheThings() T-Shirt (Red)"].includes(name),
    );

    expect(lowToHighEqualPriceNames).toEqual([
        "Sauce Labs Bolt T-Shirt",
        "Test.allTheThings() T-Shirt (Red)",
    ]);

    await sortDropdown.selectOption("hilo");

    const secondHighToLowProducts = await page.locator(".inventory_item_name").allTextContents();
    const secondHighToLowEqualPriceNames = secondHighToLowProducts.filter((name) =>
        ["Sauce Labs Bolt T-Shirt", "Test.allTheThings() T-Shirt (Red)"].includes(name),
    );

    expect(secondHighToLowEqualPriceNames).toEqual([
        "Sauce Labs Bolt T-Shirt",
        "Test.allTheThings() T-Shirt (Red)",
    ]);
});
