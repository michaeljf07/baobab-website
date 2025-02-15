import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { Session } from "next-auth";

export async function PUT(request: Request) {
    try {
        const session = (await getServerSession(authOptions)) as Session;

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { oldPassword, newPassword } = await request.json();

        if (!oldPassword || !newPassword) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
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

        // Verify old password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 400 }
            );
        }

        // Hash and update new password
        const hashedPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Password update error:", error);
        return NextResponse.json(
            { error: "Failed to update password" },
            { status: 500 }
        );
    }
} 