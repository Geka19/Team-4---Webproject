const express = require("express");
const router = express.Router();
const {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardByUser,
  getDraftBoard,
} = require("../controllers/boardController");
const auth = require("../middleware/verifyToken");

// routes for boards
router.get("/", getAllBoards);
router.get("/:_id", getBoard);
router.get("/user/:userId", getBoardByUser);
router.get("/default/draft", getDraftBoard)
router.post("/", auth, createBoard);
router.put("/:_id", updateBoard);
router.delete("/:_id", deleteBoard);

module.exports = router;
