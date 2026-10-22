const {test, expect} = require('@playwright/test');
const {customtest} = require('../test-data/test-fixture.js');
const {POmanager} = require('../pageobjects/POmanager.js');

const dataset =JSON.parse(JSON.stringify(require('../test-data/Placeorder.json')));



for (const data of dataset)
{

test (` Client login for ${data.itemtoAdd}`, async ({page}) => 
    {
    

    const poManager = new POmanager(page);


    const loginPage = poManager.getLoginPage();
    await  loginPage.goTo();
    await loginPage.validLogin(data.userName,data.passWord);
    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.searchProduct(data.itemtoAdd);
    await dashboardPage.navigateToCart();
    const mycartpage = poManager.getMyCartPage();
    await mycartpage.buyNow(data.itemtoAdd);

    const checkoutpage = poManager.getCheckOutPage();
    await checkoutpage.CheckoutFieldUpdate(data.userName,data.country);
    const orderid =await checkoutpage.Placeorder();

    const orderpage = poManager.getOrderPage();
    await orderpage.CheckOrderDetails(orderid);












}

)
};


{

customtest(' Client login for Fixture', async ({page,testDataforOrder}) => 
    {
    

    const poManager = new POmanager(page);


    const loginPage = poManager.getLoginPage();
    await  loginPage.goTo();
    await loginPage.validLogin(testDataforOrder.userName,testDataforOrder.passWord);
    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.searchProduct(testDataforOrder.itemtoAdd);
    await dashboardPage.navigateToCart();
    const mycartpage = poManager.getMyCartPage();
    await mycartpage.buyNow(testDataforOrder.itemtoAdd);

    const checkoutpage = poManager.getCheckOutPage();
    await checkoutpage.CheckoutFieldUpdate(testDataforOrder.userName,testDataforOrder.country);
    const orderid =await checkoutpage.Placeorder();

    const orderpage = poManager.getOrderPage();
    await orderpage.CheckOrderDetails(orderid);












}

)
};













  


    




