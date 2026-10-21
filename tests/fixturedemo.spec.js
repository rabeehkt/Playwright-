const {expect} = require('@playwright/test')
const { customtest } = require('../utils/fixtures.js');

customtest('Fixture demo', async ({authenticatedPage,createOrder,testDataforOrder}) => {
    await authenticatedPage.goto('https://rahulshettyacademy.com/client');
    await authenticatedPage.locator('[routerlink="/dashboard/myorders"].btn-custom').click();
    await expect(authenticatedPage.getByText(createOrder.response.orderid)).toBeVisible();
    console.log(testDataforOrder.productname)


});