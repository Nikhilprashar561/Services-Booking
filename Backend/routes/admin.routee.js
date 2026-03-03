import express from "express";
import {
  adminLogin,
  adminLogout,
  adminRegister,
} from "../controller/admin.contollers.js";
import { auth } from "../middleware/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.route("/register").post(adminRegister);
adminRouter.route("/login").post(auth, adminLogin);
adminRouter.route("/logout").post(auth, adminLogout);

export { adminRouter };
