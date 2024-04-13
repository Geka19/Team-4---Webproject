const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

// routes
router.get("/", getAllUsers);

router.get("/:name", getUser);

router.post("/", createUser);

router.put("/:email", updateUser);

router.delete("/:email", deleteUser);

module.exports = router;
