import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";

export const POST = async (req) => {
  try {
    await connectDB();
    const {email} = await req.json();

    const user = await User.findOne({ email });

    return new Response(JSON.stringify({ exists: !!user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
};