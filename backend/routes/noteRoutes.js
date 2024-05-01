const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  uploadJson,
  getNoteByBoardName,
  getNoteByUser,
} = require("../controllers/noteControllers");
const auth = require("../middleware/verifyToken");

// routes
router.get("/", getAllNotes);
router.get("/:_id", getNote);
router.get("/name/:boardName", getNoteByBoardName);
router.get("/user/:userId", auth, getNoteByUser);
router.post("/", createNote);
router.put("/:_id", updateNote);
router.delete("/:_id", deleteNote);
router.post("/upload", auth, uploadJson)

module.exports = router;
