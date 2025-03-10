import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/auth.config";
import connect from "@/utils/db";
import User from "@/models/User";
import { Session } from "next-auth";

export async function DELETE(
    request: Request,
    context: { params: { id: string; itemId: string } }
) {
    try {
        const session = (await getServerSession(authOptions)) as Session;
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const { id, itemId } = context.params;

        await connect();

        // First verify the user owns this charity
        const charity = await User.findOne({ _id: id });
        if (!charity || charity.email !== session.user.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 }
            );
        }

        // Remove the item from the wishlist
        const updatedCharity = await User.findOneAndUpdate(
            { _id: id },
            { $pull: { wishlist: { _id: itemId } } },
            { new: true }
        );

        if (!updatedCharity) {
            return NextResponse.json(
                { error: "Charity not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting wishlist item:", error);
        return NextResponse.json(
            { error: "Failed to delete wishlist item" },
            { status: 500 }
        );
    }
}
