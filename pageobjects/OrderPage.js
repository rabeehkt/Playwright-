class OrderPage{

constructor(page)
{
    this.page=page;
    this.myorder =page.locator('[routerlink="/dashboard/myorders"].btn-custom');
    this.orderitem=page.locator('tr.ng-star-inserted');
    this.orderfield =page.locator('div.col-text ')


    
  
   

}

async CheckOrderDetails(orderid)
{
    await this.myorder.click()

const ordercount = this.orderitem.count()
for (let i=0;i<ordercount;++i)
{
   if( this.orderitem.locator("th").nth(i).textContent()===orderid)
   {
    await this.orderitem.locator("text='View'").nth(i).click();
    
     break;
   }
   
 await expect(this.orderfield).toContainText(orderid)
}
}
}module.exports = {OrderPage}
