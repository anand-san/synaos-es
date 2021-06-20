import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from "mongoose"
import { userRouter } from "./routes"
import { responseMessage } from './utils/responseUtils';

dotenv.config({
  path: '.env'
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    const app = express();

    //Parse request body middleware
    app.use(express.json())

    //Use Routes
    userRouter(app);

    //Handle invalid route error
    app.get('*', function (req, res) {
      res.status(404).send(responseMessage.message(404, "Invalid Endpoint"));
    });

    //Common error handler middleware
    app.use(function errorHandler(err:Error, req:Request, res:Response, next:NextFunction) {
      res.status(500)
      res.send(responseMessage.message(500, err.message || err))
    })


    app.listen(process.env.APP_PORT || 5000, () => console.log(`App Running`));
  } catch (e) {
    console.log(e)
  }

})()