
const { test, expect } = require('@playwright/test')

test('Locator test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel("Gender").selectOption('Female');
    await page.getByPlaceholder('Password').fill('test123');
   await page.locator('[name="email"]').fill("rabeeh@gmail.com");
    await page.getByRole("button",{name:"submit"}).click();
    const bool = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    expect(await bool).toBeTruthy;
    // 5 seconds wait fpr expect default
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout:10_000});
    await page.locator('app-card').first().waitFor();
    await page.locator('app-card').filter({hasText: 'Nokia'}).getByRole('button').click()





});


test('Locator test timeout', async ({page}) => {

    test.setTimeout(60000);
    page.setDefaultTimeout(9000);

   const slowExpect =  expect.configure({timeout:9_000});
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Employed').check();
    await page.getByLabel("Gender").selectOption('Female');
    await page.getByPlaceholder('Password').fill('test123');
   await page.locator('[name="email"]').fill("rabeeh@gmail.com");
    await page.getByRole("button",{name:"submit"}).click();
    const bool = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    expect(await bool).toBeTruthy;
    // 5 seconds wait fpr expect default
    await slowExpect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({timeout:10_000});
    await page.getByRole("link",{name:"shop"}).click({timeout:15000})
    await expect(page.locator('.my-4').first()).toContainText('Shop');
    await page.locator('app-card').first().waitFor();
    await page.locator('app-card').filter({hasText: 'Nokia'}).getByRole('button').click()





});
