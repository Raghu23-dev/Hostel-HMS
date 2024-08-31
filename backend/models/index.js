// Importing the models from their respective files
const Admin = require('./Admin');        // Admin model
const Hostel = require('./Hostel');      // Hostel model
const Student = require('./Student');    // Student model
const User = require('./User');          // User model
const Attendance = require('./Attendance'); // Attendance model
const Complaint = require('./Complaint'); // Complaint model
const Suggestion = require('./Suggestion'); // Suggestion model

// Exporting all models as a single object
module.exports = {
    Admin,        // Admin model
    Hostel,       // Hostel model
    Student,      // Student model
    User,         // User model
    Attendance,   // Attendance model
    Complaint,    // Complaint model
    Suggestion    // Suggestion model
};
