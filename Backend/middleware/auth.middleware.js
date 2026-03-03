import jwt from "jsonwebtoken";
import { ApiErrors } from "../utils/ApiError.js";
import { adminModel } from "../models/admin.model.js";
import { localProviderModel } from "../models/localProvider.model.js";
import { UserModel } from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiErrors(400, "User Token not found, Invaild Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    let user;

    switch (decodedToken.role) {
      case "Admin":
        user = await adminModel.findById(decodedToken?._id);
        break;
      case "customer":
        user = await UserModel.findById(decodedToken?._id);
        break;
      case "localProvider":
        user = await localProviderModel.findById(decodedToken?._id);
        break;
      default:
        throw new ApiErrors(400, "User Not Found by token");
    }

    if (!user) {
      throw new ApiErrors(400, "User Not Found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiErrors(
      400,
      "Invailid Request, Please Login First then you are able",
    );
  }
};

export { auth };
