import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js"
import { setTokensInCookies } from "../utils/generateTokens.js";
import jwt from "jsonwebtoken"


const isProduction = process.env.NODE_ENV === "production";


const loginUser = async(req,res) => {
    try {
        
        const {email,password}=req.body;
        const user= await userModel.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"user doesn't exists..."
            })
        };

        const isMatchPass= await bcrypt.compare(password,user.password)
       
        if(isMatchPass){
          await setTokensInCookies(res,user._id);
          
          return res.json({
            success:true,
        })
        }else{
            res.json({
                success: false,
                message:"invalid credentials...."
            })
        }

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
   
}



const registerUser = async(req,res) => {
    try {
        const {name,email,password}=req.body;
        const existUser= await userModel.findOne({email})
        if(existUser){
            return res.json({
                success:false,
                message:"user already exists..."
            })
        };

        if(!validator.isEmail(email)){
            return res.json({
                success:"false",
                message:"Please enter a valid email"
            })
        }
        if(password.length < 8){
            return res.json({
                success:"false",
                message:"Please enter a strong password"
            })
        }


          const salt=await bcrypt.genSalt(10)
          const hashedpass= await bcrypt.hash(password,salt)

          const newUser= new userModel({
              name,
              email,
              password:hashedpass
          })

          const user= await newUser.save();

             await setTokensInCookies(res,user._id)

             return res.json({
                success:true,
            })
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


const    IsUserAvailable=async(req,res)=>{
    try {
        const { accessToken} = req.cookies;

        if (!accessToken) {
            return res.status(401).json({ success: false, message: 'User is not authenticated' });
        }
       
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Access token is invalid' });
            }
            
            return res.status(200).json({ success: true, user: user.id });
        });
        
    } catch (error) {

        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}



const addtoCart= async(req,res)=>{

    const {productId, price } = req.body;
    const { id: userId } = req.user; 

    try {

    const user=await userModel.findById(userId)
     if(!user){
        return res.status(404).json({success:false, message: 'User not found' });
     }
    

     const existingproduct= user.cartData.find(item => item.productId.toString() === productId);
     if(existingproduct){
        existingproduct.quantity += 1 ;
     }else{
        user.cartData.push({ productId, quantity: 1, price})
     }

     await user.save();

    return res.status(200).json({
      success:true,
      message: 'Product added to cart', 
      cartData: user.cartData 
    })

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



const getCart= async(req,res)=> {

    const { id: userId } = req.user; 

    try {

        const user= await userModel.findById(userId).populate({
            path: 'cartData.productId',
            select: 'name,image,sizes,price'
        })
        if (!user) {
            return res.status(404).json({success:false,message: 'User not found' });
        }
        

        return res.status(200).json({success:true, cartData: user.cartData });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const logout = async (req, res) => {
    try {
        
        res.cookie("accessToken", "", { 
            maxAge: 0, 
        });

        res.cookie("refreshToken", "", { 
            maxAge: 0, 
        });

        return res.status(200).json({success:true,message: 'Successfully logged out' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: 'Internal server error' });
    }
};

export { loginUser,registerUser,addtoCart,getCart,logout,IsUserAvailable}