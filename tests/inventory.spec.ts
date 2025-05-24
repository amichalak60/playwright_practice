import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures.ts';

test.describe('Inventory page tests', () => {
  test.beforeEach(async ({ page }) => {
    //arrange
    await page.goto('/inventory.html');
  });

  test('Adding items to cart is successful', async ({ inventoryPage }) => {
    //assert
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
    //act
    await inventoryPage.addSixItemsToCart();

    //assert
    await expect(inventoryPage.shoppingCartBadge).toHaveText('6');
  });

  test('Removing items from cart is successful', async ({ inventoryPage }) => {
    //assert
    await expect(inventoryPage.shoppingCartLink).toBeVisible();

    //act
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.removeOnesieItem.click();

    //assert
    await expect(inventoryPage.shoppingCartBadge).toHaveText('5');
  });

  test('Sorting items is successful', async ({ inventoryPage }) => {
    //assert
    await expect(inventoryPage.shoppingCartLink).toBeVisible();

    //act
    await inventoryPage.productSortDropDown.selectOption('za');

    let firstProduct = inventoryPage.inventoryItemName.first();

    //assert - checking that the first product in the list is the one we expect according to sorting
    await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');

    //act
    await inventoryPage.productSortDropDown.selectOption('lohi');

    firstProduct = inventoryPage.inventoryItemName.first();

    //assert - checking that the first product in the list is the one we expect according to sorting
    await expect(firstProduct).toHaveText('Sauce Labs Onesie');

    //act
    await inventoryPage.productSortDropDown.selectOption('hilo');
    firstProduct = inventoryPage.inventoryItemName.first();

    //assert - checking that the first product in the list is the one we expect according to sorting
    await expect(firstProduct).toHaveText('Sauce Labs Fleece Jacket');
  });
});
