const {test, expect} = require('@playwright/test');

test ('Client login', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');

    const userName='akash4566122134@gmail.com'
    const passWord = 'Password@123'
    console.log(await page.locator('.login-title').textContent());
   
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userPassword').fill(passWord);
    await page.locator('#login').click();
   // await expect(page.locator('.card-body b').nth(0)).toContainText('ADIDAS ORIGINAL');
    //console.log(await page.locator('.card-body b').nth(1).textContent());

     const productTitles = page.locator('.card-body h5');
    const items = page.locator('.card-body');

    await productTitles.first().waitFor();


    const products = await productTitles.allTextContents();

    console.log(products);
    const itemtoAdd ='ZARA COAT 3';
    const total = await items.count()
    for (let i=0;i<total;++i)
    {
        if(await items.nth(i).locator('b').textContent()===itemtoAdd)
    {

    await items.nth(i).locator('.w-10').click()
    break;
    }
}
await page.locator("[routerlink='/dashboard/cart']").click();
//await expect(page.locator('.cartSection h3')).toContainText(itemtoAdd);

await page.locator('div li').first().waitFor();
await expect(page.locator("h3", { hasText: itemtoAdd })).toBeVisible();

await page.locator(".btn-primary[style='margin-top: -20px;']").click();
await expect(page.locator("[style*='lightgray']")).toHaveText(userName);
//await expect(page.locator('input.ng-untouched').first()).toHaveValue(userName);
await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
const options = page.locator('.ta-results button.ta-item');
await options.first().waitFor();
const optionCount = await options.count();
for (let i = 0; i < optionCount; ++i) {
  const text = await options.nth(i).textContent();
  if (text.trim() === 'India') {
    await options.nth(i).click();
    break;
  }
}

await page.locator("select.ddl").first().selectOption("11");
await page.locator("select.ddl").last().selectOption("05");
await page.locator("input[class='input txt']").nth(0).fill('789')
await page.locator("input[class='input txt']").nth(1).fill('Akash');
const coupon = page.locator("[name='coupon']")
await coupon.fill('rahulshettyacademy');

await page.locator("[type*='submit']").click();
await coupon.waitFor()
await expect(page.locator("[style*='green']")).toContainText('Coupon Applied');
await page.locator(".action__submit").click()
const messages=await page.locator('.hero-primary');
await messages.waitFor();
await expect(page.locator('.hero-primary')).toContainText('Thankyou for the order');
const orderid= await page.locator('label.ng-star-inserted').textContent();
console.log(orderid)
await page.locator('[routerlink="/dashboard/myorders"].btn-custom').click()
const orderitem=page.locator('tr.ng-star-inserted ')
const ordercount = orderitem.count()
for (let i=0;i<ordercount;++i)
{
   if( orderitem.locator("th").nth(i).textContent()===orderid)
   {
    await orderitem.locator("text='View'").nth(i).click();
    page.pause();
     break;
   }
   
 await expect(page.locator('div.col-text ')).toContainText(orderid)

}

});












  


    




