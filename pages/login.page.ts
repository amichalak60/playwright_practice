import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  usernameField = this.page.locator('[data-test="username"]');
  passwordField = this.page.locator('[data-test="password"]');
  loginButton = this.page.locator('[data-test="login-button"]');
  errorMessageBox = this.page.locator('[data-test="error"]');

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
