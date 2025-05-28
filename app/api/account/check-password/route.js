import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";

export const POST = async (req) => {
  try {
    await connectDB();
    const {email,password} = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

    if (!user.password) {
        return new Response(JSON.stringify({ error: "No password set. Please use 'Forgot password' to set one." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      if (user.password !== password) {
        return new Response(JSON.stringify({ error: "Invalid password" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(JSON.stringify({ exists: true, userId: user._id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
};
}