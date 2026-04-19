import { bookingRequestModel } from "../models/bookingRequest.model.js";
import { localProviderModel } from "../models/localProvider.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiError.js";
import { ApiRes } from "../utils/ApiRes.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const createBookingRequest = async (req, res) => {
  try {
    const { username, category, description, bookingDate, price } = req.body;
    if (!username || !category || !bookingDate || !price) {
      throw new ApiErrors(400, "All Field are required");
    }

    const findLocalProvider = await localProviderModel
      .findOne({
        $or: [{ username }, { category }],
      })
      .select("-password -refreshToken -__v -createdAt -updatedAt");
    if (!findLocalProvider)
      throw new ApiErrors(
        400,
        `${username ? category : username} with this field local provider not found`,
      );

    const userCustomer = await UserModel.findById(req?.user).select(
      "-password -refreshToken -__v -createdAt -updatedAt",
    );
    if (!userCustomer) throw new ApiErrors(400, "Customer not found");

    if (findLocalProvider.bookingRequest) {
      throw new ApiErrors(
        400,
        "Services Provider already busy with another booking",
      );
    }
    if (userCustomer.bookingRequest) {
      throw new ApiErrors(400, "You have already one request pending..");
    }

    if (parseInt(price) < 0) {
      throw new ApiErrors(400, "Please enter a valid price");
    }

    if (!findLocalProvider.isApproved)
      throw new ApiErrors(400, "This Local Provider not approved");
    if (findLocalProvider.isBlocked)
      throw new ApiErrors(400, "This Local Provider Blocked");
    if (!findLocalProvider.isAvailable)
      throw new ApiErrors(400, "This Local Provider not available now");

    if (userCustomer.isBlocked)
      throw new ApiErrors(400, "You are blocked, No access to create request");

    const ImageFilePath = req?.files?.workImage[0]?.path;

    if (!ImageFilePath) {
      throw new ApiErrors(400, "Image Not Found in request");
    }
    const workImage = await uploadOnCloudinary(ImageFilePath);
    if (!workImage) {
      throw new ApiErrors(400, "Image was Not Uploaded on Cloudinary");
    }

    const createRequest = await bookingRequestModel.create({
      customer: userCustomer._id,
      provider: findLocalProvider._id,
      providerUsername: findLocalProvider.username,
      serviceCategory: findLocalProvider.category,
      description,
      price,
      bookingDate,
      workImage: workImage.secure_url,
    });

    if (!createRequest)
      throw new ApiErrors(400, "Some Issues while create booking request");

    findLocalProvider.bookingRequest = createRequest._id;
    userCustomer.bookingRequest = createRequest._id;

    await findLocalProvider.save();
    await userCustomer.save();

    // const localProviderDetail =

    return res.status(201).json(
      new ApiRes(
        201,
        {
          Booking: createRequest,
          localProvider: findLocalProvider,
          customer: userCustomer,
        },
        "Request Created SuccessFully",
      ),
    );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const requestStatus = async (req, res) => {
  try {
    const { isAccepted, jobStatus, bookingDate, status, isPayment, isCancel } =
      req.body;

    const checkUser = await localProviderModel.findById(req?.user);
    if (!checkUser) throw new ApiErrors(400, "Local Provider not found");

    if (!checkUser.bookingRequest)
      throw new ApiErrors(
        400,
        "User find but not have any kind of Booking request",
      );

    const findBookingRequest = await bookingRequestModel.findById(
      checkUser.bookingRequest._id,
    );

    if (!findBookingRequest)
      throw new ApiErrors(400, "Booking request not find");

    findBookingRequest.isAccepted = isAccepted
      ? isAccepted
      : findBookingRequest.isAccepted;
    findBookingRequest.jobStatus = jobStatus
      ? jobStatus
      : findBookingRequest.jobStatus;
    findBookingRequest.bookingDate = bookingDate
      ? bookingDate
      : findBookingRequest.bookingDate;
    findBookingRequest.status = status ? status : findBookingRequest.status;
    findBookingRequest.isPayment = isPayment
      ? isPayment
      : findBookingRequest.isPayment;
    findBookingRequest.isCancel = isCancel
      ? isCancel
      : findBookingRequest.isCancel;

    await findBookingRequest.save();

    return res
      .status(200)
      .json(
        new ApiRes(200, findBookingRequest, "Your Request Update Successfully"),
      );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const finalPostLocalProvider = async (req, res) => {
  try {
    const { workNotes } = req.body;
    if (!workNotes) throw new ApiErrors(400, "All Fields are required");

    const checkUser = await localProviderModel.findById(req?.user);
    if (!checkUser) throw new ApiErrors(400, "Local Provider not found");

    if (!checkUser.bookingRequest)
      throw new ApiErrors(
        400,
        "User find but not have any kind of Booking request",
      );

    const findBookingRequest = await bookingRequestModel.findById(
      checkUser.bookingRequest._id,
    );

    if (!findBookingRequest)
      throw new ApiErrors(400, "Booking request not found");

    const findCustomer = await UserModel.findById(
      findBookingRequest.customer._id,
    );

    if (!findCustomer) throw new ApiErrors(400, "Customer not found");

    checkUser.servicesHistory.push(findBookingRequest._id);
    findCustomer.servicesHistory.push(findBookingRequest._id);

    checkUser.bookingRequest = null;
    findCustomer.bookingRequest = null;

    const beforeImagePath = req?.files?.BeforeWork[0]?.path;
    const afterImagePath = req?.files?.afterWork[0]?.path;

    if (!beforeImagePath || !afterImagePath)
      throw new ApiErrors(400, "Image not found try to re-upload");

    const BeforeWork = await uploadOnCloudinary(beforeImagePath);
    const afterWork = await uploadOnCloudinary(afterImagePath);

    if (!BeforeWork || !afterWork) throw new ApiErrors(400, "Image Upload");

    findBookingRequest.workNotes = workNotes;
    findBookingRequest.BeforeWork = BeforeWork.secure_url;
    findBookingRequest.afterWork = afterWork.secure_url;
    findBookingRequest.jobStatus = "Completed";
    findBookingRequest.status = "completed";
    findBookingRequest.isPayment = true;

    await findBookingRequest.save();
    await findCustomer.save();
    await checkUser.save();

    return res.status(200).json(
      new ApiRes(
        200,
        {
          Booking: findBookingRequest,
          localProvider: checkUser,
          Customer: findCustomer,
        },
        "Finally job is completed",
      ),
    );
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

const reviewLocalProvider = async (req, res) => {
  try {
    const { rating } = req.body;

    if (!rating.rating || !rating.comment)
      throw new ApiErrors(400, "Rating and comment needed");

    if (!rating) throw new ApiErrors(400, "All field are required");

    const checkUser = await UserModel.findById(req?.user);
    if (!checkUser) throw new ApiErrors(400, "Local Provider not found");

    if (!checkUser.bookingRequest)
      throw new ApiErrors(
        400,
        "User find but not have any kind of Booking request",
      );

    const findBookingRequest = await bookingRequestModel.findById(
      checkUser.bookingRequest._id,
    );

    if (!findBookingRequest)
      throw new ApiErrors(400, "Booking request not find");

    if (findBookingRequest.review)
      throw new ApiErrors(400, "Already you give a rating");

    findBookingRequest.review = rating;

    await findBookingRequest.save();

    return res
      .status(201)
      .json(new ApiRes(201, findBookingRequest, "Rating gives successfully"));
  } catch (error) {
    throw new ApiErrors(500, `${error}`);
  }
};

export {
  createBookingRequest,
  requestStatus,
  finalPostLocalProvider,
  reviewLocalProvider,
};
