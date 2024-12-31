import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
  // Arrange
  const url = 'https://www.saucedemo.com/';
  const userId = 'standard_user';
  const userPassword = 'secret_sauce';
  const wrongUserId = 'wronglogin';
  const wrongUserPassword = '23rfwfe';
  
  test('Log-in with correct credentials is successful', async ({ page }) => {
    // Act
    await page.goto(url);
    await page.locator('[data-test="username"]').fill(userId);
    await page.locator('[data-test="password"]').fill(userPassword);
    await page.locator('[data-test="login-button"]').click();

    // Assert
    await expect(
      page.locator('[data-test="shopping-cart-link"]'),
    ).toBeVisible();
  });

  test('Log-in with incorrect login returns expected error message', async ({
    page,
  }) => {
    // Act
    await page.goto(url);
    await page.locator('[data-test="username"]').fill(wrongUserId);
    await page.locator('[data-test="login-button"]').click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('Log-in with incorrect password returns expected error message', async ({
    page,
  }) => {
    // Act
    await page.goto(url);
    await page.locator('[data-test="username"]').fill(userId);
    await page.locator('[data-test="password"]').fill(wrongUserPassword);
    await page.locator('[data-test="login-button"]').click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
