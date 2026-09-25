const { test, expect } = require('@playwright/test')

test('Rahul Sheety test', async ({page}) => {

    const userName = page.locator('#username');

    const signInButton = page.locator('[type="submit"]');

    const cardTitles = page.locator('.card-body a');
    const dropdown = page.locator("select[class='form-control']");
    const documentLink = page.locator('[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await page.locator('#username').fill('rahulshetty');
    await page.locator("[name='password']").fill('Learning@830$3mK2');
   // await page.locator("span[class='checkmark']").nth(0).check();
    //await dropdown.selectOption('consult');

    


    await page.locator('[type="submit"]').click();

    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
     

    await userName.fill('')
    await userName.fill('rahulshettyacademy');
   await page.locator("span[class='checkmark']").nth(1).check();
    await page.locator('#okayBtn').click();
    await dropdown.selectOption('consult');
    //assertion
    // await page.pause();
     await expect(page.locator("span[class='checkmark']").last()).toBeChecked();
     await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');


  
    await signInButton.click();
    console.log(await page.locator('.card-body a').nth(3).textContent());
    console.log(await page.locator('.card-body a').first().textContent());
    const cardTitleTexts = await cardTitles.allTextContents();
    console.log(cardTitleTexts);
   
 })


 test('child window test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*="documents-request"]');

    const [newPage] = await Promise.all(
   [
    context.waitForEvent('page'),  //listen for any new page event pending,rejected,fulfilled for promise
 documentLink.click()
])
const text = await newPage.locator('p.red').textContent();
console.log(await newPage.locator('p.red a').textContent());
const arrayText = text.split('@');
const domain= arrayText[1].split(' ')[0];
console.log(domain);
 const userName = page.locator('#username');
 await userName.fill(domain);
  await page.pause();
 console.log(await userName.inputValue());






   



});

