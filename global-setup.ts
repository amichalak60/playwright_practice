import { expect, test as setup } from '@playwright/test';

setup('Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page.context().storageState({ path: './LoginAuth.json' });
});
