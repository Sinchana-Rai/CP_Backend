import { User } from "../models/userSchema.js";

// Admin Login
// POST http://localhost:5000/user/admin
export const adminLogin = async (req, res) => {
    try {
      const { adminKey } = req.body;
  
  
      if (!adminKey) {
        return res.status(400).json({
          success: false,
          message: "Admin key is required.",
        });
      }

      if (adminKey !== "1234") {
        return res.status(401).json({
          success: false,
          message: "Invalid admin key.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Admin login successful!",
      });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };


// Create a new user
// POST http://localhost:5000/user/newuser
export const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const newUsr = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ message: "User created successfully", user: newUsr });
  } catch (error) {
    console.error("Error creating new user:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Retrieve all users
// GET http://localhost:5000/user/allusers

export const allUsers = async (req, res) => {
  try {
    const Users = await User.find();
    // res.status(200).json(Users);
    res.status(200).json({
      message: "Users retrieved successfully",
      data: Users, 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update a user
// http://localhost:5000/user/update/:id

export const updateUser = async (req, res) => {
   
    const userId = req.params.id;
    const { name, email, password } = req.body;

    try {
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: { name, email, password } 
            },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
         res.status(200).json({ message: 'User updated', user: updatedUser });
        } catch (error) {
            console.error('Error getting user:', error);
}

  };


// Delete a user
// DELETE http://localhost:5000/user/:id

export const deleteUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted", user: deleteUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
