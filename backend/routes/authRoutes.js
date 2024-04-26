const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// Importing authentication middleware
const auth = require("../middleware/verifyToken");

// Importing user controller functions
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
} = require("../controllers/authController");

// Validation rules for user registration
const registerValidation = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password must be at least 8 characters long").isLength({
    min: 8,
  }),
  check("username", "Full name must be between 1 and 50 characters").isLength({
    min: 1,
    max: 50,
  }),
];

// Validation rules for user login
const loginValidation = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Routes
router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", logoutUser);
router.get("/verify", auth, verifyToken);

module.exports = router;
