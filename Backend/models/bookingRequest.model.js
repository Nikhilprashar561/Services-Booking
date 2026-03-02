import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const bookingRequestSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "localProvider",
      required: true,
    },

    serviceCategory: {
      type: String,
      required: true,
      trim: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    jobStatus: {
      type: String,
      enum: [
        "Rejuested",
        "Accepted",
        "On the way",
        "in process",
        "Completed",
        "Cancelled",
      ],
      default: "",
    },
    bookingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled"],
      default: "pending",
    },
    isPayment: {
      type: Boolean,
      default: false,
    },
    isCancel: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    BeforeWork: [
      {
        type: String,
      },
    ],
    afterWork: [
      {
        type: String,
      },
    ],

    workNotes: {
      type: String,
      trim: true,
    },

    review: reviewSchema,
  },
  {
    timestamps: true,
  },
);

const bookingRequestModel = mongoose.model(
  "bookingDetails",
  bookingRequestSchema,
);

export { bookingRequestModel };
