const express = require('express');                 // Importing the Express framework
const router = express.Router();                    // Creating a new router object
const { check, validationResult } = require('express-validator'); // Importing validation functions from express-validator
const { 
    registerStudent, 
    getStudent, 
    getAllStudents, 
    updateStudent, 
    deleteStudent, 
    csvStudent 
} = require('../controllers/studentController'); // Importing controller functions

// @route  POST api/student/register-student
// @desc   Register a new student
// @access Public
router.post('/register-student', [                 // Route for registering a new student
    check('name', 'Name is required').notEmpty(),                        // Validation: Name must be provided and not empty
    check('cms_id', 'CMS ID of at least 6 digits is required').isLength({ min: 6 }), // Validation: CMS ID must be at least 6 digits
    check('room_no', 'Room number is required and must be 3 digits').isLength({ min: 3, max: 3 }), // Validation: Room number must be exactly 3 digits
    check('batch', 'Batch is required').notEmpty(),                      // Validation: Batch must be provided and not empty
    check('dept', 'Department is required').notEmpty(),                  // Validation: Department must be provided and not empty
    check('course', 'Course is required').notEmpty(),                    // Validation: Course must be provided and not empty
    check('email', 'Please include a valid email').isEmail(),            // Validation: Email must be a valid email format
    check('father_name', 'Father name is required').notEmpty(),          // Validation: Father name must be provided and not empty
    check('contact', 'Enter a valid 11-digit contact number').isLength({ min: 11, max: 11 }), // Validation: Contact number must be exactly 11 digits
    check('address', 'Address is required').notEmpty(),                  // Validation: Address must be provided and not empty
    check('dob', 'Date of birth is required').notEmpty(),                // Validation: Date of birth must be provided and not empty
    check('cnic', 'Enter a valid 13-digit CNIC').isLength({ min: 13, max: 13 }), // Validation: CNIC must be exactly 13 digits
    check('hostel', 'Hostel is required').notEmpty(),                    // Validation: Hostel must be provided and not empty
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }), // Validation: Password must be at least 8 characters
], async (req, res) => {
    // Handling validation errors
    const errors = validationResult(req);                                // Collecting validation errors
    if (!errors.isEmpty()) {                                             // If there are validation errors
        return res.status(400).json({ errors: errors.array() });        // Respond with a 400 status and the errors
    }

    // Calling the controller function
    try {
        await registerStudent(req, res);                                // Calling the controller function to register the student
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message }); // Respond with a 500 status if there is a server error
    }
});

// @route  POST api/student/get-student
// @desc   Get student by CMS ID
// @access Public
router.post('/get-student', [
    check('isAdmin', 'isAdmin is required').notEmpty(),  // Validation: isAdmin field must be provided and not empty
    check('token', 'You do not have a valid token').notEmpty() // Validation: Token must be provided and not empty
], getStudent);   // Controller function to retrieve student information by CMS ID

// @route  POST api/student/get-all-students
// @desc   Get all students by hostel ID
// @access Public
router.post('/get-all-students', [
    check('hostel', 'Hostel is required').notEmpty() // Validation: Hostel ID must be provided and not empty
], getAllStudents);  // Controller function to retrieve all students for a specified hostel

// @route  POST api/student/update-student
// @desc   Update student information
// @access Public
router.post('/update-student', [
    check('cms_id', 'CMS ID is required').notEmpty(),                      // Validation: CMS ID must be provided and not empty
    check('room_no', 'Room number is required').notEmpty(),                // Validation: Room number must be provided and not empty
    check('batch', 'Batch is required').notEmpty(),                        // Validation: Batch must be provided and not empty
    check('dept', 'Department is required').notEmpty(),                    // Validation: Department must be provided and not empty
    check('course', 'Course is required').notEmpty(),                      // Validation: Course must be provided and not empty
    check('email', 'Please include a valid email').isEmail(),              // Validation: Email must be a valid email format
    check('father_name', 'Father name is required').notEmpty(),            // Validation: Father name must be provided and not empty
    check('contact', 'Contact is required').notEmpty(),                    // Validation: Contact must be provided and not empty
    check('address', 'Address is required').notEmpty(),                    // Validation: Address must be provided and not empty
    check('dob', 'Date of birth is required').notEmpty(),                  // Validation: Date of birth must be provided and not empty
    check('cnic', 'CNIC is required').notEmpty(),                          // Validation: CNIC must be provided and not empty
    check('user', 'User is required').notEmpty(),                          // Validation: User ID must be provided and not empty
    check('hostel', 'Hostel is required').notEmpty()                       // Validation: Hostel must be provided and not empty
], updateStudent);  // Controller function to update student information

// @route  DELETE api/student/delete-student
// @desc   Delete a student by ID
// @access Public
router.delete('/delete-student', [
    check('id', 'Enter a valid ID').notEmpty() // Validation: Student ID must be provided and not empty
], deleteStudent);  // Controller function to delete a student by ID

// @route  POST api/student/csv
// @desc   Get CSV of students by hostel ID
// @access Public
router.post('/csv', [
    check('hostel', 'Hostel is required').notEmpty() // Validation: Hostel ID must be provided and not empty
], csvStudent);  // Controller function to generate and return a CSV of students for a specified hostel

module.exports = router;  // Exporting the router object to be used in other parts of the application
