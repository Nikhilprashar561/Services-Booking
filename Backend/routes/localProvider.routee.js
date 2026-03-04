import express from "express";
import {
  localProviderAddress,
  localProviderLogin,
  localProviderLogout,
  localProviderRegister,
} from "../controller/localProvider.controllers.js";
import {
  requestStatus,
  finalPostLocalProvider,
} from "../controller/bookingRequest.controllers.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const localProviderRouter = express.Router();

localProviderRouter.route("/register").post(localProviderRegister);
localProviderRouter.route("/login").post(localProviderLogin);
localProviderRouter.route("/address").put(auth, localProviderAddress);
localProviderRouter.route("/logout").get(auth, localProviderLogout);

localProviderRouter.route("/is-accept").post(auth, requestStatus);

localProviderRouter.route("/final-post").post(
  auth,
  upload.fields([
    { name: "BeforeWork", maxCount: 3 },
    { name: "afterWork", maxCount: 3 },
  ]),
  finalPostLocalProvider,
);

export { localProviderRouter };
