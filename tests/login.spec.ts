import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Login tests', () => {
  // Arrange - most commonly used constants
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Log-in with correct credentials is successful', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill(userId);
    await loginPage.passwordField.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(loginPage.shoppingCart).toBeVisible();
  });

  test('Log-in with incorrect login returns expected error message', async ({
    page,
  }) => {
    // Arrange
    const wrongUserId = 'wronglogin';
    const incorrectLoginExpectedMessage =
      'Epic sadface: Username and password do not match any user in this service';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill(wrongUserId);
    await loginPage.passwordField.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      incorrectLoginExpectedMessage,
    );
  });

  test('Log-in with no password returns expected error message', async ({
    page,
  }) => {
    //Arrange
    const noPasswordExpectedMessage = 'Epic sadface: Password is required';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill(userId);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      noPasswordExpectedMessage,
    );
  });

  test('Log-in with incorrect password returns expected error message', async ({
    page,
  }) => {
    // Arrange
    const wrongUserPassword = '23rfwfe';
    const incorrectPasswordExpectedMessage =
      'Epic sadface: Username and password do not match any user in this service';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill(userId);
    await loginPage.passwordField.fill(wrongUserPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      incorrectPasswordExpectedMessage,
    );
  });
});
