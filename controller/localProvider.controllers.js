import { localProviderModel } from "../models/localProvider.model.js";
import { generateAccessToken } from "../utils/accessToken.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import { isPasswordCorrect } from "../utils/isPasswordCorrect.js";
import { passwordHashing } from "../utils/passwordHashing.js";
import { generateRefreshToken } from "../utils/refreshToken.js";

const localProviderRegister = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      city,
      category,
      pricePerHour,
      experience,
    } = req.body;
    if (
      !fullname ||
      !email ||
      !password ||
      !city ||
      !category ||
      !experience ||
      !pricePerHour
    ) {
      throw new ApiErrors(400, "All Fields are required");
    }

    const existUser = await localProviderModel.findOne({ email });
    if (existUser)
      throw new ApiErrors(
        400,
        "With this email Loacl Servcie man already register",
      );

    const hashPassword = await passwordHashing(password);

    if (typeof pricePerHour !== "number" || pricePerHour <= 0)
      throw new ApiErrors(400, "Enter a valid price number");

    if (experience < 0 || experience > 50) {
      throw new ApiErrors(400, "Please enter a valid number of experince ");
    }

    const role = "localProvider";

    let createUsername = fullname.replace(/\s+/g, "");
    createUsername = `@${createUsername}123`;
    console.log(createUsername);

    const createLocalProvider = await localProviderModel.create({
      fullname,
      email,
      password: hashPassword,
      city,
      category,
      experience,
      pricePerHour,
      role: role,
      username: createUsername,
    });

    // if(experience !==)

    if (!createLocalProvider)
      throw new ApiErrors(400, "Some Issue occur while registering");

    return res
      .status(201)
      .json(
        new ApiRes(
          201,
          createLocalProvider,
          "Local Provider Register Successfully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const localProviderLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiErrors(400, "All Field are required");
    }

    const checkEmail = await localProviderModel.findOne({ email });
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
          "localProvider Login SuccessFully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const localProviderAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      throw new ApiErrors(400, "All field are required");
    }

    const localprovider = await localProviderModel.findById(req?.user);

    if (!localprovider) {
      throw new ApiErrors(400, "User not found");
    }

    localprovider.address = address;

    await localprovider.save();

    return res
      .status(200)
      .json(new ApiRes(200, localprovider, "Address added successfully"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const localProviderLogout = async (req, res) => {
  try {
    const findlocalProvider = await localProviderModel.findById(req?.user);

    findlocalProvider.refreshToken = null;

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(
        new ApiRes(
          200,
          findlocalProvider,
          "Local Provider Logout SuccessFully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

export {
  localProviderRegister,
  localProviderLogin,
  localProviderAddress,
  localProviderLogout,
};
