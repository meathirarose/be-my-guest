import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';  
import bodyParser from 'body-parser';
dotenv.config();  

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

app.use('/api/users', userRoutes);

//error handler middleware

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
