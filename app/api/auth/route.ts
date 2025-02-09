import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const {
        charityName,
        registrationNumber,
        address,
        email,
        password,
        description,
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
        address,
        email,
        password: hashedPassword,
        description,
        image: "https://archive.org/download/instagram-plain-round/instagram%20dip%20in%20hair.jpg",
        wishlist: [],
    });

    try {
        await newUser.save();
        return new NextResponse("User has been registered", { status: 201 });
    } catch (err: any) {
        console.error("Error saving user:", err);
        return new NextResponse(err, { status: 500 });
    }
};
