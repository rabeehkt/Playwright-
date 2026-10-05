const {test,expect,request} = require('@playwright/test')

const LoginPayload = {
    userEmail: "akash4566122134@gmail.com",
    userPassword: "Password@123"
}

const OrderPayload = {
    orders: [
        {
            country:"India",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
}

let token;
let orderid;
test.beforeAll( async()=>
{
const apiContext = await request.newContext();
const LoginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {data:LoginPayload});

    expect(LoginResponse.ok()).toBeTruthy();
    const LoginResponseJson = await LoginResponse.json();
    token = LoginResponseJson.token;
   console.log(token)

const OrderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {data:OrderPayload,headers:
        {
            'authorization':token,
            'content-Type':'application/json'
        }
    }
)
const orderResponsejson = await OrderResponse.json();
console.log(orderResponsejson);

orderid = orderResponsejson.orders[0];



});



test.beforeEach( ()=>
{

}

);



test ('Client Place Order', async ({page}) => {

await page.addInitScript(value =>
{
    window.localStorage.setItem('token',value);

},token
);

     await page.goto('https://rahulshettyacademy.com/client');

     const userName='akash4566122134@gmail.com'
  

   

await page.locator('[routerlink="/dashboard/myorders"].btn-custom').click()
const orderitem=page.locator('tr.ng-star-inserted ')
const ordercount = orderitem.count()
await page.pause();
for (let i=0;i<ordercount;++i)
{
   if( orderitem.locator("th").nth(i).textContent()===orderid)
   {
    await orderitem.locator("text='View'").nth(i).click();
   
     break;
   }

 await expect(page.locator('div.col-text')).toContainText(orderid)

}

});

