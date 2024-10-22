import express from "express"
import {loginUser,registerUser,addtoCart,getCart,logout,IsUserAvailable} from "../controllers/userController.js"
import { verifyAndRegenerateAccessToken } from "../middleware/verifyToken.js"
const userRouter=express.Router()



userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/checkme",IsUserAvailable)
userRouter.post('/add-to-cart',verifyAndRegenerateAccessToken ,addtoCart);
userRouter.get("/cart",verifyAndRegenerateAccessToken,getCart)
userRouter.post("/logout",logout)





export default userRouter;