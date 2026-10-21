const base = require('@playwright/test');

exports.customtest = base.test.extend (
    {
    testDataforOrder : {
        userName:"akash4566122134@gmail.com",
passWord :"Password@123",
itemtoAdd :"ZARA COAT 3",
country :"Ind"

    }

}
)