const express = require('express');         // Importing the Express framework
const connectDB = require('./utils/conn');  // Importing the database connection utility
const cors = require('cors');              // Importing CORS middleware for handling cross-origin requests

const app = express();                     // Creating an instance of an Express application
const port = 3000;                        // Defining the port number for the server

// Establish a connection to the MongoDB database
connectDB();

// Middleware to enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json({ extended: false }));

// Defining routes for different API endpoints
app.use('/api/auth', require('./routes/authRoutes'));         // Authentication routes
app.use('/api/student', require('./routes/studentRoutes'));   // Student management routes
app.use('/api/admin', require('./routes/adminRoutes'));       // Admin management routes
app.use('/api/complaint', require('./routes/complaintRoutes')); // Complaint management routes
app.use('/api/attendance', require('./routes/attendanceRoutes')); // Attendance management routes
app.use('/api/suggestion', require('./routes/suggestionRoutes')); // Suggestion management routes

// Starting the server and listening for incoming requests on the defined port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Log a message when the server starts
});
