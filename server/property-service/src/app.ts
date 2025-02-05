import express from "express";
import { errorHandler, NotFoundError } from "@be-my-guest/common";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import propertyRoutes from "./routes/propertyRoutes";

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "",
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json()); 

app.use("/api/properties", propertyRoutes);

app.all("*", () => {
  throw new NotFoundError(
    "Sorry, the page you are looking for does not exist."
  );
});

//Error handler middleware
app.use(errorHandler);

export { app };
