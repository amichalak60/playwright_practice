import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  checkoutOverviewPageTitle = this.page.locator('[data-test="title"]');
  inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
  inventoryItemDescription = this.page.locator('[data-test="inventory-item-desc"]');
  inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');
  paymentInfoLabel = this.page.locator('[data-test="payment-info-label"]');
  paymentInfoValue = this.page.locator('[data-test="payment-info-value"]');
  shippingInfoLabel = this.page.locator('[data-test="shipping-info-label"]');
  shippingInfoValue = this.page.locator('[data-test="shipping-info-value"]');

  async paymentAndShippingInfosAreVisibleAndDisplayValues(): Promise<void> {
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.paymentInfoValue).toBeDefined();
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.shippingInfoValue).toBeDefined();
  }
}
