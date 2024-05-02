// import the boards model
const Board = require("../models/boardSchema");

// get all boards
const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({});
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// get a specific board
const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params._id });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// create a new board
const createBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const newBoard = new Board({
      title: req.body.title,
      description: req.body.description,
      user: userId,
    });
    const savedBoard = await newBoard.save();
    res
      .status(201)
      .json({ message: "Board created successfully", board: savedBoard });
  } catch (err) {
    res.status(500).json({ error: `Error creating board: ${err.message}` });
  }
};

// update info about a board
const updateBoard = async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBoard);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// delete a board
const deleteBoard = async (req, res) => {
  try {
    const deletedBoard = await Board.deleteOne({ _id: req.params._id });
    if (deletedBoard.deletedCount === 1) {
      res.status(200).json({ message: "Board deleted" });
    } else {
      res.status(404).json({ message: "Board not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all boards belonging to a specific user
// Will be used to only show the users the boards that are theirs
const getBoardByUser = async (req, res) => {
  try {
    // We can get the userId from the URL
    const userId = req.params.userId;

    // If the userId is not provided, return an error
    if (!userId) {
      return res.status(401).json({ error: "User ID is required" });
    }

    // Find all the boards that belong to the user
    const userBoards = await Board.find({
      user: userId,
    });

    res.status(200).json(userBoards);
  } catch (err) {
    console.error("Failed to get boards for user:", err);
    res.status(500).json({ message: err });
  }
};

const getDraftBoard = async (req, res) => {
  try {
    const draftBoard = await Board.findOne({ title: "Drafts" });
    res.status(200).json(draftBoard);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// export the functions
module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardByUser,
  getDraftBoard,
};
