const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// Middleware function to verify the token
const auth = async (req, res, next) => {
  const token = req.cookies["authToken"];

  if (!token) {
    return res.status(401).json({
      error: "Authentication token missing. Please log in to continue.",
    });
  }

  // Verify the token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(verified._id).select("-password");
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }
    return res
      .status(401)
      .json({ error: "Invalid Token. Please log in again." });
  }
};

module.exports = auth;
