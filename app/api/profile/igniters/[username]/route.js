import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";
import { SucessfulDonation } from "@/models/SucessfulDonation";

export const GET = async (req, {params}) => {
    try {
        await connectDB();
        const { username } = await params;

        const user = await User.findOne({ username });
        console.log(user)
        if (!user) {
            return new Response(JSON.stringify({ error: "Username not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const igniters = await SucessfulDonation.find(
            { toUserID: user._id },
            { senderName: 1, amount: 1,currency:1, message: 1,fromUsername:1,
                fromUseremail:1, paidAt: 1, _id: 1,fuelCost:1,comment:1 } 
          );
         
          console.log(igniters)

        if (!igniters){
            return new Response(JSON.stringify({ error: "No Igniters found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify({igniters}),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in GET handler:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};