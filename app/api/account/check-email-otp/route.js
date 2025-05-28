import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";
import OtpDB from "@/models/OtpDB";
import { SendOtp } from "@/resend/SendOtp";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

    await OtpDB.create({ email, otp, expiresAt });

    SendOtp(email,otp)

    return new Response(JSON.stringify({ exists: !!user }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};