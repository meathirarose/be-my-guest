import mongoose from "mongoose";
import dotenv from "dotenv";
import { DatabaseConnectionError } from "@be-my-guest/common";
import { envConfig } from "./envConfig";

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_URL, {});
    console.log("✅ Connected to MongoDB successfully..!");
  } catch (error) {
    console.log(error)
    throw new DatabaseConnectionError();
  }
};

export default connectToDatabase;
