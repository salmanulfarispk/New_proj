import ordermodel from "../models/orderModel.js";
import userModel from "../models/userModel.js";






const placeOrder=async(req,res)=>{

    const { userId,items,amount,address }=req.body;

    try {

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

        await  userModel.findByIdAndUpdate(userId,{ cartData:{}})

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