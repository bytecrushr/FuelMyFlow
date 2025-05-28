import mongoose, { model } from "mongoose";

const PaymentreceiptSchema=new  mongoose.Schema({
    toUser:{type:String},
    toUserID:{type:String},
    amount:{type:Number},
    receipt:{type:String,unique: true},
    currency:{type:String},
    paidAt:{type:Date, default:Date.now},
    done:{type:Boolean,default:false},
    razorpay_order_id:{type:String},
    razorpay_payment_id:{type:String}
})
export const Paymentreceipt = mongoose.models.Paymentreceipt || mongoose.model("Paymentreceipt", PaymentreceiptSchema);
