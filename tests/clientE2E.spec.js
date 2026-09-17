const {test, expect} = require('@playwright/test');

test.only('Client Register', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('[routerlink="/auth/register"]').click();
    console.log(await page.locator('.login-title').textContent());
    await page.locator('#firstName').fill('John');
    await page.locator('#lastName').fill('Doe');
    await page.locator('[placeholder="email@example.com"]').fill('akash1119@gmail.com');
    await page.locator('#userMobile').fill('1234567890');
    await page.locator('[formcontrolname="occupation"]').selectOption('Engineer');
    await page.locator("input[value='Male']").check();
    await page.locator('#userPassword').fill('Password@123');
    await page.locator('#confirmPassword').fill('Password@123');
    await page.locator("[formcontrolname='required']").check();
    await page.locator('#login').click();


    await page.locator("[routerlink='/auth']").click();
    await page.locator('#userEmail').fill('akash1119@gmail.com');
    await page.locator('#userPassword').fill('Password@123');
    await page.locator('#login').click();
   // await expect(page.locator('.card-body b').nth(0)).toContainText('ADIDAS ORIGINAL');
    //console.log(await page.locator('.card-body b').nth(1).textContent());

     const productTitles = page.locator('.card-body h5');

    await productTitles.first().waitFor();


    const products = await productTitles.allTextContents();

    console.log(products);
    const itemtoAdd ='ZARA COAT 3';




})