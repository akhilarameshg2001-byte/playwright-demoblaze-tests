
const { test, expect } = require('@playwright/test');

const URL = 'https://demoblaze.com/';
const username = `akhila@`;
const password = 'Akhila@123';

test.describe.serial('Demoblaze store test', () => {

test('Test 1 - Signup with a new user', async ({ page }) => {
  const username = `akhila@`;          // unique every run
  await openSignup(page);
  await fillSignup(page, username, password);
  const message = await alertFrom(page, () =>
    page.getByRole('button', { name: 'Sign up' }).click()
  );
  expect(message).toContain('Sign up successful');
});

test('Test 1b - Signup with an existing user', async ({ page }) => {
  await openSignup(page);
  await fillSignup(page, username, password);              // akhila@ already exists
  const message = await alertFrom(page, () =>
    page.getByRole('button', { name: 'Sign up' }).click()
  );
  expect(message).toContain('This user already exist');
});
    test('Test 2 - Navigate to productpage', async ({ page }) => {
        await page.goto(URL);

        const product = page.getByRole('link', {
            name: 'Samsung galaxy s6'
        });

        await expect(product).toBeVisible();
        await product.click();

        await expect(page).toHaveURL(/prod\.html/);
    });
    test('Test 3 - Login to the site using valid credential', async({page})=>{
        await page.goto(URL)
        await page.locator('#login2').click();

        await page.locator("#loginusername").fill("akhila@")
        await page.locator("#loginpassword").fill("Akhila@123")
        await page.getByRole('button', {name : 'Log in'}).click()
    })
    test('Test 4 - Login with invalid username and valid password', async({page})=>{
        await page.goto(URL)
        await page.locator("#login2").click()
        await page.locator("#loginusername").fill('Test@')
        await page.locator("#loginpassword").fill("Akhila@123")
        await page.getByRole('button', {name : 'Log in'}).click()
        const dialogPromise = page.waitForEvent('dialog');
        const dialog = await dialogPromise;
        expect(dialog.message()).toContain('Wrong password');
        await dialog.accept();
    })
    test('Test 5 - Login with valid username and invalid password', async({page})=>{
           await page.goto(URL)
           await page.locator("#login2").click()
           await page.locator("#loginusername").fill('akhila@')
           await page.locator("#loginpassword").fill("Test111")
           await page.getByRole('button', {name : 'Log in'}).click()
           const dialogPromise = page.waitForEvent('dialog');
         // await page.locator('button[onclick="logIn()"]').click();

          const dialog = await dialogPromise;
          expect(dialog.message()).toContain('Wrong password');
          await dialog.accept();
    })
    test('Test 6 - Login with both invalid username and password', async({page})=>{
       await page.goto(URL)
           await page.locator("#login2").click()
           await page.locator("#loginusername").fill('Testdata')
           await page.locator("#loginpassword").fill("Test222")
           await page.getByRole('button', {name : 'Log in'}).click()
           const dialogPromise = page.waitForEvent('dialog');
         // await page.locator('button[onclick="logIn()"]').click();

          const dialog = await dialogPromise;
          expect(dialog.message()).toContain('Wrong password');
          await dialog.accept();  
    })
    test('Test 7 - Add a product to cart', async({page})=>{
        await page.goto(URL)
        await page.getByRole('link', {name : "Phones"}).click()
        await page.getByRole('link', {name  : "Samsung galaxy s6"}).click()
        await page.getByRole('link', {name : "Add to cart"}).click()
        const dialogPromise = page.waitForEvent('dialog')
        const dialog = await dialogPromise
        expect(dialog.message()).toContain('Product added')
        await dialog.accept()
    })
    test('Test 8 - Purchase phone', async({page})=>{
        await page.goto(URL)

        await page.getByRole('link', {name : "Cart"}).click()
        await page.getByRole('button', {name : "Place Order"}).click()
        await page.locator("#name").fill("Akhila Ramesh")
        await page.locator("#country").fill("India")
        await page.locator("#city").fill("Trivandrum")
        await page.locator("#card").fill("730633344522")
        await page.locator("#month").fill("October")
        await page.locator("#year").fill("2025")

        await page.getByRole('button', {name : "Purchase"}).click()
        await expect(page.locator('.sweet-alert')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();
    })
    test('Test 9 - Purchase monitor', async({page})=>{
        await page.goto(URL)
        await page.getByRole('link', {name : "Monitors"}).click()
        await page.getByRole('link', {name : "Sony vaio i5"}).click()
        await page.getByRole('link', {name : "Add to cart"}).click()
        const dialogPromise = page.waitForEvent('dialog')
        const dialog = await dialogPromise
        expect(dialog.message()).toContain('Product added')
        await dialog.accept()

        await page.locator("#cartur").click()
        await page.getByRole('button', {name : "Place Order"}).click()
        await page.locator("#name").fill("Akhila Ramesh")
        await page.locator("#country").fill("India")
        await page.locator("#city").fill("Trivandrum")
        await page.locator("#card").fill("730633344522")
        await page.locator("#month").fill("October")
        await page.locator("#year").fill("2025")

        await page.getByRole('button', {name : "Purchase"}).click()
        await expect(page.locator('.sweet-alert')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();

    })
    test('Test 10 - Add products from all categories and purchase', async({page})=>{
        await page.goto(URL)
        await page.getByRole('link', {name : "Phones"}).click()
        await page.getByRole('link', {name  : "Samsung galaxy s6"}).click()
        await page.getByRole('link', {name : "Add to cart"}).click()
        await page.waitForTimeout(1000);

        
         await page.locator("#nava").click()
         await page.getByRole('link', { name: 'Laptops' }).click();
         await page.getByRole('link', { name: 'Sony vaio i5' }).click();
         await page.getByRole('link', { name: 'Add to cart' }).click();
         await page.waitForTimeout(1000);
 
       
        await page.locator("#nava").click()
        await page.getByRole('link', {name : "Monitors"}).click()
        await page.getByRole('link', {name : "Apple monitor 24"}).click()
        await page.getByRole('link', {name : "Add to cart"}).click()
        await page.waitForTimeout(1000);
      

         await page.locator("#cartur").click()
         await page.getByRole('button', {name : "Place Order"}).click()
         await page.locator("#name").fill("Akhila Ramesh")
         await page.locator("#country").fill("India")
         await page.locator("#city").fill("Trivandrum")
         await page.locator("#card").fill("730633344522")
         await page.locator("#month").fill("October")
         await page.locator("#year").fill("2025")

         await page.getByRole('button', {name : "Purchase"}).click()
         await expect(page.locator('.sweet-alert')).toBeVisible();
         await page.getByRole('button', { name: 'OK' }).click();
   })
   test('Test 11 - Logout', async({page})=>{
    await page.goto(URL)
    await page.locator('#login2').click();

    await page.locator("#loginusername").fill("akhila@")
    await page.locator("#loginpassword").fill("Akhila@123")
    await page.getByRole('button', {name : 'Log in'}).click()

    await page.locator("#logout2").click()
   })

})