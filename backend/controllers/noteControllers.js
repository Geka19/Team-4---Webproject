// import the Note model
const Note = require("../models/noteSchema");
const mongoose = require("mongoose");

// get all Notes
const getAllNotes = async (req, res) => {
  try {
    const showNotes = await Note.find({});
    res.status(200).json(showNotes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// get a specific Note
const getNote = async (req, res) => {
  try {
    const showNotes = await Note.findOne({ _id: req.params._id });
    res.status(200).json(showNotes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// create a new Note
const createNote = async (req, res) => {
  const data = req.body;

  // Get the title and content properties
  if (data.title && data.content) {
    try {
      const tags = data.tags || [];

      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({ error: "Not logged in" });
      }

      // If no board is provided, set it to the _id of the "Drafts" board
      // This might be a little to hardcoded but i think for our application it should be fine
      // Should be a more dynamic way to get the draft board ID
      const board = data.board || '66265000065976d80747f287'; 

      let newNote = new Note({
        title: data.title,
        content: data.content,
        board: board,
        tags: data.tags,
        user: userId,
      });
      await newNote.save(); // Save the note to the database
      res.status(201).json({ message: "Note uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving note to database" });
    }
  } else {
    res.status(400).json({ error: "Invalid JSON structure" });
  }
};

// update info about a Note
const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params._id, // id of the note to update
      req.body, // new data
      { new: true } // to return the updated data
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// delete a Note
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.deleteOne({ _id: req.params._id });
    if (deletedNote.deletedCount === 0) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.status(200).json({ message: "Note deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// This is for getting all the notes belonging to a specific user
// Will be used to only show the users the note that are theirs
const getNoteByUser = async (req, res) => {
  try {
    // We can get the userId from the URL
    const userId = req.params.userId;

    // If the userId is not provided, return an error
    if (!userId) {
      return res.status(401).json({ error: "User ID is required" });
    }

    // Find all the notes that belong to the user
    const userNotes = await Note.find({
      user: userId,
    });

    res.status(200).json(userNotes);
  } catch (err) {
    console.error("Failed to get notes for user:", err);
    res.status(500).json({ message: err });
  }
};

// export the functions
module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  getNoteByUser,
};
