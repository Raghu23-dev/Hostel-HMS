const { generateToken, verifyToken } = require('../utils/auth');
const { validationResult } = require('express-validator');
const { Admin, User, Hostel } = require('../models');
const bcrypt = require('bcryptjs');

// Register a new admin
const registerAdmin = async (req, res) => {
    try {
        let success = false;
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { name, email, father_name, contact, address, dob, cnic, hostel, password } = req.body;

        try {
            // Check if the admin already exists
            let admin = await Admin.findOne({ email });
            if (admin) {
                return res.status(400).json({ success, errors: [{ msg: 'Admin already exists' }] });
            }

            // Check if the hostel exists
            let shostel = await Hostel.findOne({ name: hostel });

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user
            let user = new User({
                email,
                password: hashedPassword,
                isAdmin: true
            });
            await user.save();

            // Create a new admin record
            admin = new Admin({
                name,
                email,
                father_name,
                contact,
                address,
                dob,
                cnic,
                user: user.id,
                hostel: shostel.id
            });
            await admin.save();

            // Generate a token for the admin
            const token = generateToken(user.id, user.isAdmin);

            success = true;
            res.json({ success, token, admin });

        } catch (error) {
            res.status(500).send('Server error');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
};

// Update an existing admin
const updateAdmin = async (req, res) => {
    try {
        let success = false;
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { name, email, father_name, contact, address, dob, cnic } = req.body;

        try {
            // Find the admin by email
            let admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(400).json({ success, errors: [{ msg: 'Admin does not exist' }] });
            }

            // Update the admin details
            admin.name = name;
            admin.email = email;
            admin.father_name = father_name;
            admin.contact = contact;
            admin.address = address;
            admin.dob = dob;
            admin.cnic = cnic;

            await admin.save();

            success = true;
            res.json({ success, admin });

        } catch (error) {
            res.status(500).send('Server error');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
};

// Get the hostel associated with an admin
const getHostel = async (req, res) => {
    try {
        let success = false;
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { id } = req.body;

        // Find the admin by ID
        let admin = await Admin.findById(id);
        if (!admin) {
            return res.status(400).json({ success, errors: [{ msg: 'Admin does not exist' }] });
        }

        // Find the hostel associated with the admin
        let hostel = await Hostel.findById(admin.hostel);
        success = true;
        res.json({ success, hostel });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get admin details based on token and admin status
const getAdmin = async (req, res) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const { isAdmin, token } = req.body;

        // Check if the user is an admin and if the token is provided
        if (!isAdmin) {
            return res.status(401).json({ success, errors: [{ msg: 'Not an Admin, authorization denied' }] });
        }
        if (!token) {
            return res.status(401).json({ success, errors: [{ msg: 'No token, authorization denied' }] });
        }

        // Verify the token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ success, errors: [{ msg: 'Token is not valid' }] });
        }

        // Find the admin by user ID from the token
        let admin = await Admin.findOne({ user: decoded.userId }).select('-password');
        if (!admin) {
            return res.status(401).json({ success, errors: [{ msg: 'Token is not valid' }] });
        }

        success = true;
        res.json({ success, admin });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
    try {
        let success = false;
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email } = req.body;

        // Find the admin by email
        let admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success, errors: [{ msg: 'Admin does not exist' }] });
        }

        // Find and delete the associated user
        const user = await User.findById(admin.user);
        await User.deleteOne(user);

        // Delete the admin record
        await Admin.deleteOne(admin);

        success = true;
        res.json({ success, msg: 'Admin deleted' });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerAdmin,
    updateAdmin,
    getAdmin,
    getHostel,
    deleteAdmin
};
