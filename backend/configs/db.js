import mongoose from "mongoose";

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected");
});

mongoose.connection.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on('disconnected', () => {
    console.warn("MongoDB disconnected");
});

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/lodgr`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
