import { Page, expect, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly checkoutCompletePageTitle: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = this.page.locator('[data-test="complete-header"]');
    this.completeText = this.page.locator('[data-test="complete-text"]');
    this.checkoutCompletePageTitle = this.page.locator('[data-test="title"]');
    this.backToProductsButton = this.page.locator('[data-test="back-to-products"]');
  }
  async orderConfirmationTextIsVisible(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    );
  }

  async backHomeButtonIsWorkingAsExpected(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
