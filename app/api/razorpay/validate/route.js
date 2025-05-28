import crypto from "crypto";
import { Paymentreceipt } from "@/models/Paymentreceipt";
import { SucessfulDonation } from "@/models/SucessfulDonation";
import { DonationNotificationEmail } from "@/resend/DonationNotification";

export async function POST(req) {
    try {
        const body = await req.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt, amount,currency,
            toUser, toUserID,senderName,fromUsername,fromUseremail,message,fuelCost,toEmail } = body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            const finalizedReceipt = await Paymentreceipt.findOne({ receipt });
            if (finalizedReceipt) {
                finalizedReceipt.razorpay_order_id = razorpay_order_id;
                finalizedReceipt.toUserID= toUserID;
                finalizedReceipt.razorpay_payment_id = razorpay_payment_id;
                finalizedReceipt.toUser = toUser;
                finalizedReceipt.amount = amount;
                finalizedReceipt.currency= currency;
                finalizedReceipt.done = true;
                await finalizedReceipt.save();
            } else {
                const newReceipt = new Paymentreceipt({
                    receipt,
                    razorpay_order_id,
                    razorpay_payment_id,
                    toUser,
                    toUserID,
                    amount,
                    currency,
                    done: true
                });
                await newReceipt.save();
            }
            const success= new SucessfulDonation({
                toUser,
                toUserID,
                senderName,
                fromUsername,
                fromUseremail,
                amount,
                currency,
                message,
                fuelCost
            })
        
            await success.save()

            DonationNotificationEmail(toEmail,toUser,senderName,message,amount)

            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false }), { status: 400 });
        }
    } catch (err) {
        console.error("Verification error:", err);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}