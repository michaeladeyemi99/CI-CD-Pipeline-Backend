import express from "express";
import "reflect-metadata";
import { configDotenv } from "dotenv";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/user.routes";
import issueRouter from "./routes/issue.routes";
import cors from "cors";

configDotenv();

const app = express();
app.use(cors())
const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    // Middlewares
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(userRouter);
    app.use(issueRouter);

    //Listening to the Server
    app.listen(PORT, () => {
      console.log(
        `The Server runs on server ${PORT} and it works and the Database works too`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });



  // To be able to sort using Query
  // Api for getting all the issues alone
  // Delete Issues