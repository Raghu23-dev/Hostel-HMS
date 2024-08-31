const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Admin model
const AdminSchema = new Schema({
    // The name of the admin
    name: {
        type: String,
        required: true // This field is required
    },
    // The email of the admin, must be unique
    email: {
        type: String,
        required: true, // This field is required
        unique: true    // This field must be unique
    },
    // The name of the admin's father
    father_name: {
        type: String,
        required: true // This field is required
    },
    // Contact number of the admin
    contact: {
        type: String,
        required: true // This field is required
    },
    // Address of the admin
    address: {
        type: String,
        required: true // This field is required
    },
    // Date of birth of the admin
    dob: {
        type: Date,
        required: true // This field is required
    },
    // CNIC number of the admin, must be unique
    cnic: {
        type: String,
        required: true, // This field is required
        unique: true    // This field must be unique
    },
    // Reference to the User model (ObjectId type)
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user' // Refers to the 'user' model
    },
    // Reference to the Hostel model (ObjectId type)
    hostel: {
        type: Schema.Types.ObjectId,
        ref: 'hostel' // Refers to the 'hostel' model
    },
    // Date when the admin record was created
    date: {
        type: Date,
        default: Date.now // Default value is the current date and time
    }
});

// Create the Admin model from the schema and export it
module.exports = Admin = mongoose.model('admin', AdminSchema);
