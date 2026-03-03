import express from "express";
import {
  userAddress,
  userLogin,
  userLogout,
  userRegister,
} from "../controller/user.contollers.js";
import { createBookingRequest } from "../controller/bookingRequest.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/login").post(auth, userLogin);
userRouter.route("/address").post(auth, userAddress);
userRouter.route("/logout").post(auth, userLogout);

userRouter.route("/bookingRequest").post(auth, createBookingRequest)

export { userRouter };
