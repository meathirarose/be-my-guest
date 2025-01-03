import express from 'express';
import { errorHandler } from "./middlewares/errorHandler";
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'; 
import propertyOwnerRoutes from './routes/propertyOwnerRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS Configuration
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true, 
    })
  );

// Middleware
app.use(express.json()); 
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/property-owners', propertyOwnerRoutes);

//Error handler middleware
app.use(errorHandler);

export { app };
