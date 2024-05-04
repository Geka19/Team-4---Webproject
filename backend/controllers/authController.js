const User = require("../models/userSchema.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function to register a new user
const registerUser = async (req, res) => {
  try {
    // Check for validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send back validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
       // If email is already registered, prevent further registration
      return res.status(400).json({ error: "Email already exists" });
    }

    // Generate salt, hash the password and create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Persist the user to the database and send a response
    const savedUser = await user.save();
    res
      .status(201)
      .json({ userId: savedUser._id, message: "User registered successfully" });
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  try {
    // Check for validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send back validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the user in the database using the email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // If user is not found, send back an error
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Verify the password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      // If password is invalid, send back an error
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Set a cookie with the JWT token and send a response
    res.cookie("auth-token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 3600000),
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to log out a user
const logoutUser = async (req, res) => {
  try {
    // Clear the JWT token cookie
    res.clearCookie("auth-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Send a success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get the role of the current user
const getUserRole = async (req, res) => {
  try {
    // Send back the user's role
    res.status(200).json({
      userRole: req.user.role,
      message: "Role fetched",
    });
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to verify a user's token and return their details
const validateToken = async (req, res) => {
  try {
    // Get the token from the cookies
    const token = req.cookies["auth-token"];
    if (!token) {
      //  If no token is provided, send back an error
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify the token and find the user in the database
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (!user) {
      // If user is not found, send back an error
      return res.status(404).json({ error: "User not found" });
    }

    // Send back the user's details
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: "Token verified successfully",
    });
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserRole,
  validateToken,
};
