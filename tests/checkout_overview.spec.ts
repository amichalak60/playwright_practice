import { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformationPage } from '../pages/checkout_information.page';
import { test } from '../fixtures/login.fixture';

test.describe('Checkout information page tests', () => {
  // arrange - most commonly used variables
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutInformationPage: CheckoutInformationPage;
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    //arrange
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInformationPage = new CheckoutInformationPage(page);
    //act
    await loginPage.login(userId, userPassword);
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
    await cartPage.continueToCheckoutInformation();
  });

  test('The right amount of products is visible', async ({ page }) => {
    // TO BE CONTINUED
  });

  test('Payment and shipping information is visible', async ({ page }) => {});
  // TO BE CONTINUED
  test('Price Total information is correct', async ({ page }) => {});
  // TO BE CONTINUED
  test('Going back to Checkout Information is successful', async ({ page }) => {});
  // TO BE CONTINUED
});
