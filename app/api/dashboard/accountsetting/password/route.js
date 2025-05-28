import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";


//Updating Account details.
export const PUT = async (req) => {
    try {
        await connectDB();

        const body = await req.json();
        const { oldPassword,newPassword,id} = body;

        const accountDetails = await User.findById(id);

        if (!accountDetails) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        if (accountDetails.password !== oldPassword) {
                return new Response(JSON.stringify({ error: "Wrong Password, please re-enter old password." }), { status: 401 });
        }else{
            accountDetails.password=newPassword;
        }
        await accountDetails.save();

        return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Update error:", error);
        return new Response(JSON.stringify({ error: "Failed to update password" }), { status: 500 });
    }
};