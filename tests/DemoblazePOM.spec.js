const { expect, test } = require('@playwright/test');
const { Homepage } = require('../pages/Homepage');
const { Signuppage } = require('../pages/Signuppage');
const { Loginpage } = require('../pages/Loginpage');
const { Cartpage } = require('../pages/Cartpage');
const { Productpage } = require('../pages/Productpage');
const { Checkoutpage } = require('../pages/Checkoutpage');
const { loginData } = require('../Test-Data/logindata.js');

test.describe('Demoblaze store test', () => {
  let homepage, signuppage, loginpage, cartpage, productpage, checkoutpage;

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    signuppage = new Signuppage(page);
    loginpage = new Loginpage(page);
    cartpage = new Cartpage(page);
    productpage = new Productpage(page);
    checkoutpage = new Checkoutpage(page);
    await homepage.open();
  });

  test('Test 1 - Signup and create an account', async () => {
    const username = `akhila${Date.now()}`;
    await homepage.signup();
    const message = await signuppage.signup(username, 'Akhila@123');
    expect(message).toContain('Sign up successful');
  });

  test('Test 2 - Navigate to product page', async () => {
    await homepage.selectCategory('Phones');
    await homepage.selectProduct('Samsung galaxy s6');
    await productpage.verifyProduct('Samsung galaxy s6');
  });

  for (const data of loginData) {
    test(`Login - ${data.testName}`, async ({ page }) => {
      await homepage.login();
      if (data.isValid) {
        await loginpage.login(data.username, data.password);
        await expect(homepage.welcomeUser).toContainText(data.username);
      } else {
        const dialogPromise = page.waitForEvent('dialog');
        await loginpage.login(data.username, data.password);
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain(data.expectedMessage);
        await dialog.accept();
      }
    });
  }

  test('Test 7 - Select a product and add to cart', async () => {
    await homepage.selectCategory('Phones');
    await homepage.selectProduct('Nokia lumia 1520');
    await productpage.verifyProduct('Nokia lumia 1520');
    await productpage.addToCart();
  });

  test('Test 8 - Add a product from each category and purchase', async ({ page }) => {
    const categories = [
  { name: 'Phones',   first: 'Samsung galaxy s6' },
  { name: 'Laptops',  first: 'Sony vaio i5' },
  { name: 'Monitors', first: 'Apple monitor 24' },
];

for (const { name, first } of categories) {
  await homepage.selectCategory(name);
  const firstProduct = page.locator('.card-title a').first();
  await expect(firstProduct).toHaveText(first);       // waits for the new list
  await Promise.all([
    page.waitForURL(/prod\.html/),                     // the click must navigate
    firstProduct.click(),
  ]);
  await productpage.verifyProduct(first);
  await productpage.addToCart();
  await homepage.open();
}

    await homepage.openCart();
    await expect(cartpage.cartRows).toHaveCount(categories.length);
    await cartpage.placeOrder();
    await checkoutpage.fillCheckoutForm('Akhila', 'India', 'Trivandrum', '1234567890', 'December', '2026');
    await checkoutpage.purchase();
    await checkoutpage.verifyPurchase();
    await checkoutpage.closeConfirmation();
  });

  test('Test 9 - Checkout and place an order', async () => {
    const username = `akhila${Date.now()}`;
    const password = 'Akhila@123';

    await homepage.signup();
    const message = await signuppage.signup(username, password);
    expect(message).toContain('Sign up successful');

    await homepage.login();
    await loginpage.login(username, password);
    // await expect(homepage.welcomeUser).toContainText(username);

    await homepage.selectCategory('Phones');
    await homepage.selectProduct('Nokia lumia 1520');
    await productpage.addToCart();

    await homepage.openCart();
    await cartpage.placeOrder();
    await checkoutpage.fillCheckoutForm('Akhila', 'India', 'Trivandrum', '1234567890', 'December', '2026');
    await checkoutpage.purchase();
    await checkoutpage.verifyPurchase();
    await checkoutpage.closeConfirmation();
  });

  test('Test 10 - Logout after login', async ({ page }) => {
    const username = `akhila${Date.now()}`;
    const password = 'Akhila@123';

    await homepage.signup();
    const message = await signuppage.signup(username, password);
    expect(message).toContain('Sign up successful');

    await homepage.login();
    await loginpage.login(username, password);
    await expect(homepage.welcomeUser).toContainText(username);

    await homepage.logout();
    await expect(homepage.loginLink).toBeVisible();
    await expect(homepage.welcomeUser).toBeHidden();
  });
});