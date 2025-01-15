import { expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformationPage } from '../pages/checkout_information.page';
import { CheckoutOverviewPage } from '../pages/checkout_overview.page';
import { test } from '../fixtures/login.fixture';

test.describe('Checkout information page tests', () => {
  // arrange - most commonly used variables
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutInformationPage: CheckoutInformationPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    //arrange
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInformationPage = new CheckoutInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    const firstName = 'Adam';
    const lastName = 'Michalak';
    const postalCode = '111-234';
    //act
    await loginPage.login(userId, userPassword);
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
    await cartPage.continueToCheckoutInformation();

    //assert
    await expect(checkoutInformationPage.checkoutInformationPageTitle).toBeVisible();

    //act
    await checkoutInformationPage.populateCheckoutInformationAndContinueToOverview(firstName, lastName, postalCode);
  });

  test('The right amount of products and their respective descriptions and prices are visible', async ({ page }) => {
    await expect(checkoutOverviewPage.inventoryItemName).toHaveCount(6);
    await expect(checkoutOverviewPage.inventoryItemDescription).toHaveCount(6);
    await expect(checkoutOverviewPage.inventoryItemPrice).toHaveCount(6);
  });

  test('Payment and shipping information is visible', async ({ page }) => {});
  // TO BE CONTINUED
  test('Price Total information is correct', async ({ page }) => {});
  // TO BE CONTINUED
  test('Going back to Checkout Information is successful', async ({ page }) => {});
  // TO BE CONTINUED
});
