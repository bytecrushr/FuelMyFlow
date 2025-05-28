
import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    // Already connected
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}