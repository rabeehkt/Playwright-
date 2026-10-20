const { expect } = require('@playwright/test');
class CheckOutPage{

constructor(page)
{
this.page=page;
this.userNamefield=page.locator("[style*='lightgray']");
this.country=page.locator("[placeholder*='Country']");
this.options = page.locator('.ta-results button.ta-item');
this.creditMonth=page.locator("select.ddl").first();
this.creditYear = page.locator("select.ddl").last();
this.creditCVV = page.locator("input[class='input txt']").nth(0);
this.creditName= page.locator("input[class='input txt']").nth(1);
this.coupon = page.locator("[name='coupon']");
this.applyCoupon=page.locator("[type*='submit']");
this.greenLabel=page.locator("[style*='green']");
this.placeOrder= page.locator(".action__submit");
this.messages= page.locator('.hero-primary');
this.orderid= page.locator('label.ng-star-inserted');


  
   

}
async CheckoutFieldUpdate(userName)
{
  await expect(this.userNamefield).toHaveText(userName);
    //await expect(page.locator('input.ng-untouched').first()).toHaveValue(userName);
    await this.country.pressSequentially("ind", { delay: 150 });
    
    await this.options.first().waitFor();
    const optionCount = await this.options.count();
    for (let i = 0; i < optionCount; ++i) {
      const text = await this.options.nth(i).textContent();
      if (text.trim() === 'India') {
        await this.options.nth(i).click();
        break;
      }
    }
    
    await this.creditMonth.selectOption("11");
    await this.creditYear.selectOption("05");
    await this.creditCVV.fill('789')
    await this.creditName.fill('Akash');
    
    await this.coupon.fill('rahulshettyacademy');
    
    await this.applyCoupon.click();
    await this.coupon.waitFor()
    await expect(this.greenLabel).toContainText('Coupon Applied');
   
    


  
}

async Placeorder()
{
     await this.placeOrder.click();
    await this.messages.waitFor();
await expect(this.messages).toContainText('Thankyou for the order');
const orderid= await this.orderid.textContent();
return orderid;
}
}module.exports = {CheckOutPage}
