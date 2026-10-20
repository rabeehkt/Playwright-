const {LoginPage }=require('./LoginPage');
const {DashBoardPage} =require('./DashBoardPage');
const {MyCartPage} =require('./MyCartPage');
const {CheckOutPage} = require('./CheckOutPage');
const {OrderPage} = require('./OrderPage');



class POmanager{
    constructor(page){
       this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashBoardPage=new DashBoardPage(this.page);
        this.myCartPage=new MyCartPage(this.page);
        this.checkOutPage=new CheckOutPage(this.page);
        this.orderPage=new OrderPage(this.page);



    }


    getLoginPage()
    {
        return this.loginPage;
    }

    getDashBoardPage()
    {
        return this.dashBoardPage;
    }

    getMyCartPage()
    {
        return this.myCartPage;
    }

    getCheckOutPage()
    {
        return this.checkOutPage;
    }

    getOrderPage()
    {
        return this.orderPage;
    }
}module.exports = {POmanager}

