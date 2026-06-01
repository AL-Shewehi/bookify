import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("Please add MONGODB_URL to .env.local");
}

declare global {
    var mongooseCache: {
        connection: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

let cached = global.mongooseCache || (global.mongooseCache = {
    connection: null,
    promise: null
});

export const connectToDatabase = async () => {
    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            bufferCommands: false,
        })
    }
    try {
        cached.connection = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error("Mongoose connection error:", error);
        throw error;
    }

    console.info("Connected to MongoDB");

    return cached.connection;
}