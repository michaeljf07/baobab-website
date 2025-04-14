import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; 

export async function GET(req: NextRequest) {
    await connect();
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await User.findOne({ email: session.user.email });

        if (!user || !user.contactInfo) {
            return NextResponse.json({}, { status: 200 }); 
        }
        
        return NextResponse.json(user.contactInfo); 
    } catch (error) {
        console.error("Error fetching contact info:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    
}

export async function PATCH(req: NextRequest) {
    await connect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const data = await req.json();
    console.log("Incoming contact data:", data);
    try {

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { contactInfo: data },
            { new: true, runValidators: true }
            
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Contact info updated successfully" });
    } catch (error) {
        console.error("Error updating contact info:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
    
}
