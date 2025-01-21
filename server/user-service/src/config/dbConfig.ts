import mongoose from "mongoose";
import dotenv from "dotenv";
import { DatabaseConnectionError } from "@be-my-guest/common";

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {});
    console.log("MongoDB connected successfully.!");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};

export default connectToDatabase;
