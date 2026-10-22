const {test,expect,request} = require('@playwright/test')
const {APIUtils} = require('../utils/APIUtils')
let context;

const LoginPayload = {
    userEmail: "akash4566122134@gmail.com",
    userPassword: "Password@123"
}
let response;


const OrderPayload = {
    orders: [
        {
            country:"India",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
}

test.beforeAll( async({browser})=>
{
   context = await browser.newContext();
  const page = await context.newPage();
 

const apiContext = await request.newContext();
const apiutils = new APIUtils(apiContext,LoginPayload);
response = await apiutils.createOrder(OrderPayload);



});







test ('Client Place Order', async ({page}) => {


await page.addInitScript(value =>
{
    window.localStorage.setItem('token',value);

},response.token
);

     await page.goto('https://rahulshettyacademy.com/client');

     
  

   

await page.locator('[routerlink="/dashboard/myorders"].btn-custom').click()
const orderitem=page.locator('tr.ng-star-inserted ')
const ordercount = orderitem.count()
//await page.pause();
for (let i=0;i<ordercount;++i)
{
   if( orderitem.locator("th").nth(i).textContent()===response.orderid)
   {
    await orderitem.locator("text='View'").nth(i).click();
   
     break;
   }

 await expect(page.locator('div.col-text')).toContainText(response.orderid)

}

});

