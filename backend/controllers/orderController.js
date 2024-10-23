import ordermodel from "../models/orderModel.js";
import userModel from "../models/userModel.js";




const getOrderInfo= async(userId)=>{
    try {
        
        const user = await userModel.findById(userId).populate('cartData.productId'); 
    
        if (!user || !user.cartData) {
          return { error: "User or cart not found" };
        }
    
        const orderinfo = [];

        user.cartData.forEach(cartItem => {
          const product = cartItem.productId;
    
          if (product) {
            const iteminfo = {
              ...product.toObject(),  //takes a copy 
              size: cartItem.size,
              quantity: cartItem.quantity,
            };
    
            orderinfo.push(iteminfo);
          }
        });
    
        return orderinfo;
      } catch (error) {
        console.error("Error fetching order info:", error);
        return { error: "An error occurred" };
      }
}


const gettotalamount=async(userId)=>{

    const user= await userModel.findById(userId).populate('cartData.productId')

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let totalAmount = 0;
    let subtotal = 0;
    user.cartData.forEach((cartItem) => {
      const product = cartItem.productId;
      if (product) {
        const productAmount = product.price * cartItem.quantity; 
        subtotal += productAmount;
        const shippingCharge = 60 * cartItem.quantity; 
        totalAmount += productAmount + shippingCharge; 
      }
    });

    return  totalAmount; 
    
}





const placeOrder=async(req,res)=>{

    const { userId,address }=req.body;

     
    try {

         const items=await getOrderInfo(userId)
         const amount= await  gettotalamount(userId)


        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        const newOrder= new ordermodel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: [] }); 

         res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }









}



const placeOrderStripe=async(req,res)=>{
    
}



const placeOrderRazorpay=async(req,res)=>{
    
   
}




const allOrders=async(req,res)=>{

}


const usersOrders=async(req,res)=>{

}



const updatestatus =async(req,res)=>{

}



export { placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,usersOrders,updatestatus}