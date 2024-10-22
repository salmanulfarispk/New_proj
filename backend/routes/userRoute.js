import express from "express"
import {loginUser,registerUser,addtoCart,getCart,updateCart,cartCount} from "../controllers/userController.js"
import { verifyToken} from "../middleware/verifyToken.js"
const userRouter=express.Router()



userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post('/add-to-cart',verifyToken ,addtoCart);
userRouter.post("/cart",verifyToken,getCart)
userRouter.post("/updatecart",verifyToken,updateCart)
userRouter.post("/cartcount",verifyToken,cartCount)







export default userRouter;