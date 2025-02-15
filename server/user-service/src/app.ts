import express from "express";
import { errorHandler, NotFoundError } from "@be-my-guest/common";
import userRoutes from "./routes/userRoutes";
import propertyOwnerRoutes from "./routes/propertyOwnerRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envConfig } from "./config/envConfig"; 

const app = express();

// CORS Configuration
const corsOptions = {
  origin: envConfig.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/property-owners", propertyOwnerRoutes);

app.all("*", () => {
  throw new NotFoundError("Sorry, the page you are looking for does not exist.");
});

// Error handler middleware
app.use(errorHandler);

export { app };
