const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// Middleware function to verify the jwt token
const auth = async (req, res, next) => {
  const token = req.cookies["auth-token"];

  // If no token is provided, send back an error
  if (!token) {
    return res.status(401).json({
      error: "Authentication token missing. Please log in to continue.",
    });
  }

  // Verify the token
  try {
    // Verify the token with the secret key
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(verified._id).select("-password");
    next();
  } catch (error) {
    // If the token is expired or invalid, send back an error
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }
    // If the token is invalid, send back an error
    return res
      .status(401)
      .json({ error: "Invalid Token. Please log in again." });
  }
};

module.exports = auth;
