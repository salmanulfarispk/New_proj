import express from "express"
import { adminlogin,addProduct,removeProduct } from "../controllers/adminController.js"
import upload from "../middleware/multer.js"

const adminRouter=express.Router()


adminRouter.post("/login",adminlogin)
adminRouter.post("/add-product",upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},
                                        {name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
                                        
adminRouter.post("/remove-product",removeProduct)






export default adminRouter;