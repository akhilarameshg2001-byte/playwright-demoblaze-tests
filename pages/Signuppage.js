class Signuppage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
  }
  async signup(username = 'Akhils@', password = 'Akhila@123') {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.signupButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;          // let the test assert on it
  }
}
module.exports = { Signuppage };