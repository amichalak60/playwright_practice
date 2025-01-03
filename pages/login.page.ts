import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  usernameField = this.page.locator('[data-test="username"]');
  passwordField = this.page.locator('[data-test="password"]');
  loginButton = this.page.locator('[data-test="login-button"]');
  shoppingCart = this.page.locator('[data-test="shopping-cart-link"]');
}
