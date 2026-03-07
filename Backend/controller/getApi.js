import { adminModel } from "../models/admin.model.js";
import { bookingRequestModel } from "../models/bookingRequest.model.js";
import { localProviderModel } from "../models/localProvider.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";

const adminDeatils = async (req, res) => {
  try {
    const admin = await adminModel.find().select("-password");

    if (admin.length < 1)
      throw new ApiErrors(400, "There are no any admin register");

    if (!admin) throw new ApiErrors(400, "Admin not find");

    return res.status(200).json(new ApiRes(200, admin, "Here is a your Admin"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const allBookingListDeatils = async (req, res) => {
  try {
    const allProvider = await localProviderModel.find();
    if (!allProvider)
      throw new ApiErrors(400, "Not anyone Local Provider found");
    if (allProvider.length < 1)
      throw new ApiErrors(400, "There are not any local provider register");

    return res
      .status(200)
      .json(new ApiRes(200, allProvider, "All Register Local Provider"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const allCustomerDeatils = async (req, res) => {
  try {
    const allCustomer = await UserModel.find();

    if (!allCustomer) throw new ApiErrors(400, "Not anyone customer found");

    if (allCustomer.length < 1)
      throw new ApiErrors(400, "There are not any customer register");

    return res
      .status(200)
      .json(new ApiRes(200, allProvider, "All Register User's"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const allLocalProviderDeatils = async (req, res) => {
  try {
    const allBookingList = await bookingRequestModel.find();

    if (!allBookingList)
      throw new ApiErrors(400, "Not anyone booking request found");

    if (allBookingList.length < 1)
      throw new ApiErrors(400, "There are not any booking register");

    return res
      .status(200)
      .json(new ApiRes(200, allBookingList, "All Register Booking Details"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const localProviderByCategory = async (req, res) => {
  // Find local provider by category, username and city name
  try {
    const { username, category, city } = req.body;

    const findLocalProvider = await localProviderModel
      .findOne({ $or: [{ username }, { category }, { city }] })
      .select("-password");

    if (!findLocalProvider)
      throw new ApiErrors(400, "There are not any local provider find");

    return res
      .status(200)
      .json(
        new ApiRes(200, findLocalProvider, "Local Provider find Successfully"),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const findCustomerByCategory = async (req, res) => {
  try {
    const { username, city } = req.body;

    const findCustomer = await UserModel.findOne({
      $or: [{ username }, { city }],
    }).select("-password");

    if (!findCustomer)
      throw new ApiErrors(400, "There are not any User Found find");

    return res
      .status(200)
      .json(new ApiRes(200, findCustomer, "User find Successfully"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const findLocalProviderCurrentBookingRequest = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) throw new ApiErrors(400, "Username Required");

    const findProvider = await localProviderModel
      .findOne({ username })
      .populate("bookingRequest");

    if (!findProvider)
      throw new ApiErrors(400, "Local Provider Current Booking Not Found");

    return res
      .status(200)
      .json(
        new ApiRes(
          200,
          { user: findProvider, currentBooking: findProvider.bookingRequest },
          "Local Provider Current Booking find successfully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const findCustomerCurrentBookingRequest = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) throw new ApiErrors(400, "Username Required");

    const findCustomer = await UserModel.findOne({ username }).populate(
      "bookingRequest",
    );

    if (!findCustomer)
      throw new ApiErrors(400, "User Current Booking Not Found");

    return res
      .status(200)
      .json(
        new ApiRes(
          200,
          { user: findCustomer, currentBooking: findCustomer.bookingRequest },
          "User Current Booking find successfully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const findCustomerServicesHistory = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) throw new ApiErrors(400, "Username Required");

    const findCustomer = await UserModel.findOne({ username }).populate(
      "servicesHistory",
    );

    if (!findCustomer)
      throw new ApiErrors(400, "User Booking History Not Found");

    return res
      .status(200)
      .json(
        new ApiRes(
          200,
          { user: findCustomer, currentBooking: findCustomer.bookingRequest },
          "User Booking History find successfully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const findLocalProviderServicesHistory = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) throw new ApiErrors(400, "Username Required");

    const findCustomer = await localProviderModel.findOne({ username }).populate(
      "servicesHistory",
    );

    if (!findCustomer)
      throw new ApiErrors(400, "Local Provider Booking History Not Found");

    return res
      .status(200)
      .json(
        new ApiRes(
          200,
          { user: findCustomer, currentBooking: findCustomer.bookingRequest },
          "Local Booking History find successfully",
        ),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

export {
  adminDeatils,
  allLocalProviderDeatils,
  allCustomerDeatils,
  allBookingListDeatils,
  localProviderByCategory,
  findCustomerByCategory,
  findLocalProviderCurrentBookingRequest,
  findCustomerCurrentBookingRequest,
  findCustomerServicesHistory,
  findLocalProviderServicesHistory
};
