import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string, {});
        console.log('MongoDB connected successfully.!')
    } catch (error) {
        console.log('Error connecting to MongoDB:',error)
    }
}

export default connectToDatabase;