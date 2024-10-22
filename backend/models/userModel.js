import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    cartData:[
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref:"product",required: true},
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },
            size: {type: String, required: true}, 
        }
    ],

},
{
    minimize: false
});


const userModel= mongoose.models.user || mongoose.model("user",userSchema)


export default userModel;