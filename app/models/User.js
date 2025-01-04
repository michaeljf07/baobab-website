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
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
