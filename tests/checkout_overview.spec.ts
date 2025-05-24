import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures.ts';
import { loginData } from '../test-data/login.data';
import { faker } from '@faker-js/faker';

test.describe('Checkout information page tests', () => {
  // arrange - most commonly used variables
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page, inventoryPage, checkoutInformationPage, cartPage }) => {
    //arrange
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    //act
    await page.goto('/inventory.html');
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
    await cartPage.continueToCheckoutInformation();

    //assert
    await expect(checkoutInformationPage.checkoutInformationPageTitle).toBeVisible();

    //act
    await checkoutInformationPage.populateCheckoutInformationAndContinueToOverview(firstName, lastName, postalCode);
  });

  test('The right amount of products, their respective descriptions and prices are visible', async ({
    checkoutOverviewPage,
  }) => {
    await expect(checkoutOverviewPage.inventoryItemName).toHaveCount(6);
    await expect(checkoutOverviewPage.inventoryItemDescription).toHaveCount(6);
    await expect(checkoutOverviewPage.inventoryItemPrice).toHaveCount(6);
  });

  test('Payment and shipping information is visible', async ({ checkoutOverviewPage }) => {
    await checkoutOverviewPage.paymentAndShippingInfosAreVisibleAndDisplayValues();
  });
  test('Price Total information is correct', async ({ checkoutOverviewPage }) => {
    await checkoutOverviewPage.totalPriceIsCorrect();
  });
  test('Going back to Checkout Information is successful', async ({ page }) => {});
  // TO BE CONTINUED
});
