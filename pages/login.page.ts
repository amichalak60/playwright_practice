import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessageBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessageBox = page.locator('[data-test="error"]');
  }
  async login(userId: string, userPassword: string): Promise<void> {
    await this.usernameField.fill(userId);
    await this.passwordField.fill(userPassword);
    await this.loginButton.click();
  }

  async loginWrongUserId(wrongUserId: string, userPassword: string): Promise<void> {
    await this.usernameField.fill(wrongUserId);
    await this.passwordField.fill(userPassword);
    await this.loginButton.click();
  }

  async loginNoPassword(userId: string): Promise<void> {
    await this.usernameField.fill(userId);
    await this.loginButton.click();
  }

  async loginWrongPassword(userId: string, wrongUserPassword: string): Promise<void> {
    await this.usernameField.fill(userId);
    await this.passwordField.fill(wrongUserPassword);
    await this.loginButton.click();
  }
}
