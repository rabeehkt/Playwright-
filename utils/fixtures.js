const base = require('@playwright/test');
const { APIUtils } = require('./APIUtils.js');
const {request} = require('@playwright/test');

const LoginPayload = {
    userEmail: "akash4566122134@gmail.com",
    userPassword: "Password@123"
};

const OrderPayload = { 
    orders: [{ country:"India",productOrderedId: "6960eac0c941646b7a8b3e68"}]
};

exports.customtest =base.test.extend({

    authenticatedPage: async({browser},use)=>
    {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    const userName='akash4566122134@gmail.com'
    const passWord = 'Password@123'
  
   
    await page.locator('#userEmail').fill(userName);
    await page.locator('#userPassword').fill(passWord);
    await page.locator('#login').click();
     await page.waitForLoadState('networkidle'); 
     await use(page);
 },
 
    createOrder: async({},use)=>
    {
        const apiContext = await request.newContext();


const apiutils = await  new APIUtils(apiContext,LoginPayload);
const response = await apiutils.createOrder(OrderPayload);
await use({response});
    },
    testDataforOrder:{
    productname : 'ADIDAS SHOES'
    }

});