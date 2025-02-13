import { app } from "./app";
import dotenv from "dotenv";
import { NotFoundError } from "@be-my-guest/common";
import connectDatabase from "./config/dbConfig";
import { connectRabbitMQ } from "./config/rabbitmq";

dotenv.config();

const start = async () => {
  console.log("✨ Starting Up......!");

  if (!process.env.ACCESS_SECRET) {
    throw new NotFoundError("JWT_SECRET must be declared");
  }

  if (!process.env.MONGO_URL) {
    throw new NotFoundError("MONGO_URL must be defined");
  }

  if (!process.env.RABBITMQ_URL) {
    throw new NotFoundError("RABBITMQ_URL must be defined");
  }

  await connectDatabase();

  await connectRabbitMQ();

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

start();
