const mongoose = require('mongoose');  // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema;         // Destructuring Schema from mongoose

// Defining the User schema
const UserSchema = new Schema({
    email: {
        type: String,                // Type of the field is String
        required: true,              // This field is required
        unique: true,               // This field must be unique across all documents
    },
    password: {
        type: String,                // Type of the field is String
        required: true,              // This field is required
    },
    isAdmin: {
        type: Boolean,               // Type of the field is Boolean
        required: true,              // This field is required
    },
    date: {
        type: Date,                  // Type of the field is Date
        default: Date.now            // Default value is the current date and time
    }
});

// Creating and exporting the User model using the UserSchema
module.exports = User = mongoose.model('user', UserSchema);
