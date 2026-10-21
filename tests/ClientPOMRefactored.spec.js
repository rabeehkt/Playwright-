const { test, expect } = require('@playwright/test');
const { POmanager } = require('../pageobjects/POmanager.js');

test.describe('Client purchase flow', () => {
  test('should log in, add a product, and place an order', async ({ page }) => {
    const poManager = new POmanager(page);

    const userName = 'akash4566122134@gmail.com';
    const passWord = 'Password@123';
    const itemToAdd = 'ZARA COAT 3';
    const country ="ind";

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashBoardPage();
    const myCartPage = poManager.getMyCartPage();
    const checkoutPage = poManager.getCheckOutPage();
    const orderPage = poManager.getOrderPage();

    await test.step('Login to the application', async () => {
      await loginPage.goTo();
      await loginPage.validLogin(userName, passWord);
    });

    await test.step('Search and add the product to cart', async () => {
      await dashboardPage.searchProduct(itemToAdd);
      await expect(page.locator('.card').first()).toBeVisible();
      await dashboardPage.navigateToCart();
    });

    await test.step('Validate cart, checkout, and place the order', async () => {
      await myCartPage.buyNow(itemToAdd);
      await checkoutPage.CheckoutFieldUpdate(userName,country);

      const orderId = await checkoutPage.Placeorder();
      await orderPage.CheckOrderDetails(orderId);
    });
  });
});
