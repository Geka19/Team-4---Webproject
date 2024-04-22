const express = require("express");
const router = express.Router();
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  uploadJson,
} = require("../controllers/noteControllers");

// routes
router.get("/", getAllNotes);

router.get("/:_id", getNote);

router.post("/", createNote);

router.put("/:_id", updateNote);

router.delete("/:_id", deleteNote);

router.post("/upload", uploadJson)

module.exports = router;
