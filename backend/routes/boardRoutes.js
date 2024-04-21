const express = require("express");
const router = express.Router();
const {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");

// routes
router.get("/", getAllBoards);

router.get("/:_id", getBoard);

router.post("/", createBoard);

router.put("/:_id", updateBoard);

router.delete("/:_id", deleteBoard);

module.exports = router;
