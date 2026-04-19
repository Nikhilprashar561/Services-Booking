import { adminModel } from "../models/admin.model.js";
import { generateAccessToken } from "../utils/accessToken.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";
import { passwordHashing } from "../utils/passwordHashing.js";
import { generateRefreshToken } from "../utils/refreshToken.js";
import dotenv from "dotenv";

dotenv.config();

const adminRegister = async (req, res) => {
  try {
    const { fullname, email, password, verifyCode } = req.body;

    if (!fullname || !email || !password || !verifyCode) {
      throw new ApiErrors(400, "Please fill all fields");
    }

    const checkAlready = await adminModel.countDocuments();
    if (checkAlready >= 1)
      throw new ApiErrors(400, "Sorry to says but Admin already created");

    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      throw new ApiErrors(400, "With this email Admin Already Created");
    }

    const adminSecretCode = process.env.ADMIN_SECRET_CODE;
    console.log("Check Secrte Code Aya ya nahi", adminSecretCode);

    if (parseInt(verifyCode) !== parseInt(adminSecretCode))
      throw new ApiErrors(400, "Check Verify Code. Invalid Code");

    const hashPassword = await passwordHashing(password);
    const role = "Admin";

    let createUsername = fullname.replace(/\s+/g, "");
    createUsername = `@${createUsername}123`;
    console.log(createUsername);

    const createAdmin = await adminModel.create({
      fullname,
      email,
      password: hashPassword,
      verifyCode: adminSecretCode,
      role: role,
      username: createUsername.toLowerCase(),
    });

    if (!createAdmin)
      throw new ApiErrors(400, "Failed to register admin data.");

    return res
      .status(201)
      .json(new ApiRes(201, createAdmin, "Admin Register SuccessFully"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiErrors(400, "All Field are required");
    }

    const checkEmail = await adminModel.findOne({ email });
    if (!checkEmail) {
      throw new ApiErrors(400, "User not found with this email");
    }

    const dbPassword = checkEmail.password;

    const passwordCompare = await isPasswordCorrect({ password, dbPassword });

    if (!passwordCompare) {
      throw new ApiErrors(400, "Password not validate");
    }

    const payload = {
      _id: checkEmail._id,
      fullname: checkEmail.fullname,
      email: checkEmail.email,
      role: checkEmail.role,
    };

    const refreshPayload = {
      _id: checkEmail._id,
    };

    console.log(payload);
    console.log(refreshPayload);

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(refreshPayload);

    if (!accessToken || !refreshToken) {
      throw new ApiErrors(400, "Tokens not get");
    }

    checkEmail.refreshToken = refreshToken;
    await checkEmail.save();

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiRes(
          200,
          { user: checkEmail, accessToken, refreshToken },
          "User Login SuccessFully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const adminLogout = async (req, res) => {
  try {
    const findAdmin = await adminModel.findById(req?.user);

    findAdmin.refreshToken = null;

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiRes(201, findAdmin, "Admin Logout SuccessFully"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

export { adminRegister, adminLogin, adminLogout };
