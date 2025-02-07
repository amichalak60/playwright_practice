import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInformationPage } from '../pages/checkout_information.page';
import { CheckoutOverviewPage } from '../pages/checkout_overview.page';
import { CheckoutCompletePage } from '../pages/checkout_complete.page';

test.describe('Checkout complete page tests', () => {
  // arrange - most commonly used variables
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutInformationPage: CheckoutInformationPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    //arrange
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutInformationPage = new CheckoutInformationPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    const firstName = 'Adam';
    const lastName = 'Michalak';
    const postalCode = '111-234';
    //act
    await page.goto('/inventory.html');
    await inventoryPage.addSixItemsToCart();
    await inventoryPage.accessCart();
    await cartPage.continueToCheckoutInformation();
    await expect(checkoutInformationPage.checkoutInformationPageTitle).toBeVisible();
    await checkoutInformationPage.populateCheckoutInformationAndContinueToOverview(firstName, lastName, postalCode);
    await checkoutOverviewPage.finishButton.click();
  });

  test('Checkout has been completed successfully', async ({ page }) => {
    await checkoutCompletePage.orderConfirmationTextIsVisible();
  });

  test('Going back to homepage is working', async ({ page }) => {
    await checkoutCompletePage.backHomeButtonIsWorkingAsExpected();
  });
});
