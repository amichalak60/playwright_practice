import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures.ts';
import { faker } from '@faker-js/faker';

test.describe('Checkout complete page tests', () => {
  test.beforeEach(async ({ page, inventoryPage, checkoutInformationPage, cartPage, checkoutOverviewPage }) => {
    //arrange

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    //act
    await page.goto('/inventory.html');
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
    await cartPage.continueToCheckoutInformation();
    await expect(checkoutInformationPage.checkoutInformationPageTitle).toBeVisible();
    await checkoutInformationPage.populateCheckoutInformationAndContinueToOverview(firstName, lastName, postalCode);
    await checkoutOverviewPage.finishButton.click();
  });

  test('Checkout has been completed successfully', async ({ checkoutCompletePage }) => {
    await checkoutCompletePage.orderConfirmationTextIsVisible();
  });

  test('Going back to homepage is working', async ({ checkoutCompletePage }) => {
    await checkoutCompletePage.backHomeButtonIsWorkingAsExpected();
  });
});
