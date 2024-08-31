const express = require('express');            // Importing Express framework
const { check } = require('express-validator'); // Importing validation functions from express-validator
const { registerAdmin, updateAdmin, getAdmin, getHostel, deleteAdmin } = require('../controllers/adminController'); // Importing controller functions
const router = express.Router();                // Creating a new router object

// @route  POST api/admin/register-admin
// @desc   Register admin
// @access Public
router.post('/register-admin', [              // Route for registering a new admin
    check('name', 'Name is required').not().isEmpty(),           // Validation: Name is required and cannot be empty
    check('email', 'Please include a valid email').isEmail(),    // Validation: Email must be a valid email format
    check('father_name', 'Father name is required').not().isEmpty(), // Validation: Father name is required and cannot be empty
    check('contact', 'Enter a valid contact number').isLength(11), // Validation: Contact number must be 11 characters long
    check('address', 'Address is required').not().isEmpty(),      // Validation: Address is required and cannot be empty
    check('dob', 'Date of birth is required').not().isEmpty(),    // Validation: Date of birth is required and cannot be empty
    check('cnic', 'CNIC is required').isLength(13),               // Validation: CNIC must be 13 characters long
    check('password', 'Password is required').isLength(8)        // Validation: Password must be at least 8 characters long
], registerAdmin);                              // Controller function to handle registration

// @route  POST api/admin/update-admin
// @desc   Update admin
// @access Public
router.post('/update-admin', [                // Route for updating an admin's details
    check('name', 'Name is required').not().isEmpty(),           // Validation: Name is required and cannot be empty
    check('email', 'Please include a valid email').isEmail(),    // Validation: Email must be a valid email format
    check('contact', 'Enter a valid contact number').isLength(11), // Validation: Contact number must be 11 characters long
    check('address', 'Address is required').not().isEmpty(),      // Validation: Address is required and cannot be empty
    check('dob', 'Date of birth is required').not().isEmpty(),    // Validation: Date of birth is required and cannot be empty
    check('cnic', 'CNIC is required').isLength(13),               // Validation: CNIC must be 13 characters long
    check('hostel', 'Hostel is required').not().isEmpty(),        // Validation: Hostel is required and cannot be empty
    check('password', 'Password is required').isLength(8)        // Validation: Password must be at least 8 characters long
], updateAdmin);                              // Controller function to handle update

// @route  POST api/admin/get-admin
// @desc   Get admin by email
// @access Public
router.post('/get-admin', [                // Route for fetching admin details by email
    check('isAdmin', 'isAdmin is required').notEmpty(), // Validation: isAdmin field is required and cannot be empty
    check('token', 'Token is required').notEmpty(),     // Validation: Token is required and cannot be empty
], getAdmin);                              // Controller function to handle fetching admin details

// @route  POST api/admin/get-hostel
// @desc   Get hostel by name
// @access Public
router.post('/get-hostel', [              // Route for fetching hostel details by ID
    check('id', 'Id is required').notEmpty(),  // Validation: Id field is required and cannot be empty
], getHostel);                            // Controller function to handle fetching hostel details

// @route  POST api/admin/delete-admin
// @desc   Delete admin
// @access Public
router.post('/delete-admin', [            // Route for deleting an admin
    check('email', 'Please include a valid email').isEmail()  // Validation: Email must be a valid email format
], deleteAdmin);                          // Controller function to handle deletion

module.exports = router;                  // Exporting the router object for use in other parts of the application
