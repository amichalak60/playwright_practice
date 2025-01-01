import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
  // Arrange
  const userId = 'standard_user';
  const userPassword = 'secret_sauce';
  const wrongUserId = 'wronglogin';
  const wrongUserPassword = '23rfwfe';
  const incorrectLoginExpectedMessage =
    'Epic sadface: Username and password do not match any user in this service';
  const noPasswordExpectedMessage = 'Epic sadface: Password is required';
  const incorrectPasswordExpectedMessage =
    'Epic sadface: Username and password do not match any user in this service';

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

  test('Log-in with correct credentials is successful', async ({ page }) => {
    // Act
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
    await page.locator('[data-test="username"]').fill(wrongUserId);
    await page.locator('[data-test="password"]').fill(userPassword);
    await page.locator('[data-test="login-button"]').click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      incorrectLoginExpectedMessage,
    );
  });

  test('Log-in with no password returns expected error message', async ({
    page,
  }) => {
    // Act
    await page.locator('[data-test="username"]').fill(userId);
    await page.locator('[data-test="login-button"]').click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      noPasswordExpectedMessage,
    );
  });

  test('Log-in with incorrect password returns expected error message', async ({
    page,
  }) => {
    // Act
    await page.locator('[data-test="username"]').fill(userId);
    await page.locator('[data-test="password"]').fill(wrongUserPassword);
    await page.locator('[data-test="login-button"]').click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      incorrectPasswordExpectedMessage,
    );
  });
});
