import { NextResponse } from "next/server";
import User from "@/models/User";
import connect from "@/utils/db";

export async function GET() {
    await connect();

    try {
        const users = await User.find().select([
            "_id",
            "charityName",
            "description",
            "image",
            "wishlist"
        ]);
        console.log("Fetched charities successfully");
        return NextResponse.json({ users });
    } catch (error) {
        console.error("Could not fetch charities:", error);
        return NextResponse.json(
            { error: "Failed to fetch charities" },
            { status: 500 }
        );
    }
}
