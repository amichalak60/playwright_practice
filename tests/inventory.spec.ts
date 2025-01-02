import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';

test.describe('Inventory page tests', () => {
  // Arrange - most commonly used constants
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Adding items to cart is successful', async ({ page }) => {
    //act

    await page.locator('[data-test="username"]').fill(userId);
    await page.locator('[data-test="password"]').fill(userPassword);
    await page.locator('[data-test="login-button"]').click();

    const productSelectors = [
      '[data-test="add-to-cart-sauce-labs-backpack"]',
      '[data-test="add-to-cart-sauce-labs-bike-light"]',
      '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
      '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
      '[data-test="add-to-cart-sauce-labs-onesie"]',
      '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]',
    ];

    // Loop through the product selectors and click each one
    for (const selector of productSelectors) {
      await page.locator(selector).click();
    }

    //assert
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      '6',
    );
  });

  test('Sorting items is successful', async ({ page }) => {
    //act
    await page.locator('[data-test="username"]').fill(userId);
    await page.locator('[data-test="password"]').fill(userPassword);
    await page.locator('[data-test="login-button"]').click();
    await page.getByText('Name (A to Z)Name (A to Z)').click();
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption('za');
    let firstProduct = page
      .locator('[data-test="inventory-item-name"]')
      .first();

    //assert - checking that the first product in the list is the one we expect according to sorting
    await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');

    //act
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption('lohi');

    firstProduct = page.locator('[data-test="inventory-item-name"]').first();
    //assert - checking that the first product in the list is the one we expect according to sorting
    await expect(firstProduct).toHaveText('Sauce Labs Onesie');

    //act
    await page
      .locator('[data-test="product-sort-container"]')
      .selectOption('hilo');
    firstProduct = page.locator('[data-test="inventory-item-name"]').first();

    //assert - checking that the first product in the list is the one we expect according to sorting
    await expect(firstProduct).toHaveText('Sauce Labs Fleece Jacket');
  });
});
