const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 50,
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
    min: 2,
    max: 500,
  },
  collection: {
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
