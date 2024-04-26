const dotenv = require("dotenv").config();
const Board = require("./models/boardSchema");
const connectDB = require("./config/connectDB");

connectDB();

// For populating the board database
const boards = [
  {
    title: "Zero Waste Lifestyle",
    description: "Share tips and tricks on how to live a zero waste lifestyle.",
  },
  {
    title: "Sustainable Agriculture",
    description: "Discuss methods and practices for sustainable agriculture.",
  },
];

// Save the boards to the database
Promise.all(
  boards.map((boardData) => {
    const board = new Board(boardData);
    return board.save();
  })
)
  .then((savedBoards) => {
    savedBoards.forEach((savedBoard) => {
      console.log(`Saved board: ${savedBoard.title}`);
    });
  })
  .catch((err) => console.error(err));
