import productModel from "../models/productModel.js"


const listProduct=async(req,res)=>{
 
     try {
        const products= await productModel.find({})
        res.json({
            success:true,
            products
        })
        
     } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message})
        
     }
}


const singleProduct=async(req,res)=>{
  
    try {
        const { productId } = req.params;
        const product= await productModel.findById(productId)
        res.json({
            success: true,
            product
        })  
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message})
    }
}


const latestproduct=async(req,res)=>{
    try {
        const lastTenProduct=await productModel.find({})
        .sort({ createdAt: -1 })
        .limit(10);

        if(!lastTenProduct || lastTenProduct.length === 0){
            return res.json({
                success:false,
                message:"There is no products in database.."
            })
        }

        res.json({
           success:true,
           lastTenProduct
        })
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message})
    }
}


export { listProduct,singleProduct,latestproduct}