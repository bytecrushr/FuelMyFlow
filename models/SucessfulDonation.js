import mongoose, { model } from "mongoose";

const SucessfulDonationSchema=new  mongoose.Schema({
    toUser:{type:String},
    toUserID:{type:String},
    senderName:{type:String},
    fromUsername:{type:String},
    amount:{type:Number},
    fuelCost:{type:Number},
    currency:{type:String},
    fromUseremail:{type:String},
    message :{type:String},
    paidAt:{type:Date, default:Date.now}, 
    comment:{type:String}
})
export const SucessfulDonation = mongoose.models.SucessfulDonation || mongoose.model("SucessfulDonation", SucessfulDonationSchema);
