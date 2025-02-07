import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly checkoutOverviewPageTitle: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDescription: Locator;
  readonly inventoryItemPrice: Locator;
  readonly paymentInfoLabel: Locator;
  readonly paymentInfoValue: Locator;
  readonly shippingInfoLabel: Locator;
  readonly shippingInfoValue: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewPageTitle = page.locator('[data-test="title"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
    this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }
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
