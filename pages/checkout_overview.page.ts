import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  checkoutOverviewPageTitle = this.page.locator('[data-test="title"]');
  inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
  inventoryItemDescription = this.page.locator('[data-test="inventory-item-desc"]');
  inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');
}
