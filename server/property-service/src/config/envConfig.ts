import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "FRONTEND_URL",
  "MONGO_URL",
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
    MONGO_URL: process.env.MONGO_URL as string,
    PORT: Number(process.env.PORT),
    FRONTEND_URL: process.env.FRONTEND_URL as string,
}