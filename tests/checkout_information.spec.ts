import { test } from '../fixtures/fixtures.ts';
import { loginData } from '../test-data/login.data';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

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
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();

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
