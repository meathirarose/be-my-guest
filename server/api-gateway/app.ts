import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { currentUser } from '@be-my-guest/common';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));

const corsOptions = {
  origin: process.env.FRONTEND_URL || "",
  method: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(currentUser);

app.use('/user-service', proxy(`${process.env.USER_SERVICE_URL}`));
console.log("ndhan ini ivde prasnm connect cheyyan pattanille...ivde api- gateway lum pattanilla..?");
console.log("nnapne env variable kittanundonn nokka", process.env.PROPERTY_SERVICE_URL);
app.use('/property-service', proxy(`${process.env.PROPERTY_SERVICE_URL}`));

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT,()=>{
    console.log(`API Gateway running on ${PORT}`);
});