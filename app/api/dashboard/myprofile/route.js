import { connectDB } from "@/db/mongoose";
import { Userprofile } from "@/models/Userprofile";

export const POST = async (req) => {
    try {
        await connectDB();

        const { id } = await req.json();

        let userprofile = await Userprofile.findById(id);

        // If not found, create a new one with the same _id
        if (!userprofile) {
            userprofile = new Userprofile({ _id: id });
            await userprofile.save();

            return new Response(JSON.stringify(userprofile), {
                status: 201,
                headers: { "Content-Type": "application/json" },
            });
        }

        // If found, return it
        return new Response(JSON.stringify(userprofile), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error in POST handler:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};


export const PUT = async (req) => {
    try {
        await connectDB();  

        const { id, profileImage,
            coverImage,title, about, fuelCost,
            introLink, website,behance,discord,github,facebook,instagram,linkedin,
            pinterest,telegram,youtube,snapchat,reddit,x,whatsapp} = await req.json();

        const userProfile = await Userprofile.findById(id)
        if (!userProfile) {
            return new Response(JSON.stringify({ error: "Error saving data, Please try again later." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            )
        }

        userProfile._id = id;
        userProfile.profileImage = profileImage
        userProfile.coverImage = coverImage
        userProfile.title = title
        userProfile.about = about
        userProfile.fuelCost = fuelCost
        userProfile.introLink = introLink
        userProfile.website = website
        userProfile.behance = behance
        userProfile.discord = discord
        userProfile.github = github
        userProfile.facebook = facebook
        userProfile.instagram = instagram
        userProfile.linkedin = linkedin
        userProfile.pinterest = pinterest
        userProfile.telegram = telegram
        userProfile.youtube = youtube
        userProfile.snapchat = snapchat
        userProfile.reddit = reddit
        userProfile.x = x
        userProfile.whatsapp = whatsapp

        await userProfile.save();

        return new Response(JSON.stringify({ message: "profile updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Update error:", error);
        return new Response(JSON.stringify({ error: "Failed to update profile" }), { status: 500 });
    }

};