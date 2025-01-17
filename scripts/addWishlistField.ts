import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Connect to MongoDB
async function connect() {
    if (mongoose.connections[0].readyState) return;

    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL not found in environment variables");
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        throw new Error("Could not connect to database");
    }
}

// Define User schema for the migration
const userSchema = new mongoose.Schema({
    wishlist: {
        type: [{
            title: String,
            brand: String,
            mainImageUrl: String,
            rating: Number,
            url: String,
            price: {
                display: String
            },
            dateAdded: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function migrate() {
    try {
        await connect();
        
        // Update all documents that don't have a wishlist field
        const result = await User.updateMany(
            { wishlist: { $exists: false } },
            { $set: { wishlist: [] } }
        );
        
        console.log(`Updated ${result.modifiedCount} documents`);
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate(); 