import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
    trim: true,
  },
});

const localProviderSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone_no: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/da9c3vejh/image/upload/v1772457451/307ce493-b254-4b2d-8ba4-d12c080d6651_ichav7.jpg",
    },
    role: {
      type: String,
      enum: ["localProvider"],
      required: true
    //   default: "loacl provider",
    },
    city: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken:{
        type: String,
        default: ""
    },

    // Job Related
    bookingRequest: {
      // Here Store a booking request details ID came from user.
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookingDetails",
    },
    servicesHistory: [
      // Here Store LocalService Provider last jobs History.,
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookingDetails",
      },
    ],
    category: {
      // category where they are speacialized.
      type: String,
      required: true,
    },
    address: addressSchema, // loacl Provider location where they provide our services.
    experience: {
      type: Number,
      default: 0,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    }, // average rating
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const localProviderModel = mongoose.model("localProvider", localProviderSchema);

export { localProviderModel };
