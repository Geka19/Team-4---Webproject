// Load environment variables
require("dotenv").config();

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import database connection function
const connectDB = require("./config/connectDB");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const boardRoutes = require("./routes/boardRoutes");

// Create an Express app
const app = express();

// Set up middleware
app.use(express.json());
app.use(cookieParser());

// Set up CORS
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/boards", boardRoutes);

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
let server = app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

// Export the server
module.exports = server;
