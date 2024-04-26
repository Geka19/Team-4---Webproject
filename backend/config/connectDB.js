const mongoose = require("mongoose");

// Asynchronously connects to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log the success message including the host of the database to the console
    console.log(`Connected to database: ${conn.connection.host}`);
  } catch (error) {
    // Log any errors encountered during the connection attempt
    console.error(`Error: ${error.message}`);

    // Exit the application with a failure status code
    process.exit(1);
  }
};

module.exports = connectDB;
