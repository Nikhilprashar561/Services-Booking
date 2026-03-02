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

const UserSchema = new mongoose.Schema(
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
      default: "https://res.cloudinary.com/da9c3vejh/image/upload/v1772457451/307ce493-b254-4b2d-8ba4-d12c080d6651_ichav7.jpg",
    },
    role: {
      type: String,
      enum: ["customer"],
      default: "customer",
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

    // Job Related

    address: addressSchema, // customer location where they are lived.

    bookingRequest: { // Here Store a booking request details ID came from Booking Model.
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookingDetails",
    },

    servicesHistory: [
      // Here Store yours LocalService you take last jobs History.
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookingDetails",
      },
    ],
  },
  { timestamps: true },
);

const UserModel = mongoose.model("user", UserSchema);

export { UserModel };
