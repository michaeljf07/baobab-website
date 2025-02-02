import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import connect from "@/utils/db";
import User from "@/models/User";
import { Session } from "next-auth";

export async function GET() {
    try {
        const session = (await getServerSession(authOptions)) as Session;

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        await connect();

        const user = await User.findOne({ email: session.user.email }).select([
            "charityName",
            "registrationNumber",
            "address",
            "email",
            "description",
            "image",
            "wishlist",
        ]);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Profile fetch error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
