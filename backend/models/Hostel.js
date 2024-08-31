const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Hostel model
const HostelSchema = new Schema({
    // Name of the hostel
    name: {
        type: String,
        required: true // This field is required
    },
    // Location of the hostel (e.g., "North Campus")
    location: {
        type: String,
        required: true // This field is required
    },
    // Number of rooms in the hostel
    rooms: {
        type: Number,
        required: true // This field is required
    },
    // Total capacity of the hostel (number of students it can accommodate)
    capacity: {
        type: Number,
        required: true // This field is required
    },
    // Number of vacant rooms in the hostel
    vacant: {
        type: Number,
        required: true // This field is required
    }
});

// Create the Hostel model from the schema and export it
module.exports = Hostel = mongoose.model('hostel', HostelSchema);
