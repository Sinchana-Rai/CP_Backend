import { ContactUs } from "../models/contactSchema.js";

//http://localhost:5000/contactus/sendmessage

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    await ContactUs.create({ name, email, subject, message });
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errorMessage = "";
      if (error.errors.name) {
        errorMessage += error.errors.name.message + " ";
      }
      if (error.errors.email) {
        errorMessage += error.errors.email.message + " ";
      }
      if (error.errors.subject) {
        errorMessage += error.errors.subject.message + " ";
      }
      if (error.errors.message) {
        errorMessage += error.errors.message.message + " ";
      }
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unknown Error",
    });
  }
};

//http://localhost:5000/contactus/:id
// eg: http://localhost:5000/contactus/675c666044cb57654040ead4

export const deleteMessage = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedMessage = await ContactUs.findByIdAndDelete(id);
      if (!deletedMessage) {
        return res.status(404).json({ error: 'Message not found' });
    }

     res.status(200).json({
       success: true,
       message: "Message deleted successfully", });
    } catch (error) {
        console.error('Error getting Message:', error);
}
};

