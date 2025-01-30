import express from "express";
import { errorHandler, NotFoundError } from "@be-my-guest/common";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import listPropertyRoutes from "./routes/listPropertyRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "",
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.options('*', cors(corsOptions));  

app.use("/api/property", listPropertyRoutes);

app.all("*", () => {
  throw new NotFoundError(
    "Sorry, the page you are looking for does not exist."
  );
});

//Error handler middleware
app.use(errorHandler);

export { app };
