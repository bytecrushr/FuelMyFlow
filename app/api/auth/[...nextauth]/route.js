import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import { connectDB } from "@/db/mongoose";
import GoogleProvider from "next-auth/providers/google";
import { LoginAlertEmail } from "@/resend/LoginAlert";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                //for credential db logic happens here, 
                // where as for Auth option in callbacks section.
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error("No user found");
                if (user.password !== credentials.password) throw new Error("Invalid credentials");
                
                await LoginAlertEmail(user.email,user.username);

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    username: user.username,
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "github" || account.provider === "google") {
                // Connect to DB
                await connectDB();

                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const baseUsername = user.email.split("@")[0];
                    let username = baseUsername;
                    let counter = 1;

                    // Ensure unique username
                    while (await User.findOne({ username })) {
                        username = `${baseUsername}${counter}`;
                        counter++;
                    }
                    const newUser = new User({
                        email: user.email,
                        username,
                        name: user.name
                    });
                    await newUser.save();

                }
            }
            if (account.provider === "credentials") {
                console.log("User logged in using credentials:", user.email);

            }
            return true;
        },

        async session({ session, token, user }) {
            const dbUSer = await User.findOne({ email: session.user.email })
            session.user.id = dbUSer._id;
            session.user.name = dbUSer.name;
            session.user.username = dbUSer.username;
            session.user.createdAt = dbUSer.createdAt;
            session.user.updatedAt = dbUSer.updatedAt;

            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };