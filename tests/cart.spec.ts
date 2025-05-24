import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures.ts';

test.describe('Cart page tests', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    //arrange

    //act
    await page.goto('/inventory.html');
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
  });

  test('Removing items from cart is successful', async ({ cartPage }) => {
    //assert
    await expect(cartPage.cartTitle).toBeVisible();

    //act
    cartPage.removeTwoItemsFromCart();
  });

  test('Return to shopping is successful', async ({ inventoryPage, cartPage }) => {
    //act
    await cartPage.returnToShopping();

    //assert
    await expect(inventoryPage.productsPageTitle).toBeVisible();
  });
});
