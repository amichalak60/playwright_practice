import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  constructor(private page: Page) {}

  checkoutOverviewPageTitle = this.page.locator('[data-test="title"]');
  inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
  inventoryItemDescription = this.page.locator('[data-test="inventory-item-desc"]');
  inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');
  paymentInfoLabel = this.page.locator('[data-test="payment-info-label"]');
  paymentInfoValue = this.page.locator('[data-test="payment-info-value"]');
  shippingInfoLabel = this.page.locator('[data-test="shipping-info-label"]');
  shippingInfoValue = this.page.locator('[data-test="shipping-info-value"]');
  subtotalLabel = this.page.locator('[data-test="subtotal-label"]');
  taxLabel = this.page.locator('[data-test="tax-label"]');
  totalLabel = this.page.locator('[data-test="total-label"]');

  async paymentAndShippingInfosAreVisibleAndDisplayValues(): Promise<void> {
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.paymentInfoValue).toBeDefined();
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.shippingInfoValue).toBeDefined();
  }

  async itemTotalIsCorrect(): Promise<void> {
    // First, getting all the individual product prices and storing them in an array
    const itemPrices = await this.inventoryItemPrice.allTextContents();

    // Creating a function to convert price strings to numbers
    // This removes the currency symbol and converts to a number
    const convertPriceToNumber = (priceString: string): number => {
      // Remove currency symbol and any spaces, then convert to number
      return Number(priceString.replace(/[^0-9.-]+/g, ''));
    };

    // Calculating the sum of all item prices
    const calculatedTotal = itemPrices.reduce((sum, price) => {
      return sum + convertPriceToNumber(price);
    }, 0);

    // Get the displayed subtotal
    const subtotalText = await this.subtotalLabel.textContent();
    const displayedSubtotal = convertPriceToNumber(subtotalText || '0');

    // Assert that the calculated total matches the displayed subtotal
    // Using toBeCloseTo to handle any potential floating-point precision issues
    expect(calculatedTotal).toBeCloseTo(displayedSubtotal, 2);
  }

  async taxAndItsValueIsVisible(): Promise<void> {
    expect(this.taxLabel).toBeVisible();
  }

  async totalPriceIsCorrect(): Promise<void> {
    // Extract the numeric values, removing the currency symbol and converting to a number
    const convertPriceToNumber = (priceString: string): number => {
      // Remove currency symbol and any spaces, then convert to number
      return Number(priceString.replace(/[^0-9.-]+/g, ''));
    };

    // Extract the numeric values
    const itemTotalText = (await this.subtotalLabel.textContent()) ?? '';
    const taxText = (await this.taxLabel.textContent()) ?? '';
    const totalText = (await this.totalLabel.textContent()) ?? '';

    // Convert to numbers using the familiar method
    const itemTotal = convertPriceToNumber(itemTotalText);
    const tax = convertPriceToNumber(taxText);
    const total = convertPriceToNumber(totalText);

    // Calculate the expected total
    const expectedTotal = itemTotal + tax;
    console.log(expectedTotal);

    // Assertion with a helpful error message
    expect(total).toBeCloseTo(expectedTotal, 2);
  }
}
