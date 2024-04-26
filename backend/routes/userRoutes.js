const express = require("express");
const router = express.Router();

// Importing user controller functions
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUsers); 
router.get("/:id", getUser); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 

module.exports = router;
