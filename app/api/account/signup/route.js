import { connectDB } from "@/db/mongoose";
import { User } from "@/models/User";
import { SendOnboardingEmail } from "@/resend/Onboarding";


//Updating Account details.
export const POST = async (req) => {
    try {
        await connectDB();

        const body = await req.json();
        const { email, password } = body;

        const newUSer = await User.findOne({ email: email });

        if (newUSer) {
            return new Response(JSON.stringify({ error: "User Already Exist" }), { status: 409 });
        }

        const baseUsername =email.split("@")[0];
        let username = baseUsername;
        let counter = 1;

        // Ensure unique username
        while (await User.findOne({ username })) {
            username = `${baseUsername}${counter}`;
            counter++;
        }

        const newUser = new User({
            email: email,
            username,
            password: password
        });
        await newUser.save();

        SendOnboardingEmail(email,username);

        return new Response(JSON.stringify({ message: "Signup Successful" }), { status: 200 });
    } catch (error) {
        console.error("Update error:", error);
        return new Response(JSON.stringify({ error: "Failed to Signup" }), { status: 500 });
    }
};