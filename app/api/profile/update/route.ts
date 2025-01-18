import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connect from "@/utils/db";
import User from "@/models/User";
import { Session } from "next-auth";

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions) as Session;
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { charityName } = await request.json();
        
        await connect();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { charityName },
            { new: true }
        ).select([
            "charityName",
            "registrationNumber",
            "email",
            "description",
            "image",
            "wishlist"
        ]);

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
} 