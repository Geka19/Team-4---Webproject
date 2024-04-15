const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
  },
  board: [
    {
      type: String,
    },
  ],
  role: {
    type: String,
    required: true,
    enum: ["Admin", "User"],
    default: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
