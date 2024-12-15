import mongoose from "mongoose";
import validator from "validator";


const contactSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: [true, "Subject is Required!"],
    minLength: [5, "Subject must contain at least 5 characters!"],
  },
  message: {
    type: String,
    required: [true, "Message is Required!"],
    minLength: [10, "Message must contain at least 10 characters!"],
  },
});

export const ContactUs = mongoose.model("Message", contactSchema);