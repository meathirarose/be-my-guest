import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import { DatabaseConnectionError, NotFoundError } from "@be-my-guest/common";

dotenv.config();

const start = async () => {
  console.log("✨ Starting Up......!");

  if (!process.env.JWT_SECRET) {
    throw new NotFoundError("JWT_SECRET must be declared");
  }

  if (!process.env.MONGO_URL) {
    throw new NotFoundError("MONGO_URL must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB successfully..!");
  } catch (error) {
    throw new DatabaseConnectionError();
  }

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

start();
