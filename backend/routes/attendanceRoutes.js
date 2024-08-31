const express = require('express');           // Importing the Express framework
const router = express.Router();              // Creating a new router object
const { check } = require('express-validator'); // Importing validation functions from express-validator
const { markAttendance, getAttendance, updateAttendance, getHostelAttendance } = require('../controllers/attendanceController'); // Importing controller functions

// @route   POST api/attendance/mark
// @desc    Mark attendance
// @access  Public
router.post('/mark', [                      // Route for marking attendance
    check('student', 'Student is required').not().isEmpty(),  // Validation: Student ID is required and cannot be empty
    check('status', 'Status is required').not().isEmpty()    // Validation: Attendance status is required and cannot be empty
], markAttendance);                        // Controller function to handle marking attendance

// @route   GET api/attendance/get
// @desc    Get attendance
// @access  Public
router.post('/get', [                      // Route for fetching attendance data for a specific student
    check('student', 'Student is required').not().isEmpty()  // Validation: Student ID is required and cannot be empty
], getAttendance);                        // Controller function to handle fetching attendance

// @route   PUT api/attendance/update
// @desc    Update attendance
// @access  Public
router.put('/update', [                   // Route for updating attendance data
    check('student', 'Student is required').not().isEmpty(),  // Validation: Student ID is required and cannot be empty
    check('status', 'Status is required').not().isEmpty()    // Validation: Attendance status is required and cannot be empty
], updateAttendance);                    // Controller function to handle updating attendance

// @route   GET api/attendance/getHostelAttendance
// @desc    Get hostel attendance
// @access  Public
router.post('/getHostelAttendance', [    // Route for fetching attendance data for a specific hostel
    check('hostel', 'Hostel is required').not().isEmpty()   // Validation: Hostel ID is required and cannot be empty
], getHostelAttendance);                // Controller function to handle fetching hostel attendance

module.exports = router;                // Exporting the router object to be used in other parts of the application
