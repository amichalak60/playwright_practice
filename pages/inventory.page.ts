import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly productsPageTitle: Locator;
  readonly productSortDropDown: Locator;
  readonly inventoryItemName: Locator;
  readonly removeOnesieItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.productsPageTitle = page.locator('[data-test="title"]');
    this.productSortDropDown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.removeOnesieItem = page.locator('[data-test="remove-sauce-labs-onesie"]');
  }
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

  async accessCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
