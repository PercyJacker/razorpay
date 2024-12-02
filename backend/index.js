import  Express  from "express";
// import axios from "axios";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./route/routes.js"
import cors from "cors";
import multer from "multer";
import Razorpay from "razorpay";


const app=Express()

app.use(cors())
app.use(bodyParser.json())
app.use(Express.json()); // Parse JSON request bodies
app.use(Express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
dotenv.config()

const PORT=process.env.PORT || 3000;
const URL = process.env.MONGO_URI

export const instance = new Razorpay({
    key_id: process.env.API_KEY,
    key_secret: process.env.KEY_SECRET,
    headers: {
      "X-Razorpay-Account": "<merchant_account_id>"
    }
  });

//   instance.orders.all().then(console.log).catch(console.error);

mongoose.connect(URL).then(()=>{
    console.log("DB connected");
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`);
    })
}).catch(err=>console.log(err))

app.use("/api",route)


app.get("/api/getkey",(req, res)=>res.status(200).json({key:process.env.API_KEY}))

