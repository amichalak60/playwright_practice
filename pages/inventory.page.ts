import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
  productsPageTitle = this.page.locator('[data-test="title"]');
  productSortDropDown = this.page.locator('[data-test="product-sort-container"]');
  inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
  removeOnesieItem = this.page.locator('[data-test="remove-sauce-labs-onesie"]');

  async addSixItemsToCart(): Promise<void> {
    const productSelectors = [
      '[data-test="add-to-cart-sauce-labs-backpack"]',
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
      '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
      '[data-test="add-to-cart-sauce-labs-onesie"]',
      '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]',
    ];

    // Loop through the product selectors and click each one
    for (const selector of productSelectors) {
      await this.page.locator(selector).click();
    }
  }
}
