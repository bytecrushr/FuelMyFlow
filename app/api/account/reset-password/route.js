import { connectDB } from "@/db/mongoose";
import OtpDB from "@/models/OtpDB";
import { User } from "@/models/User";
import { SendOtp } from "@/resend/SendOtp";

// Reset Password
export const PUT = async (req) => {
    try {
        await connectDB();
        const { password, email, otp } = await req.json();

        const accountDetails = await User.findOne({ email });
        const storedOtp = await OtpDB.findOne({ email });

        if (!accountDetails || !storedOtp) {
            return new Response(JSON.stringify({ error: "Invalid email or OTP" }), { status: 404 });
        }

        if (Date.now() > storedOtp.expiresAt) {
            await OtpDB.deleteOne({ email });
            return new Response(JSON.stringify({ error: "OTP has expired" }), { status: 410 });
        }

        if (otp !== storedOtp.otp.toString()) {
            return new Response(JSON.stringify({ error: "Incorrect OTP" }), { status: 401 });
        }

        accountDetails.password = password;
        await accountDetails.save();
        await OtpDB.deleteOne({ email });

        return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });

    } catch (error) {
        console.error("Reset error:", error);
        return new Response(JSON.stringify({ error: "Server error while resetting password" }), { status: 500 });
    }
};

//Resend OTP
export const POST = async (req) => {
    try {
        await connectDB();
        
        const { email } = await req.json(); 

        await OtpDB.deleteOne({ email });

        const otp = Math.floor(100000 + Math.random() * 900000); 
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

        await OtpDB.create({ email, otp, expiresAt });

        await SendOtp(email, otp);

        return new Response(JSON.stringify({ message: "OTP resent" }), { status: 200 });
    } catch (error) {
        console.error("OTP resend Error:", error);
        return new Response(JSON.stringify({ error: "Server error while resending OTP" }), { status: 500 });
    }
};