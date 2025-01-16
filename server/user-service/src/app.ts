import express from 'express';
import { errorHandler } from "./middlewares/errorHandler";
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'; 
import propertyOwnerRoutes from './routes/propertyOwnerRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { NotFoundError } from './errors/NotFoundError';

dotenv.config();

const app = express();

app.use(express.json()); 

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

app.options('*', cors(corsOptions)); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/property-owners', propertyOwnerRoutes);

app.all("*",()=>{
  throw new NotFoundError();
})

//Error handler middleware
app.use(errorHandler);

export { app };
