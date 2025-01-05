import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutInformationPage {
  constructor(private page: Page) {}

  checkoutInformationPageTitle = this.page.locator('[data-test="title"]');
  firstNameField = this.page.locator('[data-test="firstName"]');
  lastNameField = this.page.locator('[data-test="lastName"]');
  postalCodeField = this.page.locator('[data-test="postalCode"]');
  continueToOverviewButton = this.page.locator('[data-test="continue"]');
  cancelButton = this.page.locator('[data-test="cancel"]');

  async populateCheckoutInformationAndContinueToOverview(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
    await this.continueToOverviewButton.click();
  }

  async returnToCart(): Promise<void> {
    await this.cancelButton.click();
  }
}
