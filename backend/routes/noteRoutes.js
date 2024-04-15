const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");

// routes
router.get("/", getAllNotes);

router.get("/:name", getNote);

router.post("/", createNote);

router.put("/:email", updateNote);

router.delete("/:email", deleteNote);

module.exports = router;
