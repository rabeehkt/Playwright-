const {test,expect} =require('@playwright/test');

test("popup Validation", async({page}) =>

{
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
// await page.goto('https://google.com');
// await page.goBack();
// await page.goForward();
await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator('#hide-textbox').click();
await expect(page.locator('#displayed-text')).toBeHidden();

page.on('dialog',dialog=>dialog.accept())
await page.locator('#confirmbtn').click();

await page.locator('#mousehover').hover();


const Framepage = page.frameLocator('#courses-iframe')
const link = Framepage.locator("li a[href*='learning-path']:visible");
await link.evaluate(el => el.scrollIntoView({ block: 'center' }));
await link.click();
await page.pause()

const hours = await Framepage.locator('.learning-path-col').filter({hasText:'Software Quality Assurance Engineer'}).getByText('hours').textContent();
console.log(parseInt(hours));

const alink=Framepage.locator("li a[href*='lifetime-access']:visible");
await alink.click();
const sentence= await Framepage.locator('.text h2').textContent();
console.log(await sentence.split(" ")[1]);


})



