import express from "express"
import cors from "cors"
import 'dotenv/config';
import connectDB from "./config/mongoDB.js";


const app = express()
const port= process.env.PORT || 4001

connectDB()


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=> {
    res.send("its works")
})


app.listen(port,()=>{
    console.log("server runs on ", port);
    
})