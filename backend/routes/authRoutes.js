const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, verifySession } = require('../controllers/authController');

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/login', 
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
  ], 
  login
);



// @route   POST api/auth/verifysession
// @desc    Verify session
// @access  Public
router.post(
  '/verifysession', 
  [
    check('token', 'Token is required').not().isEmpty()
  ], 
  verifySession
);

module.exports = router;
