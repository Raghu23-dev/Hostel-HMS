const express = require('express');                  // Importing the Express framework
const router = express.Router();                     // Creating a new router object
const { check } = require('express-validator');     // Importing validation functions from express-validator
const { 
    registerSuggestion, 
    getbyhostel, 
    getbystudent, 
    updateSuggestion 
} = require('../controllers/suggestionController'); // Importing controller functions

// @route   POST api/suggestion/register
// @desc    Register a new suggestion
// @access  Public
router.post('/register', [                          // Route for registering a new suggestion
    check('student', 'Student is required').not().isEmpty(), // Validation: Student must be provided and not empty
    check('hostel', 'Hostel is required').not().isEmpty(),   // Validation: Hostel must be provided and not empty
    check('title', 'Title is required').not().isEmpty(),     // Validation: Title must be provided and not empty
    check('description', 'Description is required').not().isEmpty() // Validation: Description must be provided and not empty
], registerSuggestion);                            // Controller function to handle suggestion registration

// @route   POST api/suggestion/hostel
// @desc    Get all suggestions by hostel ID
// @access  Public
router.post('/hostel', [                          // Route for retrieving suggestions by hostel ID
    check('hostel', 'Hostel is required').not().isEmpty() // Validation: Hostel ID must be provided and not empty
], getbyhostel);                                 // Controller function to get suggestions based on hostel ID

// @route   POST api/suggestion/student
// @desc    Get all suggestions by student ID
// @access  Public
router.post('/student', [                         // Route for retrieving suggestions by student ID
    check('student', 'Student is required').not().isEmpty() // Validation: Student ID must be provided and not empty
], getbystudent);                                // Controller function to get suggestions based on student ID

// @route   POST api/suggestion/update
// @desc    Update a suggestion
// @access  Public
router.post('/update', [                          // Route for updating a suggestion
    check('id', 'Id is required').not().isEmpty(),  // Validation: Suggestion ID must be provided and not empty
    check('status', 'Status is required').not().isEmpty() // Validation: Status must be provided and not empty
], updateSuggestion);                            // Controller function to handle updating a suggestion

module.exports = router;                           // Exporting the router object to be used in other parts of the application
