import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connect from "@/utils/db";
import User from "@/models/User";
import { Session } from "next-auth";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions) as Session;
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const product = await request.json();
        
        await connect();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { $push: { wishlist: { ...product, dateAdded: new Date() } } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Add to wishlist error:", error);
        return NextResponse.json(
            { error: "Failed to add item to wishlist" },
            { status: 500 }
        );
    }
} 