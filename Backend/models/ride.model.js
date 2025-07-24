import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
      default: "pending",
    },
    duration: {
      type: Number, // could represent minutes or seconds
    },
    distance: {
      type: Number, // could represent kilometers or meters
    },
    paymentID: {
      type: String,
    },
    orderId: {
      type: String,
    },
    signature: {
      type: String, 
    },
  },
  
);

export default mongoose.model("ride", rideSchema);
