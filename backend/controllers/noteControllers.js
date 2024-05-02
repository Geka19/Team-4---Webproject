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

      let newNote = new Note({
        title: data.title,
        content: data.content,
        board: data.board,
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

const getNoteByBoardName = async (req, res) => {
  try {
    const showNotes = await Note.find({ board: req.params.boardName });
    res.status(200).json(showNotes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getNoteByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(401).json({ error: "User ID is required" });
    }

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
  getNoteByBoardName,
  getNoteByUser,
};
