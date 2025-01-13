import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  checkoutOverviewPageTitle = this.page.locator('[data-test="title"]');
}
