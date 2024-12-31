import { test, expect } from "@playwright/test";

test.describe("Login tests", () => {
  test("Log-in with correct credentials is successful", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  });

  test("Log-in with incorrect login returns expected error message", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("wronglogin");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test("Log-in with incorrect password returns expected error message", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("23rfwfe");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
