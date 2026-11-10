const { expect } = require('@playwright/test');

class Checkoutpage {
  constructor(page) {
    this.page = page;
    this.name = page.locator('#name');
    this.country = page.locator('#country');
    this.city = page.locator('#city');
    this.card = page.locator('#card');
    this.month = page.locator('#month');
    this.year = page.locator('#year');
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.confirmation = page.getByText('Thank you for your purchase!');
    this.okButton = page.getByRole('button', { name: 'OK' });
  }
  async fillCheckoutForm(name, country, city, card, month, year) {
    await this.name.fill(name);
    await this.country.fill(country);
    await this.city.fill(city);
    await this.card.fill(card);
    await this.month.fill(month);
    await this.year.fill(year);
  }
  async purchase() { await this.purchaseButton.click(); }
  async verifyPurchase() { await expect(this.confirmation).toBeVisible(); }
  async closeConfirmation() { await this.okButton.click(); }
}
module.exports = { Checkoutpage };