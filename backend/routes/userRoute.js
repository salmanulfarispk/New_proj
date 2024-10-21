import express from "express"
import {loginUser,registerUser,addtoCart,getCart,logout} from "../controllers/userController.js"
import { verifyTokens } from "../middleware/verifyToken.js"
const userRouter=express.Router()



userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post('/add-to-cart',verifyTokens ,addtoCart);
userRouter.get("/cart",verifyTokens,getCart)
userRouter.post("/logout",logout)





export default userRouter;