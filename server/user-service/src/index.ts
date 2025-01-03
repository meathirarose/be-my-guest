import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();
  
const start = async () => {
    console.log("Starting Up......!");

    if(!process.env.JWT_SECRET){
        throw new Error("JWT_SECRET must be declared");
    }

    if(!process.env.MONGO_URL){
        throw new Error("MONGO_URL must be defined");
    }

    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB successfully..!");

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

start();