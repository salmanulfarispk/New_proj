import express from "express"
import cors from "cors"
import 'dotenv/config';
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";


const app = express()
const port= process.env.PORT || 4001

connectDB();
connectCloudinary();


app.use(express.json())
app.use(cors())


app.listen(port,()=>{
    console.log("server runs on ", port);
    
})