const {test,expect} = require('@playwright/test')

test('First test', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
   await page.goto('https://playwright.dev/');
   console.log(await page.title());
   await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');    

});

test('basic test', async ({page}) => {
   await page.goto('https://mail.google.com/mail/u/0/');    
   console.log(await page.title());

});

