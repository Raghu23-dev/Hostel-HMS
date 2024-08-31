const mongoose = require('mongoose');         // Importing mongoose to interact with MongoDB
require('dotenv').config();                  // Importing dotenv to manage environment variables

const mongoURI = process.env.MONGO_URI;      // Retrieving the MongoDB URI from environment variables

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,             // Option to use the new URL string parser
            useUnifiedTopology: true           // Option to use the new server discovery and monitoring engine
        });
        console.log('MongoDB connection SUCCESS'); // Log success message if connection is successful
    } catch (error) {
        // Log error message if connection fails
        console.error('MongoDB connection FAIL');
        console.error(error.message);            // Log the error message
        process.exit(1);                        // Exit the process with a failure code (1)
    }
};

module.exports = connectDB;                  // Exporting the connectDB function to be used in other modules
