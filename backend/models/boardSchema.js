const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  isDraft : {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Board', boardSchema);