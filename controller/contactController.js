import { ContactUs } from "../models/contactSchema.js";

// Send a message
//http://localhost:5000/contactus/sendmessage

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }
    await ContactUs.create({ name, email, subject, message });
    res.status(200).json({
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
        message: errorMessage,
      });
    }

    return res.status(500).json({
      message: "Unknown Error",
    });
  }
};


//Retrieve all messages
// http://localhost:5000/contactus/messages

export const getMessages = async (req, res) => {
  try {
    const messages = await ContactUs.find(); 

    res.status(200).json({
      message: "Messages retrieved successfully",
      data: messages, 
    });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({
      message: "An error occurred while getting messages.",
    });
  }
};

//Update a message
// http://localhost:5000/contactus/update/:id
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, email, subject, message } = req.body;
    // const updatedMessage = await ContactUs.findByIdAndUpdate(id);

    const updatedMessage = await ContactUs.findByIdAndUpdate(
      id,
      {
          $set: { name, email, subject, message  } 
      },
      { new: true, runValidators: true } 
  );

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
  }

   res.status(200).json({
     message: "Message updated successfully", updatedMessage });
  } catch (error) {
      console.error('Error getting Message:', error);
}
};


//Delete a message based on id
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
       message: "Message deleted successfully", });
    } catch (error) {
        console.error('Error getting Message:', error);
}
};



