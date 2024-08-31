const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken, verifyToken } = require('../utils/auth');
const User = require('../models/User');

// User login function
exports.login = async (req, res, next) => {
    let success = false;
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        
        const { email, password } = req.body;

        try {
            // Find user by email
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
            }

            // Compare provided password with stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
            }

            // Generate token if credentials are valid
            const token = generateToken(user.id, user.isAdmin);
            res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                },
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    } catch (error) {
        next(error);
    }
};

// Change user password function
exports.changePassword = async (req, res, next) => {
    let success = false;
    try {
        // Validate request data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password, newPassword } = req.body;

        try {
            // Find user by email
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
            }

            // Compare old password with stored hashed password
            const oldPassword = await bcrypt.compare(password, user.password);
            if (!oldPassword) {
                return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
            }

            // Hash new password and update user record
            const salt = await bcrypt.genSalt(10);
            const newp = await bcrypt.hash(newPassword, salt);
            user.password = newp;
            await user.save();

            success = true;
            res.status(200).json({ success, msg: 'Password changed successfully' });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    } catch (error) {
        next(error);
    }
};

// Verify user session function
exports.verifySession = async (req, res, next) => {
    let success = false;
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success });
    }

    try {
        const { token } = req.body;
        // Verify and decode token
        const decoded = verifyToken(token);
        if (decoded) {
            success = true;
            return res.status(200).json({ success, data: decoded });
        }
        return res.status(400).json({ success, message: 'Invalid token' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success, message: 'Server Error' });
    }
};
