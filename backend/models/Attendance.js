const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Attendance model
const AttendanceSchema = new Schema({
    // Reference to the Student model (ObjectId type)
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student' // Refers to the 'student' model
    },
    // Date of the attendance record
    date: {
        type: Date,
        default: Date.now // Default value is the current date and time
    },
    // Status of the attendance (e.g., "present", "absent")
    status: {
        type: String,
        required: true // This field is required
    }
});

// Create the Attendance model from the schema and export it
module.exports = Attendance = mongoose.model('attendance', AttendanceSchema);
