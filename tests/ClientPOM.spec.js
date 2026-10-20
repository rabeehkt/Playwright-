const {test, expect} = require('@playwright/test');

const {POmanager} = require('../pageobjects/POmanager.js');





test ('Client login', async ({page}) => {
    

    const poManager = new POmanager(page);

    const userName='akash4566122134@gmail.com'
    const passWord = 'Password@123'
    const itemtoAdd ='ZARA COAT 3';
    const loginPage = poManager.getLoginPage();
    await  loginPage.goTo();
    await loginPage.validLogin(userName,passWord);
    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.searchProduct(itemtoAdd);
    await dashboardPage.navigateToCart();
    const mycartpage = poManager.getMyCartPage();
    await mycartpage.buyNow(itemtoAdd);

    const checkoutpage = poManager.getCheckOutPage();
    await checkoutpage.CheckoutFieldUpdate(userName);
    const orderid =await checkoutpage.Placeorder();

    const orderpage = poManager.getOrderPage();
    await orderpage.CheckOrderDetails(orderid);












}

);












  


    




