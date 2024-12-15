import { User } from "../models/userSchema.js";

//create a new user 
// http://localhost:5000/user/newuser
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


// Retrieve all users using GET

// /users/allusers
// eg: [ http://localhost:5000/user/allusers ]

export const allUsers = async (req, res) => {
    try { 
        const Users = await User.find();
        res.status(200).json(Users)
       } catch (error) {
        res.status(500).json({ error: error.message });
       }
  };

//Delete a user 
// http://localhost:5000/user/:id
// eg: [http://localhost:5000/user/675cf843bd42f9e7173731ef]

export const deleteUsers = async (req, res) => {
    const userId = req.params.id;
    try {
        const deleteUser = await User.findByIdAndDelete(userId);

        if (!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }

         res.status(200).json({ message: 'User deleted', user: deleteUser });
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };


