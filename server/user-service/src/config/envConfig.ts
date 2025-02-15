import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "FRONTEND_URL",
  "ACCESS_SECRET",
  "MONGO_URL",
  "RABBITMQ_URL",
];

requiredEnvVariables.forEach((envVar) => {
    if(!process.env[envVar]) {
        throw new Error(
            `Configuration Error: Missing required environment variable "${envVar}".
            Ensure it is set in the .env file or environment configuration.`
        );
    }
});

export const envConfig = {
    ACCESS_SECRET: process.env.ACCESS_SECRET as string,
    MONGO_URL: process.env.MONGO_URL as string,
    RABBITMQ_URL: process.env.RABBITMQ_URL as string,
    PORT: Number(process.env.PORT),
    FRONTEND_URL: process.env.FRONTEND_URL as string,
}