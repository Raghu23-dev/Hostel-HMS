const express = require('express');             // Importing the Express framework
const router = express.Router();                // Creating a new router object
const { check } = require('express-validator'); // Importing validation functions from express-validator
const { login, changePassword, verifySession } = require('../controllers/authController'); // Importing controller functions

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', [                       // Route for user login and token generation
    check('email', 'Please include a valid email').isEmail(),       // Validation: Email must be a valid format
    check('password', 'Password is required').not().isEmpty()       // Validation: Password is required and cannot be empty
], login);                                    // Controller function to handle login and token generation

// @route   POST api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', [            // Route for changing the user's password
    check('email', 'Please include a valid email').isEmail(),       // Validation: Email must be a valid format
    check('password', 'Old password is required').isLength({ min: 8 }),  // Validation: Old password is required and must be at least 8 characters
    check('newPassword', 'New password of more than 8 characters is required').isLength({ min: 8 })  // Validation: New password must be at least 8 characters
], changePassword);                         // Controller function to handle password change

// @route   POST api/auth/verifysession
// @desc    Verify session
// @access  Public
router.post('/verifysession', [              // Route for verifying a user session
    check('token', 'Token is required').not().isEmpty()  // Validation: Token is required and cannot be empty
], verifySession);                         // Controller function to handle session verification

module.exports = router;                    // Exporting the router object to be used in other parts of the application
