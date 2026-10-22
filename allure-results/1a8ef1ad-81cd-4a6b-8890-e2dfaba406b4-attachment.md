# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientPOM.spec.js >>  Client login for ZARA COAT 3
- Location: tests\ClientPOM.spec.js:12:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h3').getByText('ZARA COAT 3')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('h3').getByText('ZARA COAT 3') with timeout 5000ms
  - waiting for locator('h3').getByText('ZARA COAT 3')

```

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.":
    - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- heading "My Cart" [level=1]
- button "Continue Shopping❯"
- heading "No Products in Your Cart !" [level=1]
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | class MyCartPage{
  3  | 
  4  | constructor(page)
  5  | {
  6  |     this.page=page;
  7  |     this.divfield = page.locator('div li');
  8  |     this.productNamefield  = page.locator("h3");
  9  |     this.buynow = page.locator(".btn-primary[style='margin-top: -20px;']")
  10 |  
  11 | 
  12 | }
  13 | async buyNow(productname)
  14 | {
  15 |  //await this.divfield.first().waitFor();
> 16 |   await expect(this.productNamefield.getByText(productname)).toBeVisible();
     |                                                              ^ Error: expect(locator).toBeVisible() failed
  17 |   await this.buynow.click();
  18 | }
  19 | 
  20 | }module.exports = {MyCartPage}
```