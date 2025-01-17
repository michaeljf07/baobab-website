import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    const { id } = await context.params;
    
    try {
        await connect();

        const charity = await User.findOne({ _id: id }).select([
            "charityName",
            "description",
            "image",
            "wishlist",
            "email"
        ]);

        if (!charity) {
            return NextResponse.json(
                { error: "Charity not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(charity);
    } catch (error) {
        console.error("Error fetching charity wishlist:", error);
        return NextResponse.json(
            { error: "Failed to fetch charity wishlist" },
            { status: 500 }
        );
    }
} 