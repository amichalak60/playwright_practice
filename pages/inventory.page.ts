import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  shoppingCart = this.page.locator('[data-test="shopping-cart-link"]');
  productSortDropDown = this.page.locator('[data-test="product-sort-container"]');
  inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
}
