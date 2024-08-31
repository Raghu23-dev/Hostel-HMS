const jwt = require('jsonwebtoken');       // Importing the jsonwebtoken library to handle JWT operations
const dotenv = require('dotenv');         // Importing dotenv to manage environment variables
dotenv.config();                          // Loading environment variables from a .env file

// Function to generate a JWT token
// @param {string} userId - The unique identifier for the user
// @param {boolean} isAdmin - Flag indicating if the user is an admin
// @returns {string} - The generated JWT token
exports.generateToken = (userId, isAdmin) => {
  return jwt.sign(
    { userId, isAdmin },                 // Payload: Data to be included in the token
    process.env.JWT_SECRET,              // Secret key used to sign the token, retrieved from environment variables
    { expiresIn: '1h' }                 // Options: Token expiration time set to 1 hour
  );
};

// Function to verify a JWT token
// @param {string} token - The JWT token to be verified
// @returns {object} - The decoded payload of the token
exports.verifyToken = (token) => {
  return jwt.verify(
    token,                              // Token to be verified
    process.env.JWT_SECRET               // Secret key used to verify the token, retrieved from environment variables
  );
};
