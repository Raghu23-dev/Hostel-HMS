const express = require('express');                // Importing the Express framework
const router = express.Router();                   // Creating a new router object
const { check } = require('express-validator');    // Importing validation functions from express-validator
const { registerComplaint, getbyhostel, getbystudent, resolve } = require('../controllers/complaintController'); // Importing controller functions

// @route   POST api/complaint/register
// @desc    Register a complaint
// @access  Public
router.post('/register', [                        // Route for registering a new complaint
    check('student', 'Student is required').not().isEmpty(),               // Validation: Student ID must be provided and not empty
    check('hostel', 'Hostel is required').not().isEmpty(),                 // Validation: Hostel ID must be provided and not empty
    check('type', 'Type is required').not().isEmpty(),                     // Validation: Type of complaint must be provided and not empty
    check('title', 'Title is required').not().isEmpty(),                   // Validation: Title of the complaint must be provided and not empty
    check('description', 'Description is required').not().isEmpty()        // Validation: Description of the complaint must be provided and not empty
], registerComplaint);                            // Controller function to handle registering a new complaint

// @route   POST api/complaint/hostel
// @desc    Get all complaints by hostel ID
// @access  Public
router.post('/hostel/', [                        // Route for getting complaints by hostel ID
    check('hostel', 'Hostel is required').not().isEmpty() // Validation: Hostel ID must be provided and not empty
], getbyhostel);                                // Controller function to retrieve complaints by hostel ID

// @route   POST api/complaint/student
// @desc    Get all complaints by student ID
// @access  Public
router.post('/student', [                       // Route for getting complaints by student ID
    check('student', 'Student is required').not().isEmpty() // Validation: Student ID must be provided and not empty
], getbystudent);                             // Controller function to retrieve complaints by student ID

// @route   POST api/complaint/resolve
// @desc    Resolve a complaint by ID
// @access  Public
router.post('/resolve', [                      // Route for resolving a complaint
    check('id', 'Complaint id is required').not().isEmpty() // Validation: Complaint ID must be provided and not empty
], resolve);                                 // Controller function to handle resolving a complaint by its ID

module.exports = router;                       // Exporting the router object to be used in other parts of the application
