const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [2, "Title is too short."],
    maxlength: [50, "Title is too long."],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  content: {
    type: String,
    required: true,
    minlength: [2, "Content is too short."],
    maxlength: [500, "Content is too long."],
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
    default: '66265000065976d80747f287', // This is the ID of the drafts board
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
