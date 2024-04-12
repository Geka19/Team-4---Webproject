const path = require("path");
const dotenv = require("dotenv");
dotenv.config(); // load env variables
const express = require("express");
const PORT = process.env.PORT || 3000;
const connectDB = require("./connectDB");
//const ejs = require("ejs");

// initiate express app
const app = express();

// connect to database
// connectDB();

// config express app
//app.use('/', express.static("public"));

app.use("/", (req, res) => {
  res.end("hello there");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
