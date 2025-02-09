import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        charityName: {
            type: String,
            required: true,
            unique: true,
        },
        registrationNumber: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        wishlist: {
            type: [
                {
                    title: String,
                    brand: String,
                    mainImageUrl: String,
                    rating: Number,
                    url: String,
                    price: {
                        display: String,
                    },
                    dateAdded: {
                        type: Date,
                        default: Date.now,
                    },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
