import express from "express";
import {
  adminLogin,
  adminLogout,
  adminRegister,
} from "../controller/admin.contollers.js";
import { auth } from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.route("/register").post(adminRegister);
adminRouter.route("/login").post(adminLogin);
adminRouter.route("/logout").get(auth, adminLogout);

export { adminRouter };
