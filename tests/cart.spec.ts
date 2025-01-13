import { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { test } from '../fixtures/login.fixture';

test.describe('Cart page tests', () => {
  // arrange - most commonly used variables
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    //arrange
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    //act
    await loginPage.login(userId, userPassword);
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
  });

  test('Removing items from cart is successful', async ({ page }) => {
    //assert
    await expect(cartPage.cartTitle).toBeVisible();

    //act
    cartPage.removeTwoItemsFromCart();
  });

  test('Return to shopping is successful', async ({ page }) => {
    //act
    await cartPage.returnToShopping();

    //assert
    await expect(inventoryPage.productsPageTitle).toBeVisible();
  });
});
