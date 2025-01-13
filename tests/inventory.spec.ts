import { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { test } from '../fixtures/login.fixture';

test.describe('Inventory page tests', () => {
  // arrange - most commonly used variables
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    //arrange
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    //act
    await page.goto('/');
    await loginPage.login(userId, userPassword);
  });

  test('Adding items to cart is successful', async ({ page }) => {
    //assert
    await expect(inventoryPage.shoppingCartLink).toBeVisible();

    //act
    await inventoryPage.addSixItemsToCart();

    //assert
    await expect(inventoryPage.shoppingCartBadge).toHaveText('6');
  });

  test('Removing items from cart is successful', async ({ page }) => {
    //assert
    await expect(inventoryPage.shoppingCartLink).toBeVisible();

    //act
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.removeOnesieItem.click();

    //assert
    await expect(inventoryPage.shoppingCartBadge).toHaveText('5');
  });

  test('Sorting items is successful', async ({ page }) => {
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
