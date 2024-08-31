const { validationResult } = require('express-validator');
const { Student, Attendance } = require('../models');

// Mark attendance for a student
const markAttendance = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success, errors: errors.array() });
    }

    const { student, status } = req.body;
    const date = new Date();

    // Check if attendance is already marked for the student today
    const alreadyattendance = await Attendance.findOne({
        student,
        date: {
            $gte: date.setHours(0, 0, 0, 0), // Start of the day
            $lt: date.setHours(23, 59, 59, 999) // End of the day
        }
    });

    if (alreadyattendance) {
        return res.status(409).json({ success, error: 'Attendance already marked' });
    }
    
    try {
        // Create and save new attendance record
        const attendance = new Attendance({ student, status });
        const result = await attendance.save();
        success = true;
        res.status(201).json({ success, result });
    } catch (err) {
        res.status(500).json({ success, error: err.message });
    }
};

// Get attendance records for a specific student
const getAttendance = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success, errors: errors.array() });
    }

    const { student } = req.body;
    try {
        // Find attendance records for the student
        const attendance = await Attendance.find({ student });
        success = true;
        res.status(200).json({ success, attendance });
    } catch (err) {
        res.status(500).json({ success, error: err.message });
    }
};

// Update attendance record for a student
const updateAttendance = async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { student, status } = req.body;
    try {
        // Update attendance record for the student for the current date
        const attendance = await Attendance.findOneAndUpdate(
            { student, date: new Date().setHours(0, 0, 0, 0) }, // Current date
            { status },
            { new: true } // Return the updated document
        );
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get attendance records for all students in a specific hostel
const getHostelAttendance = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success, errors: errors.array() });
    }

    const { hostel } = req.body;
    try {
        const date = new Date();

        // Find all students in the specified hostel
        const students = await Student.find({ hostel });

        // Find attendance records for these students for the current date
        const attendance = await Attendance.find({
            student: { $in: students.map(student => student._id) },
            date: {
                $gte: date.setHours(0, 0, 0, 0), // Start of the day
                $lt: date.setHours(23, 59, 59, 999) // End of the day
            }
        }).populate('student', ['_id', 'name', 'room_no', 'cms_id']); // Populate student details

        success = true;
        res.status(200).json({ success, attendance });
    } catch (err) {
        res.status(500).json({ success, error: err.message });
    }
};

module.exports = {
    markAttendance,
    getAttendance,
    updateAttendance,
    getHostelAttendance
};
