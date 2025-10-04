const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Use Routes
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
