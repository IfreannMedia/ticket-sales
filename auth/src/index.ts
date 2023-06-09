import { json } from "body-parser";
import express from "express";
import 'express-async-errors';
import mongoose from "mongoose";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import cookieSession from "cookie-session";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async () => {
  throw new NotFoundError()
});

app.use(errorHandler);

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error("JWT key is not defined");
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to MONGODB');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();