import express from 'express';
import { errorHandler } from "./middlewares/errorHandler";
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';  

const app = express();

// Middleware
app.use(express.json());  
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

//Error handler middleware
app.use(errorHandler);

export { app };
