# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: WebApipart1.spec.js >> Client Place Order
- Location: tests\WebApipart1.spec.js:48:1

# Error details

```
Error: tracing.start: Tracing has been already started
```

```
Error: browserContext._wrapApiCall: Must start tracing before stopping
```

# Test source

```ts
  1  | const {test,expect,request} = require('@playwright/test')
  2  | const {APIUtils} = require('../utils/APIUtils')
  3  | let context;
  4  | 
  5  | const LoginPayload = {
  6  |     userEmail: "akash4566122134@gmail.com",
  7  |     userPassword: "Password@123"
  8  | }
  9  | let response;
  10 | 
  11 | 
  12 | const OrderPayload = {
  13 |     orders: [
  14 |         {
  15 |             country:"India",
  16 |             productOrderedId: "6960eac0c941646b7a8b3e68"
  17 |         }
  18 |     ]
  19 | }
  20 | 
  21 | test.beforeAll( async({browser})=>
  22 | {
  23 |    context = await browser.newContext();
  24 |   const page = await context.newPage();
  25 |  
  26 |   // START tracing (manual)
  27 |   await context.tracing.start({
  28 |     screenshots: true,
  29 |     snapshots: true
  30 |   });
  31 | const apiContext = await request.newContext();
  32 | const apiutils = new APIUtils(apiContext,LoginPayload);
  33 | response = await apiutils.createOrder(OrderPayload);
  34 | 
  35 | 
  36 | 
  37 | });
  38 | 
  39 | test.afterAll(async () => {
  40 |   await context.tracing.stop({ path: 'trace.zip' });
> 41 |   await context.close();
     |   ^ Error: browserContext._wrapApiCall: Must start tracing before stopping
  42 | });
  43 | 
  44 | 
  45 | 
  46 | 
  47 | 
  48 | test ('Client Place Order', async ({page}) => {
  49 | 
  50 | 
  51 | await page.addInitScript(value =>
  52 | {
  53 |     window.localStorage.setItem('token',value);
  54 | 
  55 | },response.token
  56 | );
  57 | 
  58 |      await page.goto('https://rahulshettyacademy.com/client');
  59 | 
  60 |      
  61 |   
  62 | 
  63 |    
  64 | 
  65 | await page.locator('[routerlink="/dashboard/myorders"].btn-custom').click()
  66 | const orderitem=page.locator('tr.ng-star-inserted ')
  67 | const ordercount = orderitem.count()
  68 | //await page.pause();
  69 | for (let i=0;i<ordercount;++i)
  70 | {
  71 |    if( orderitem.locator("th").nth(i).textContent()===response.orderid)
  72 |    {
  73 |     await orderitem.locator("text='View'").nth(i).click();
  74 |    
  75 |      break;
  76 |    }
  77 | 
  78 |  await expect(page.locator('div.col-text')).toContainText(response.orderid)
  79 | 
  80 | }
  81 | 
  82 | });
  83 | 
  84 | 
```