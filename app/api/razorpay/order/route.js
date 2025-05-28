import Razorpay from "razorpay";
import { Paymentreceipt } from "@/models/Paymentreceipt";
import { RecieptSeriesCounter } from "@/models/RecieptSeriesCounter";
import { connectDB } from "@/db/mongoose";

export const POST = async (req) => {
    try {
        await connectDB();

        const body = await req.json();
        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        let receiptId;

        const pendingReceipt = await Paymentreceipt.findOne({ done: false }).sort({ paidAt: -1 });
        if (pendingReceipt) {
            receiptId = pendingReceipt.receipt;
        } else {
            //Check DB if counter seq matches last reciept no. if not edit it manually in DB.
            const counter = await RecieptSeriesCounter.findOneAndUpdate(
                { id: "receipt" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            receiptId = `FMW-${counter.seq}`;
            await Paymentreceipt.create({ receipt: receiptId });
        }

        //Commented this as it was not concurrency safe.
        // const lastReceipt = await Paymentreceipt.findOne().sort({ paidAt: -1 });
        // let receiptId = "FMW-1";
        // if (lastReceipt) {
        //     if (lastReceipt.done === true) {
        //         const lastNumber = parseInt(lastReceipt.receipt.split("-")[1], 10);
        //         receiptId = `FMW-${lastNumber + 1}`;
        //         await Paymentreceipt.create({ receipt: receiptId });
        //     } else {
        //         receiptId = lastReceipt.receipt;
        //     }
        // } else {
        //     await Paymentreceipt.create({ receipt: receiptId });
        // }  

        const options = {
            amount: body.amount,
            currency: "INR",
            receipt: receiptId,
            payment_capture: 1,
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) {
            return new Response(JSON.stringify({ error: "Order creation failed" }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify(order), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Payment error:", error);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
        });
    }
};