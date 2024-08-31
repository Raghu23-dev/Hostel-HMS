const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Complaint model
const ComplaintSchema = new Schema({
    // Reference to the Student model (ObjectId type)
    student: {
        type: Schema.Types.ObjectId,
        ref: 'student' // Refers to the 'student' model
    },
    // Reference to the Hostel model (ObjectId type)
    hostel: {
        type: Schema.Types.ObjectId,
        ref: 'hostel' // Refers to the 'hostel' model
    },
    // Type of the complaint (e.g., "maintenance", "behavior")
    type: {
        type: String,
        required: true // This field is required
    },
    // Title of the complaint
    title: {
        type: String,
        required: true // This field is required
    },
    // Detailed description of the complaint
    description: {
        type: String,
        required: true // This field is required
    },
    // Status of the complaint (e.g., "pending", "resolved")
    status: {
        type: String,
        default: 'pending' // Default value is 'pending'
    },
    // Date when the complaint was filed
    date: {
        type: Date,
        default: Date.now // Default value is the current date and time
    }
});

// Create the Complaint model from the schema and export it
module.exports = Complaint = mongoose.model('complaint', ComplaintSchema);
