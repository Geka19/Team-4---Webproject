const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  getNoteByUser,
} = require("../controllers/noteControllers");
const auth  = require("../middleware/verifyToken");

// routes for notes
router.get("/", getAllNotes);
router.get("/:_id", getNote);
router.get("/user/:userId", getNoteByUser);
router.post("/upload", auth, createNote)
router.put("/:_id", updateNote);
router.delete("/:_id", deleteNote);

module.exports = router;
