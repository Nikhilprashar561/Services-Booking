import express from "express";
import {
  localProviderAddress,
  localProviderLogin,
  localProviderLogout,
  localProviderRegister,
} from "../controller/localProvider.controllers.js";
import {
  isAcceptedLocalProvider,
  isCancelLocalProvider,
  isJobStatusLocalProvider,
  isPaymentLocalProvider,
  bookingDateLocalProvider,
  statusLocalProvider,
  finalPostLocalProvider,
  reviewLocalProvider,
} from "../controller/bookingRequest.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

const localProviderRouter = express.Router();

localProviderRouter.route("/register").post(localProviderRegister);
localProviderRouter.route("/login").post(auth, localProviderLogin);
localProviderRouter.route("/address").post(auth, localProviderAddress);
localProviderRouter.route("/logout").post(auth, localProviderLogout);

localProviderRouter.route("/is-accept").post(auth, isAcceptedLocalProvider);
localProviderRouter.route("/is-cancel").post(auth, isCancelLocalProvider);
localProviderRouter.route("/isjob-status").post(auth, isJobStatusLocalProvider);
localProviderRouter.route("/is-payment").post(auth, isPaymentLocalProvider);
localProviderRouter.route("/booking-date").post(auth, bookingDateLocalProvider);
localProviderRouter.route("/current-status").post(auth, statusLocalProvider);
localProviderRouter.route("/final-post").post(auth, finalPostLocalProvider);
localProviderRouter.route("/review").post(auth, reviewLocalProvider);

export { localProviderRouter };
