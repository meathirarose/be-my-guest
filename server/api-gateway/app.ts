import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));

const corsOptions = {
  origin: process.env.FRONTEND_URL || "",
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));


app.use('/user-service', proxy(`${process.env.USER_SERVICE_URL}`));

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT,()=>{
    console.log(`API Gateway running on ${PORT}`);
});