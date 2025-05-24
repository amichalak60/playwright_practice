import { test as base } from '@playwright/test';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
      // This code runs before every test.
      await page.goto('/');
      await use();
      // This code runs after every test.
      console.log('Last URL:', page.url());
    },
    { auto: true },
  ], // automatically starts for every test.
});

export { expect } from '@playwright/test';
