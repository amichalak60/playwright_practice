import { expect, test as base } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

// keeping storageState undefined for login tests so that they're reliable
const test = base.extend({
  storageState: undefined,
});

test.describe('Login tests', () => {
  test.beforeEach(async ({ context, page }, testInfo) => {
    await page.goto('/');
  });
  // Arrange - most commonly used constants
  const userId = loginData.userId;
  const userPassword = loginData.userPassword;

  test('Log-in with correct credentials is successful', async ({ page }) => {
    // Act
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.login(userId, userPassword);

    // Assert
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
  });

  test('Log-in with incorrect login returns expected error message', async ({ page }) => {
    // Arrange
    const wrongUserId = 'wronglogin';
    const incorrectLoginExpectedMessage = 'Epic sadface: Username and password do not match any user in this service';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginWrongUserId(wrongUserId, userPassword);

    // Assert
    await expect(loginPage.errorMessageBox).toHaveText(incorrectLoginExpectedMessage);
  });

  test('Log-in with no password returns expected error message', async ({ page }) => {
    //Arrange
    const noPasswordExpectedMessage = 'Epic sadface: Password is required';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginNoPassword(userId);

    // Assert
    await expect(loginPage.errorMessageBox).toHaveText(noPasswordExpectedMessage);
  });

  test('Log-in with incorrect password returns expected error message', async ({ page }) => {
    // Arrange
    const wrongUserPassword = '23rfwfe';
    const incorrectPasswordExpectedMessage =
      'Epic sadface: Username and password do not match any user in this service';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginWrongPassword(userId, wrongUserPassword);

    // Assert
    await expect(loginPage.errorMessageBox).toHaveText(incorrectPasswordExpectedMessage);
  });
});
