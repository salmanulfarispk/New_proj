import express from "express"
import { listProduct,singleProduct } from "../controllers/productController.js"

const productRouter=express.Router()


productRouter.get("/list-product",listProduct)
productRouter.post("/single-product",listProduct)




export default productRouter