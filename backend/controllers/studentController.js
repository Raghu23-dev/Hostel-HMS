const { generateToken, verifyToken } = require('../utils/auth');
const { validationResult } = require('express-validator');
const { Student, Hostel, User } = require('../models');
const bcrypt = require('bcryptjs');
const Parser = require('json2csv').Parser;

// @route   POST api/student/register
// @desc    Register a new student
// @access  Public
const registerStudent = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { name, cms_id, room_no, batch, dept, course, email, father_name, contact, address, dob, cnic, hostel, password } = req.body;

    try {
        // Check if student with the same CMS ID already exists
        let student = await Student.findOne({ cms_id });
        if (student) {
            return res.status(400).json({ success, errors: [{ msg: 'Student already exists' }] });
        }

        // Find hostel by name
        let shostel = await Hostel.findOne({ name: hostel });

        // Hash the student's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save a new user
        let user = new User({
            email,
            password: hashedPassword,
            isAdmin: false
        });
        await user.save();

        // Create and save a new student
        student = new Student({
            name,
            cms_id,
            room_no,
            batch,
            dept,
            course,
            email,
            father_name,
            contact,
            address,
            dob,
            cnic,
            user: user.id,
            hostel: shostel.id
        });
        await student.save();

        success = true;
        res.json({ success, student });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: 'Server error' });
    }
}

// @route   GET api/student
// @desc    Get student information based on token
// @access  Public
const getStudent = async (req, res) => {
    try {
        let success = false;
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { isAdmin, token } = req.body;

        // Check if the user is an admin
        if (isAdmin) {
            return res.status(400).json({ success, errors: 'Admin cannot access this route' });
        }

        // Verify the token and decode user ID
        const decoded = verifyToken(token);

        // Find and return student information
        const student = await Student.findOne({ user: decoded.userId }).select('-password');
        if (!student) {
            return res.status(400).json({ success, errors: 'Student does not exist' });
        }

        success = true;
        res.json({ success, student });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: 'Server error' });
    }
}

// @route   GET api/students
// @desc    Get all students by hostel ID
// @access  Public
const getAllStudents = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { hostel } = req.body;

    try {
        // Find the hostel
        const shostel = await Hostel.findById(hostel);
        // Find and return all students in the hostel
        const students = await Student.find({ hostel: shostel.id }).select('-password');
        success = true;
        res.json({ success, students });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
}

// @route   PUT api/student/update
// @desc    Update student information
// @access  Private
const updateStudent = async (req, res) => {
    let success = false;
    try {
        // Find student by ID
        const student = await Student.findById(req.student.id).select('-password');
        const { name, cms_id, room_no, batch, dept, course, email, father_name, contact, address, dob, cnic, hostel } = req.body;

        // Update student details
        student.name = name;
        student.cms_id = cms_id;
        student.room_no = room_no;
        student.batch = batch;
        student.dept = dept;
        student.course = course;
        student.email = email;
        student.father_name = father_name;
        student.contact = contact;
        student.address = address;
        student.dob = dob;
        student.cnic = cnic;
        student.hostel = hostel;

        // Save updated student information
        await student.save();

        success = true;
        res.json({ success, student });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
}

// @route   DELETE api/student/delete
// @desc    Delete a student
// @access  Private
const deleteStudent = async (req, res) => {
    try {
        let success = false;
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { id } = req.body;

        // Find and delete student
        const student = await Student.findById(id).select('-password');
        if (!student) {
            return res.status(400).json({ success, errors: [{ msg: 'Student does not exist' }] });
        }

        // Delete associated user and student
        await User.findByIdAndDelete(student.user);
        await Student.deleteOne(student);

        success = true;
        res.json({ success, msg: 'Student deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
}

// @route   GET api/student/csv
// @desc    Export student data to CSV
// @access  Public
const csvStudent = async (req, res) => {
    let success = false;
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { hostel } = req.body;

        // Find the hostel
        const shostel = await Hostel.findById(hostel);
        if (!shostel) {
            return res.status(400).json({ success, errors: [{ msg: 'Hostel not found' }] });
        }

        // Find students in the hostel
        const students = await Student.find({ hostel: shostel.id }).select('-password');

        // Transform student data for CSV
        const transformedStudents = students.map(student => {
            return {
                Name: student.name,
                'Student Id': student.cms_id,
                'Room No': student.room_no,
                Batch: student.batch,
                Dept: student.dept,
                Course: student.course,
                Email: student.email,
                'Father Name': student.father_name,
                'Contact No': "+91" + student.contact.slice(2),
                Address: student.address,
                DOB: new Date(student.dob).toDateString().slice(4),
                'AADHAR Number': student.cnic.slice(0, 5) + '-' + student.cnic.slice(5, 12) + '-' + student.cnic.slice(12)
            };
        });

        // Define CSV fields
        const fields = ['Name', 'Student Id', 'Room No', 'Batch', 'Dept', 'Course', 'Email', 'Father Name', 'Contact No', 'Address', 'DOB', 'AADHAR Number'];
        const opts = { fields };

        // Create CSV parser and parse data
        const parser = new Parser(opts);
        const csv = parser.parse(transformedStudents);

        success = true;
        res.json({ success, csv });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
}

module.exports = {
    registerStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    getAllStudents,
    csvStudent
}
