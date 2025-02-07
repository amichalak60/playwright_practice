import { Page, Locator } from '@playwright/test';

export class CheckoutInformationPage {
  readonly page: Page;
  readonly checkoutInformationPageTitle: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;
  readonly continueToOverviewButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.checkoutInformationPageTitle = this.page.locator('[data-test="title"]');
    this.firstNameField = this.page.locator('[data-test="firstName"]');
    this.lastNameField = this.page.locator('[data-test="lastName"]');
    this.postalCodeField = this.page.locator('[data-test="postalCode"]');
    this.continueToOverviewButton = this.page.locator('[data-test="continue"]');
    this.cancelButton = this.page.locator('[data-test="cancel"]');
  }
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
