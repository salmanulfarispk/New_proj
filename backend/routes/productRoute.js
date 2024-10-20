import express from "express"
import { listProduct,singleProduct,latestproduct } from "../controllers/productController.js"

const productRouter=express.Router()


productRouter.get("/list-product",listProduct)
productRouter.post("/single-product/:productId",singleProduct)
productRouter.get("/latest-products",latestproduct)




export default productRouter