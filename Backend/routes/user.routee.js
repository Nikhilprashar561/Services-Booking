import express from "express";
import {
  userAddress,
  userLogin,
  userLogout,
  userRegister,
} from "../controller/user.contollers.js";
import { createBookingRequest, reviewLocalProvider } from "../controller/bookingRequest.controllers.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/login").post(userLogin);
userRouter.route("/address").put(auth, userAddress);
userRouter.route("/logout").get(auth, userLogout);

userRouter
  .route("/bookingRequest")
  .post(
    auth,
    upload.fields([{ name: "workImage", maxCount: 1 }]),
    createBookingRequest,
  );

userRouter.route("/review").post(auth, reviewLocalProvider);

export { userRouter };
