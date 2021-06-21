import dotenv from 'dotenv';
import mongoose from "mongoose"
import app from "./app"

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

    app.listen(process.env.APP_PORT || 5001, () => console.log(`App Running`));

  } catch (e) {
    console.log(e)
  }
})()