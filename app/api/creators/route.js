import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";
import { Userprofile } from "@/models/Userprofile";

export const GET = async (req) => {
    try {
        await connectDB();

        const creators = await User.find().select('name username');
        const creatorProfiles= await Userprofile.find().select('profileImage title')

        if (!creatorProfiles || !creators) {
            return new Response(JSON.stringify({ error: "Error fetching Creators" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        const combined = creators.map((creator, index) => {
            const profile = creatorProfiles[index] || {};
            return {
                ...creator._doc,
                ...profile._doc,
            };
        });

        return new Response(JSON.stringify(combined), {
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