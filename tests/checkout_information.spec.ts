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

  test('Entering checkout information is successful', async ({ page }) => {
    //arrange
    const firstName = 'Adam';
    const lastName = 'Michalak';
    const postalCode = '111-234';

    //assert
    await expect(checkoutInformationPage.checkoutInformationPageTitle).toBeVisible();

    //act
    await checkoutInformationPage.populateCheckoutInformationAndContinueToOverview(firstName, lastName, postalCode);

    //assert
  });

  test('Return to cart is successful', async ({ page }) => {
    //assert
    await expect(checkoutInformationPage.checkoutInformationPageTitle).toBeVisible();

    //act
    await checkoutInformationPage.returnToCart();

    //assert
    expect(cartPage.cartTitle).toBeVisible();
  });
});
