const User = require("../models/userSchema");

// Gets all users from the database, excluding their passwords, and returns the list of users.
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Error getting users" });
  }
};

// Gets a single user by their ID, excluding their password, and returns the user information.
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Error getting user" });
  }
};

// Updates a user by their ID and returns the updated user information.
const updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    // Validate input data
    if (!username || !email || !role) {
      return res
        .status(400)
        .json({ error: "Username, email, and role are required fields" });
    }
    // Update the user's information based on the ID and return the updated user.
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { username, email, role } },
      { new: true }
    ).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
};

// Deletes a user by their ID and returns a message indicating the deletion was successful.
const deleteUser = async (req, res) => {
  try {
    // Delete the user based on the ID.
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    // Log and send back any errors
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
