const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [2, "Title is too short."],
    maxlength: [50, "Title is too long."],
  },
  user: {
    // comment out ref and replace type with String to test easier
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    // required: true,
  },
  tags: [String],
  content: {
    type: String,
    required: true,
    minlength: [2, "Content is too short."],
    maxlength: [500, "Content is too long."],
  },
  board: {
    type: String,
    required: true,
    default: "Drafts",
  },
  visibility: {
    required: true,
    type: String,
    enum: ["public", "private"],
    default: "private",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
