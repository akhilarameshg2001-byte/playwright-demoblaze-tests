class Homepage {
  constructor(page) {
    this.page = page;
    this.signupLink = page.locator('#signin2');
    this.loginLink = page.locator('#login2');
    this.logoutLink = page.locator('#logout2');
    this.cartLink = page.locator('#cartur');
    this.welcomeUser = page.locator('#nameofuser');
  }
  async open() { await this.page.goto('https://demoblaze.com/'); }
  async signup() { await this.signupLink.click(); }
  async login() { await this.loginLink.click(); }
  async logout() { await this.logoutLink.click(); }
  async openCart() { await this.cartLink.click(); }
  async selectCategory(name) {
  await Promise.all([
    this.page.waitForResponse(r => r.url().includes('bycat')),
    this.page.getByRole('link', { name, exact: true }).click(),
  ]);
  await this.page.locator('.card-title a').first().waitFor();
}

async selectProduct(name) {
  await this.page.getByRole('link', { name, exact: true }).click();
}
}
module.exports = { Homepage };