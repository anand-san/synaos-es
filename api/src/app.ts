import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from "./routes"
import { responseMessage } from './utils/responseUtils';
import cors from "cors"
const app = express();
//Parse request body middleware
app.use(express.json())
app.use(cors())

//Use Routes
userRouter(app);

//Handle invalid route error
app.get('*', function (req, res) {
  res.status(404).send(responseMessage.message(404, "Invalid Endpoint"));
});


//Common error handler middleware
app.use(function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500)
  res.send(responseMessage.message(500, err.message || err))
})

export default app