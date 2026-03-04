import { UserModel } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import { generateAccessToken } from "../utils/accessToken.js";
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";
import { passwordHashing } from "../utils/passwordHashing.js";
import { generateRefreshToken } from "../utils/refreshToken.js";

const userRegister = async (req, res) => {
  try {
    const { fullname, email, password, city } = req.body;
    if (!fullname || !email || !password || !city) {
      throw new ApiErrors(400, "All Fields are required");
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser)
      throw new ApiErrors(
        400,
        "With this email Loacl Servcie man already register",
      );

    const hashPassword = await passwordHashing(password);

    const role = "customer";

    let createUsername = fullname.replace(/\s+/g, "");
    createUsername = `@${createUsername}123`;
    console.log(createUsername);

    const createLocalProvider = await UserModel.create({
      fullname,
      email,
      password: hashPassword,
      city,
      role: role,
      username: createUsername,
    });

    if (!createLocalProvider)
      throw new ApiErrors(400, "Some Issue occur while registering");

    return res
      .status(201)
      .json(
        new ApiRes(201, createLocalProvider, "Customer Register Successfully"),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiErrors(400, "All Field are required");
    }

    const checkEmail = await  UserModel.findOne({ email });
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
          "Customer Login SuccessFully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const userAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      throw new ApiErrors(400, "All field are required");
    }

    const customer = await UserModel.findById(req?.user);

    if (!customer) {
      throw new ApiErrors(400, "User not found");
    }

    customer.address = address;

    await customer.save();

    return res
      .status(200)
      .json(new ApiRes(200, customer, "Address added successfully"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const userLogout = async (req, res) => {
  try {
    const findCustomer = await UserModel.findById(req?.user);

    findCustomer.refreshToken = null;

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiRes(200, findCustomer, "Customer Logout SuccessFully"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

export { userRegister, userLogin, userAddress, userLogout };
