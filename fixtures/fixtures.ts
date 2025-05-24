import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckoutOverviewPage } from '../pages/checkout_overview.page';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutInformationPage } from '../pages/checkout_information.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutCompletePage } from '../pages/checkout_complete.page';

type MyFixtures = {
  loginPage: LoginPage;
  cartPage: CartPage;
  inventoryPage: InventoryPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
});
