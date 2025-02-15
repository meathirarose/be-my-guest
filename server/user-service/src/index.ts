import { app } from "./app";
import { envConfig } from "./config/envConfig"; 
import  connectToDatabase  from "./config/dbConfig";
import { connectRabbitMQ } from "./config/rabbitmq";

const start = async () => {
  console.log("✨ Starting Up......!");

  await connectToDatabase();
  await connectRabbitMQ();

  app.listen(envConfig.PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${envConfig.PORT}`);
  });
};

start();
