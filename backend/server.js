const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/connectDB");
// const ejs = require("ejs");

// initiate express app
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors()); // Will enable CORS for all files

// connect to database
connectDB();

// config express app
// app.use('/', express.static("public"));

// app.use("/", (req, res) => {
//   res.end("hello there");
// });

// user routes
app.use("/api/users", require("./routes/userRoutes"));

// note routes
app.use("/api/notes", require("./routes/noteRoutes"));

// Board routes
app.use("/api/boards", require("./routes/boardRoutes"));

// listen on port
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
