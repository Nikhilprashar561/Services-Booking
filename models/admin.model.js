import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
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
      unique: true,
      trim: true,
      default:""
    },
    password: {
      type: String,
      required: true,
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
    refreshToken:{
        type: String,
        default: ""
    },
    role: {
      type: String,
      required: true
    },
    verifyCode:{
        type:Number,
        required: true
    }
  },
  { timestamps: true },
);

const adminModel = mongoose.model("admin", adminSchema);

export { adminModel };
