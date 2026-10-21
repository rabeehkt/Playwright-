class APIUtils
{

    constructor (apiContext,LoginPayload)
    {
        this.apiContext=apiContext;
        this.LoginPayload=LoginPayload;
    }
   async gettoken()
    {
        
const LoginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {data:this.LoginPayload});

    const LoginResponseJson = await LoginResponse.json();
    const token = LoginResponseJson.token;
   return token
    }

    async createOrder(OrderPayload)
    {
        let response={};
        response.token=await this.gettoken();
       
        const OrderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {data:OrderPayload,headers:
                {
                    'authorization':response.token,
                    'content-Type':'application/json'
                }
            }
        )
        const orderResponsejson = await OrderResponse.json();
        console.log(orderResponsejson);
        
        const orderid = orderResponsejson.orders[0];
        response.orderid=orderid;
        return response;
    }
}

module.exports= {APIUtils};