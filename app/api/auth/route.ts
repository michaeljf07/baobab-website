import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const {
        charityName,
        registrationNumber,
        email,
        password,
        description,
        image,
    } = await request.json();

    await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        charityName,
        registrationNumber,
        email,
        password: hashedPassword,
        description,
        image,
        wishlist: []
    });

    try {
        await newUser.save();
        return new NextResponse("User has been registered", { status: 201 });
    } catch (err: any) {
        console.error("Error saving user:", err);
        return new NextResponse(err, { status: 500 });
    }
};
