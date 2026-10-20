const { expect } = require('@playwright/test');
class MyCartPage{

constructor(page)
{
    this.page=page;
    this.divfield = page.locator('div li');
    this.productNamefield  = page.locator("h3");
    this.buynow = page.locator(".btn-primary[style='margin-top: -20px;']")
 

}
async buyNow(productname)
{
 await this.divfield.first().waitFor();
  await expect(this.productNamefield.getByText(productname)).toBeVisible();
  await this.buynow.click();
}

}module.exports = {MyCartPage}