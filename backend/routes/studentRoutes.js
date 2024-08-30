const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { 
    registerStudent, 
    getStudent, 
    getAllStudents, 
    updateStudent, 
    deleteStudent, 
    csvStudent 
} = require('../controllers/studentController');

// @route  POST api/student/register-student
// @desc   Register student
// @access Public
router.post('/register-student', [
    check('name', 'Name is required').notEmpty(),
    check('cms_id', 'CMS ID of at least 6 digits is required').isLength({ min: 6 }),
    check('room_no', 'Room number is required and must be 3 digits').isLength({ min: 3, max: 3 }),
    check('batch', 'Batch is required').notEmpty(),
    check('dept', 'Department is required').notEmpty(),
    check('course', 'Course is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').notEmpty(),
    check('contact', 'Enter a valid 11-digit contact number').isLength({ min: 11, max: 11 }),
    check('address', 'Address is required').notEmpty(),
    check('dob', 'Date of birth is required').notEmpty(),
    check('cnic', 'Enter a valid 13-digit CNIC').isLength({ min: 13, max: 13 }),
    check('hostel', 'Hostel is required').notEmpty(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
], async (req, res) => {
    // Handling validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Calling the controller function
    try {
        await registerStudent(req, res);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// @route  POST api/student/get-student
// @desc   Get student by CMS ID
// @access Public
router.post('/get-student', [
    check('isAdmin', 'isAdmin is required').notEmpty(),
    check('token', 'You do not have a valid token').notEmpty()
], getStudent);

// @route  POST api/student/get-all-students
// @access Public
router.post('/get-all-students', [
    check('hostel', 'Hostel is required').notEmpty()
], getAllStudents);

// @route  POST api/student/update-student
// @desc   Update student
// @access Public
router.post('/update-student', [
    check('cms_id', 'CMS ID is required').notEmpty(),
    check('room_no', 'Room number is required').notEmpty(),
    check('batch', 'Batch is required').notEmpty(),
    check('dept', 'Department is required').notEmpty(),
    check('course', 'Course is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('father_name', 'Father name is required').notEmpty(),
    check('contact', 'Contact is required').notEmpty(),
    check('address', 'Address is required').notEmpty(),
    check('dob', 'Date of birth is required').notEmpty(),
    check('cnic', 'CNIC is required').notEmpty(),
    check('user', 'User is required').notEmpty(),
    check('hostel', 'Hostel is required').notEmpty()
], updateStudent);

// @route  DELETE api/student/delete-student
// @desc   Delete student
// @access Public
router.delete('/delete-student', [
    check('id', 'Enter a valid ID').notEmpty(),
], deleteStudent);

// @route  POST api/student/csv
// @desc   Get CSV of students
// @access Public
router.post('/csv', [
    check('hostel', 'Hostel is required').notEmpty()
], csvStudent);

module.exports = router;
