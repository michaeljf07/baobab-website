import CredentialsProvider from "next-auth/providers/credentials";
import { Account, User as AuthUser } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import NextAuth from "next-auth";

export const authOptions: any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                await connect();
                try {
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        }
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
