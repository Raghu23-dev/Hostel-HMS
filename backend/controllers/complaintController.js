const { validationResult } = require('express-validator');
const { Complaint } = require('../models');

// @route   POST api/complaint
// @desc    Register a new complaint
// @access  Public
exports.registerComplaint = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    
    const { student, hostel, type, title, description } = req.body;
    
    try {
        // Create a new complaint
        const newComplaint = new Complaint({
            student,
            hostel,
            type,
            title,
            description
        });
        
        // Save the complaint to the database
        await newComplaint.save();
        success = true;
        res.json({ success, msg: 'Complaint registered successfully' });
    } catch (err) {
        // Log and return server error
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/complaint
// @desc    Get all complaints by hostel ID
// @access  Public
exports.getbyhostel = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    
    const { hostel } = req.body;
    
    try {
        // Find complaints by hostel ID and populate student information
        const complaints = await Complaint.find({ hostel }).populate('student', ['name', 'rollno']);
        success = true;
        res.json({ success, complaints });
    } catch (err) {
        // Log and return server error
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/complaint
// @desc    Get all complaints by student ID
// @access  Public
exports.getbystudent = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    
    const { student } = req.body;
    
    try {
        // Find complaints by student ID
        const complaints = await Complaint.find({ student });
        success = true;
        res.json({ success, complaints });
    } catch (err) {
        // Log and return server error
        console.error(err.errors);
        res.status(500).send('Server error');
    }
}

// @route   PATCH api/complaint
// @desc    Resolve a complaint by ID
// @access  Public
exports.resolve = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }
    
    const { id } = req.body;
    
    try {
        // Find complaint by ID and update status to 'solved'
        const complaint = await Complaint.findById(id);
        complaint.status = "solved";
        await complaint.save();
        success = true;
        res.json({ success });
    } catch (err) {
        // Log and return server error
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
