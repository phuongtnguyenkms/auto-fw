/**
 * Test: sort stability with equal-priced items
 * Validates the sort behaviour when there are items in the cart and when
 * multiple products share the same price (ordering should remain stable).
 */
import { TestUsers } from "@env/test-users";
import { expect, test } from "@fixtures/ui.fixture";

test("sort works with cart items and equal-price order stays stable", async ({
    page,
    signInPage,
    inventoryPage,
}) => {
    await signInPage.login(TestUsers.standardUser.username, TestUsers.standardUser.password);

    await expect(page).toHaveURL(/inventory\.html/);

    const sortDropdown = inventoryPage.elements.sortDropdown();
    const cartBadge = inventoryPage.elements.cartBadge();

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-onesie');

    await expect(cartBadge).toHaveText("2");

    await sortDropdown.selectOption("hilo");

    const highToLowProducts = await inventoryPage.getProductNames();
    const highToLowPrices = await inventoryPage.getProductPrices();

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
    await expect(inventoryPage.elements.removeFromCart('sauce-labs-backpack')).toHaveText("Remove");
    await expect(inventoryPage.elements.removeFromCart('sauce-labs-onesie')).toHaveText("Remove");
    await expect(page.locator('[data-test^="add-to-cart-"]')).toHaveCount(4);

    await sortDropdown.selectOption("lohi");

    const lowToHighProducts = await inventoryPage.getProductNames();
    const lowToHighPrices = await inventoryPage.getProductPrices();

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

    const secondHighToLowProducts = await inventoryPage.getProductNames();
    const secondHighToLowEqualPriceNames = secondHighToLowProducts.filter((name) =>
        ["Sauce Labs Bolt T-Shirt", "Test.allTheThings() T-Shirt (Red)"].includes(name),
    );

    expect(secondHighToLowEqualPriceNames).toEqual([
        "Sauce Labs Bolt T-Shirt",
        "Test.allTheThings() T-Shirt (Red)",
    ]);
});
