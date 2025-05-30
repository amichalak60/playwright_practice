import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTitle: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly item1RemovalButton: Locator;
  readonly item2RemovalButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly continueToCheckoutInformationButton: Locator;
  constructor(page: Page) {
    this.cartTitle = page.locator('[data-test="title"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.item1RemovalButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.item2RemovalButton = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.continueToCheckoutInformationButton = page.locator('[data-test="checkout"]');
  }
  async removeTwoItemsFromCart(): Promise<void> {
    await this.item1RemovalButton.click();
    await expect(this.shoppingCartBadge).toHaveText('5');
    await this.item2RemovalButton.click();
    await expect(this.shoppingCartBadge).toHaveText('4');
  }

  async returnToShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async continueToCheckoutInformation(): Promise<void> {
    await this.continueToCheckoutInformationButton.click();
  }
}
