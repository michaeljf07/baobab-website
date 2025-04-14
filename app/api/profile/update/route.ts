import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/auth.config";
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

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return NextResponse.json({
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json(
            { error: "Failed to fetch user profile" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const session = (await getServerSession(authOptions)) as Session;
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const data = await request.json();

        await connect();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update user fields
        user.charityName = data.charityName || user.charityName;
        user.description = data.description || user.description;
        user.image = data.image || user.image;
        user.address = data.address || user.address;

        await user.save();

        // Convert to object and delete password field directly
        const userObj = user.toObject();
        delete userObj.password;

        return NextResponse.json({
            user: userObj,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
            { error: "Failed to update user profile" },
            { status: 500 }
        );
    }
}
