import express from "express"
import {loginUser,registerUser,addtoCart,getCart,updateCart,cartCount} from "../controllers/userController.js"
import authUser from "../middleware/auth.js"
const userRouter=express.Router()



userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post('/add-to-cart',authUser ,addtoCart);
userRouter.post("/cart",authUser,getCart)
userRouter.patch("/updatecart",authUser,updateCart)
userRouter.post("/cartcount",authUser,cartCount)







export default userRouter;