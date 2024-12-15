import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required!"],
    minLength: [2, "Name must contain at least 3 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    validate: [validator.isEmail, "Please provide valid email id!"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
    minLength: [6, "Password must contain at least 6 characters"],
    select: false,
  },
});

export const User = mongoose.model("User", userSchema);
