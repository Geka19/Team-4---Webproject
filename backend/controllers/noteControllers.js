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
    const showNotes = await Note.findOne({ name: req.params.name });
    res.json(showNotes);
  } catch (err) {
    res.json({ message: err });
  }
};

// create a new Note
const createNote = async (req, res) => {
  const newNote = new Note({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    department: req.body.department,
    university: req.body.university,
    position: req.body.position,
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
  // get which info to update and the new input
  const oldInfo = req.body.oldInfo;
  const newInput = req.body.newInput;

  try {
    const Note = await Note.findOne({ email: req.params.email });

    // if Note not found
    if (!Note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // get the info to be updated and update it
    // switch (oldInfo) {
    //   case "name":
    //     Note.name = newInput;
    //     break;
    //   case "surname":
    //     Note.surname = newInput;
    //     break;
    //   case "department":
    //     Note.department = newInput;
    //     break;
    //   case "university":
    //     Note.university = newInput;
    //     break;
    //   case "position":
    //     Note.position = newInput;
    //     break;
    //   default:
    //     res.status(400).json({ message: "Invalid update" });
    // }

    // save the updated card
    const updatedNote = await Note.save();

    res.json(updatedNote);
  } catch (err) {
    // catch any errors
    res.status(400).send("failed");
  }
};

// delete a Note
const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.deleteOne({ email: req.params.email });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// export the functions
module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
