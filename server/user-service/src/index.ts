import { app } from "./app";
import dotenv from "dotenv";
import { NotFoundError } from "@be-my-guest/common";
import connectToDatabase from "./config/dbConfig";

dotenv.config();

const start = async () => {
  console.log("✨ Starting Up......!");

  if (!process.env.JWT_SECRET) {
    throw new NotFoundError("JWT_SECRET must be declared");
  }

  if (!process.env.MONGO_URL) {
    throw new NotFoundError("MONGO_URL must be defined");
  }

  await connectToDatabase();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

start();
