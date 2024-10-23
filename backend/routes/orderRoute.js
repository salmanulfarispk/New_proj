import express from "express"
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,updatestatus,usersOrders} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"
const orderRouter=express.Router()


//admin
orderRouter.post('/list-all',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updatestatus)

//users payments

orderRouter.post("/place-order",authUser,placeOrder)
orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razor",authUser,placeOrderRazorpay)

orderRouter.post('/user-orders',authUser,usersOrders)







export default orderRouter;