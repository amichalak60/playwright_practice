import { test } from '../fixtures/fixtures.ts';
import { loginData } from '../test-data/login.data';
import { expect } from '@playwright/test';

test.describe('Checkout information page tests', () => {
  // arrange - most commonly used variables
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page, inventoryPage, cartPage }) => {
    //arrange
    //act
    await page.goto('/inventory.html');
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
    await cartPage.continueToCheckoutInformation();
  });

  test('Entering checkout information is successful', async ({ checkoutInformationPage }) => {
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

  test('Return to cart is successful', async ({ checkoutInformationPage, cartPage }) => {
    //assert
    await expect(checkoutInformationPage.checkoutInformationPageTitle).toBeVisible();

    //act
    await checkoutInformationPage.returnToCart();

    //assert
    expect(cartPage.cartTitle).toBeVisible();
  });
});
