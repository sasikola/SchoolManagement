const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const authMiddleware = require("../MiddleWares/authMiddleware");
const router = express.Router();

// REGISTER

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isStudent, isTeacher } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      isStudent,
      isTeacher,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
});

// LOGIN

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ error: "Invalid Email", success: false });
//     }

//     // Compare the provided password with the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ error: "Invalid Password", success: false });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id }, "your-secret-key", {
//       expiresIn: "1h", // Token expires in 1 hour
//     });
//     res.json({ token, message: "User loggedin successfully", success: true });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: "Error logged in " });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid Email", success: false });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Incorrect Password", success: false });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, "your-secret-key", {
      expiresIn: "1h", // Token expires in 1 hour
    });
    res.json({ token, message: "User logged in successfully", success: true });
  } catch (error) {
    console.error("Error logging in:", error); // Log detailed error message
    res.status(500).json({ error: "Unexpected error. Please try again.", success: false });
  }
});




router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({ message: "No User Found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false });
  }
});

module.exports = router;
