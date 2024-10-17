import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js"
import { setTokensInCookies } from "../utils/generateTokens.js";










const loginUser = async(req,res) => {
   
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

          res.json({
            success:true,
            message:"user registration success..",
            data:user
          })

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}





export { loginUser,registerUser}