import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  cartTitle = this.page.locator('[data-test="title"]');
  shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');
  item1RemovalButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
  item2RemovalButton = this.page.locator('[data-test="remove-sauce-labs-bike-light"]');
  continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');

  async removeTwoItemsFromCart(): Promise<void> {
    await this.item1RemovalButton.click();
    await expect(this.shoppingCartBadge).toHaveText('5');
    await this.item2RemovalButton.click();
    await expect(this.shoppingCartBadge).toHaveText('4');
  }

  async returnToShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
