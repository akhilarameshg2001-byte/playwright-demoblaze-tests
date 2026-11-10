const { expect } = require('@playwright/test');

class Productpage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    this.productName = page.locator('h2.name');
  }
  async addToCart() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  }
  async verifyProduct(name) {
    await expect(this.productName).toContainText(name);
  }
}
module.exports = { Productpage };