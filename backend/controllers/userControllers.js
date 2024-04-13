// import the user model
const User = require("../models/userSchema");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const showUsers = await User.find({});
    res.json(showUsers);
  } catch (err) {
    res.json({ message: err });
  }
};

// get a specific user
const getUser = async (req, res) => {
  try {
    const showUsers = await User.findOne({ name: req.params.name });
    res.json(showUsers);
  } catch (err) {
    res.json({ message: err });
  }
};

// create a new user
const createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    department: req.body.department,
    university: req.body.university,
    position: req.body.position,
  });
  try {
    const saveUser = await newUser.save();
    res.send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// update info about a user
const updateUser = async (req, res) => {
  // get which info to update and the new input
  const oldInfo = req.body.oldInfo;
  const newInput = req.body.newInput;

  try {
    const user = await User.findOne({ email: req.params.email });

    // if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // get the info to be updated and update it
    // switch (oldInfo) {
    //   case "name":
    //     user.name = newInput;
    //     break;
    //   case "surname":
    //     user.surname = newInput;
    //     break;
    //   case "department":
    //     user.department = newInput;
    //     break;
    //   case "university":
    //     user.university = newInput;
    //     break;
    //   case "position":
    //     user.position = newInput;
    //     break;
    //   default:
    //     res.status(400).json({ message: "Invalid update" });
    // }

    // save the updated card
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    // catch any errors
    res.status(400).send("failed");
  }
};

// delete a user
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ email: req.params.email });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// export the functions
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
