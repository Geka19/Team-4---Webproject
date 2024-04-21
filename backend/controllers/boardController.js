// import the boards model
const Board = require("../models/boardSchema");

// get all boards
const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({});
    res.json(boards);
  } catch (err) {
    res.json({ message: err });
  }
};

// get a specific board
const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params._id });
    res.json(board);
  } catch (err) {
    res.json({ message: err });
  }
};

// create a new board
const createBoard = async (req, res) => {
  try {
    const newBoard = new Board({
        title: req.body.title,
        description: req.body.description,
    });
    const savedBoard = await newBoard.save();
    res
      .status(201)
      .json({ message: "Card created successfully", card: savedBoard });
  } catch (err) {
    res.status(500).json({ error: `Error creating card: ${err.message}` });
  }
};

// update info about a board
const updateBoard = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params._id, // id of the note to update
      req.body, // new data
      { new: true } // to return the updated data
    );
    res.json(updatedBoard);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// delete a board
const deleteBoard = async (req, res) => {
  try {
    const deleteBoard = await Board.deleteOne({ _id: req.params._id });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// export the functions
module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
