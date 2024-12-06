import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currencyChoice: {
      type: String,
      required: false,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "USD",
    },
    dateFormat: {
      type: String,
      required: false,
      enum: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD"],
      default: "MM/DD/YYYY",
    },
    timeFormat: {
      type: String,
      required: false,
      enum: ["12", "24"],
      default: "12",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
