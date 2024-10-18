import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import jwt from "jsonwebtoken"




const adminlogin=async(req,res)=>{

 try {

  const {email,password}=req.body;

   if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    
    const token= jwt.sign({ email, password },process.env.JWT_SECRET, { expiresIn: '2d' });
    
     res.json({
      success:true,
      token
    })

   }else{
    res.json({
      success:false,
      message:"Invalid credentials or inputs.."
    })
   }

 } catch (error) {
  console.log(error);
     res.json({success:false,message:error.message})
 }

}



const addProduct= async(req,res)=>{
  try {
    
     const {name,description,price,category,subCategory,sizes,bestseller}=req.body;

     const image1= req.files.image1 && req.files.image1[0]
     const image2= req.files.image2 && req.files.image2[0]
     const image3= req.files.image3 && req.files.image3[0]
     const image4= req.files.image4 && req.files.image4[0]


     const images= [image1,image2,image3,image4].filter((item)=> item !== undefined)

      let imageUrl= await Promise.all(
        images.map(async(item)=> {
             let result= await cloudinary.uploader.upload(item.path,{resource_type:'image'});
             return result.secure_url
        })
      )

     const productData= {
        name,
        description,
        price: Number(price),
        category,
        subCategory,
        sizes: JSON.parse(sizes),
        bestseller: bestseller === "true" ? true : false ,
        image: imageUrl,
     };

     const product= new productModel(productData)
       await product.save();

       res.json({
        success: true,
        message:"Product added succesfully..!"
       })

  } catch (error) {
    console.log(error);
     res.json({success:false,message:error.message})
  }
}

const removeProduct= async(req,res)=>{

   try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({
      success:true,message:"product removed!"
    })
    
   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
   }

}


export { adminlogin,addProduct,removeProduct}