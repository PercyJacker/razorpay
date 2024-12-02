import mongoose from "mongoose";

//mongoose.scehma is a function
// Schema for Student Profiles

const transactionSchema = new mongoose.Schema({
    razorpay_payment_id :{type:String,required:true}, 
    razorpay_order_id   :{type:String,required:true} , 
    razorpay_signature :{type:String,required:true}
})

  

export const transaction = mongoose.model("transaction",transactionSchema)
