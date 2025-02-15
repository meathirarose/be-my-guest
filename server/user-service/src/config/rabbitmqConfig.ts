import { BadRequestError } from '@be-my-guest/common';
import amqplib, { Connection, Channel } from 'amqplib';
import dotenv from "dotenv";
import { envConfig } from './envConfig';

dotenv.config();

let connection: Connection | null = null;
let channel: Channel | null = null;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqplib.connect(envConfig.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('✅ Connected to RabbitMQ in user-service');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ');
        console.error('Error details:', error);
    }
};

export const getRabbitMQChannel = (): Channel => {
    if (!channel) {
      throw new BadRequestError('RabbitMQ channel is not initialized. Call connectRabbitMQ first.');
    }
    return channel;
};