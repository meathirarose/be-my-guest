import express from 'express';
import { errorHandler } from "./middlewares/errorHandler";
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes'; 
import propertyOwnerRoutes from './routes/propertyOwnerRoutes';

const app = express();

// Middleware
app.use(express.json());  
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/property-owners', propertyOwnerRoutes);

//Error handler middleware
app.use(errorHandler);

export { app };
