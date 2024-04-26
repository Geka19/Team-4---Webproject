require("dotenv").config();

const express = require("express");
const cors = require('cors');
const connectDB = require("./config/connectDB");

const cookieParser = require("cookie-parser");

// initiate express app
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions)); // Will enable CORS for all files
app.use(cookieParser());

// connect to database
connectDB();

// config express app
// app.use('/', express.static("public"));

// app.use("/", (req, res) => {
//   res.end("hello there");
// });

// user routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// note related routes
app.use("/api/notes", require("./routes/noteRoutes"));

// Board routes
app.use("/api/boards", require("./routes/boardRoutes"));

// Set the port
const PORT = process.env.PORT || 3000;

// listen on port
let server = app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.connection.close(); 
  console.log("MongoDB connection closed.");
  process.exit(0); 
});

module.exports = server;

