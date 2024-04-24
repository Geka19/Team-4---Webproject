// import the Note model
const Note = require("../models/noteSchema");

// get all Notes
const getAllNotes = async (req, res) => {
  try {
    const showNotes = await Note.find({});
    res.json(showNotes);
  } catch (err) {
    res.json({ message: err });
  }
};

// get a specific Note
const getNote = async (req, res) => {
  try {
    const showNotes = await Note.findOne({ _id: req.params._id });
    res.json(showNotes);
  } catch (err) {
    res.json({ message: err });
  }
};

// create a new Note
const createNote = async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    user: req.body.user,
    tags: req.body.tags,
    content: req.body.content,
    board: req.body.board,
    visibility: req.body.visibility,
  });
  try {
    const saveNote = await newNote.save();
    res.send(saveNote);
  } catch (err) {
    res.status(400).send(err);
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
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// delete a Note
const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.deleteOne({ _id: req.params._id });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const uploadJson = async (req, res) => {
  const data = req.body;

  // Get the title and content properties
  if (data.title && data.content) {
    try {
      const tags = data.tags || [];

      let newNote = new Note({
        title: data.title,
        content: data.content,
        board: data.board,
        tags: data.tags,
      });
      await newNote.save(); // Save the note to the database
      res.status(200).json({ message: "Note uploaded successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving note to database" });
    }
  } else {
    res.status(400).json({ error: "Invalid JSON structure" });
  }
};

const getNoteByBoardName = async (req, res) => {
  try {
    const showNotes = await Note.find({ board: req.params.boardName });
    res.json(showNotes);
  } catch (err) {
    res.json({ message: err });
  }
};

// export the functions
module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  uploadJson,
  getNoteByBoardName,
};
