class DashBoardPage{

constructor(page)
{
    this.page=page;
    this.productNames = page.locator('.card-body h5');
    this.items = page.locator('.card-body');
    this.cart = page.locator("[routerlink='/dashboard/cart']")
  
   

}

async searchProduct(productName)
{
     await this.productNames.first().waitFor();


    const products = await this.productNames.allTextContents();

    console.log(products);
   
    const total = await this.items.count()
    for (let i=0;i<total;++i)
    {
        
        if(await this.items.nth(i).locator('b').textContent()===productName)
    {

    await this.items.nth(i).getByText('Add to Cart').click()
    break;
    }
}

}

async navigateToCart()
{
await this.cart.click();
}
}
module.exports = {DashBoardPage}