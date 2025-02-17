import { app } from "./app";
import connectToDatabase from "./config/dbConfig";
import { envConfig } from "./config/envConfig";


const start = async () => {
  console.log("✨ Starting Up......!");

  await connectToDatabase();

  app.listen(envConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${envConfig.PORT}`);
  });
};

start();
