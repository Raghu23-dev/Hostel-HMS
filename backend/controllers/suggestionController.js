const { validationResult } = require('express-validator');
const { Suggestion } = require('../models');

// @route   POST api/suggestion
// @desc    Register a new suggestion
// @access  Public
exports.registerSuggestion = async (req, res) => {
    let success = false;

    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }

    const { student, hostel, title, description } = req.body;

    try {
        // Create a new suggestion object
        const newSuggestion = new Suggestion({
            student,
            hostel,
            title,
            description
        });

        // Save the suggestion to the database
        await newSuggestion.save();

        success = true;
        res.json({ success, msg: 'Suggestion registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/suggestion
// @desc    Get all suggestions for a specific hostel
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
        // Find all suggestions for the specified hostel
        const suggestions = await Suggestion.find({ hostel })
            .populate('student', ['name', 'room_no']); // Populate student details

        success = true;
        res.json({ success, suggestions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   GET api/suggestion
// @desc    Get all suggestions for a specific student
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
        // Find all suggestions made by the specified student
        const suggestions = await Suggestion.find({ student })
            .populate('hostel', ['name']); // Populate hostel details

        success = true;
        res.json({ success, suggestions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @route   PUT api/suggestion
// @desc    Update a suggestion
// @access  Public
exports.updateSuggestion = async (req, res) => {
    let success = false;
    const { id, status } = req.body;

    try {
        // Find and update the suggestion by its ID
        const suggestion = await Suggestion.findByIdAndUpdate(id, { status });

        success = true;
        res.json({ success, msg: 'Suggestion updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
