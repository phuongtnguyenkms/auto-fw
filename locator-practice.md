# Locator Practice

These selectors were verified against the SauceDemo inventory page after login:

- URL: `https://www.saucedemo.com/inventory.html`
- App: Swag Labs / SauceDemo

Note: some text-based matches are not possible with standard browser CSS alone. For those rows, the CSS example uses Playwright's extended CSS support such as `:has()` and `:has-text()`.

| Requirement | CSS | XPath |
| --- | --- | --- |
| Select the shopping cart link/icon | `.shopping_cart_link` | `//a[@data-test='shopping-cart-link']` |
| Select all "Add to cart" buttons | `button.btn_inventory` | `//button[normalize-space()='Add to cart']` |
| Select the sort dropdown | `select.product_sort_container` | `//select[@data-test='product-sort-container']` |
| Select all product images | `.inventory_item img` | `//div[contains(@class,'inventory_item')]//img` |
| Select items whose price contains `$15.99` | `.inventory_item:has(.inventory_item_price:has-text("$15.99"))` | `//div[contains(@class,'inventory_item')][.//div[contains(@class,'inventory_item_price')][contains(.,'$15.99')]]` |
| Select the "Add to cart" button for "Sauce Labs Backpack" | `button[data-test='add-to-cart-sauce-labs-backpack']` | `//button[@data-test='add-to-cart-sauce-labs-backpack']` |
| Select the "Remove" button after adding "Sauce Labs Onesie" to cart | `button[data-test='remove-sauce-labs-onesie']` | `//button[@data-test='remove-sauce-labs-onesie']` |
| Select all buttons with `data-test` starting with `add-to-cart` | `button[data-test^='add-to-cart']` | `//button[starts-with(@data-test,'add-to-cart')]` |
| Select all product names that do NOT contain "Sauce Labs" | `.inventory_item_name:not(:has-text("Sauce Labs"))` | `//div[contains(@class,'inventory_item_name')][not(contains(.,'Sauce Labs'))]` |
| Select a product's image by matching alt text partially | `img[alt*='Backpack']` | `//img[contains(@alt,'Backpack')]` |

## Extra Notes

- On the live page, the cart link has `data-test="shopping-cart-link"`.
- The sort dropdown has `data-test="product-sort-container"`.
- The "Remove" button for Sauce Labs Onesie becomes `data-test="remove-sauce-labs-onesie"` only after that item is added to the cart.
- The only product name on the page that does not contain `Sauce Labs` is `Test.allTheThings() T-Shirt (Red)`.
