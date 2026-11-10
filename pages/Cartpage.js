class Cartpage {
  constructor(page) {
    this.page = page;
    this.cartRows = page.locator('#tbodyid tr');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }
  async placeOrder() {
    await this.cartRows.first().waitFor();   // cart loads via ajax
    await this.placeOrderButton.click();
  }
}
module.exports = { Cartpage };