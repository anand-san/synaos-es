import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { userRouter } from "./routes"

dotenv.config({
  path: '.env'
});

(async () => {
  try {
    const app = express();

    userRouter(app);

    ((port = process.env.APP_PORT || 5001) => {
      app.listen(port, () => console.log(`> Listening on port ${port}`));
    })();
  } catch (e) {
    console.log(e)
  }

})()