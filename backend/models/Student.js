const mongoose = require('mongoose');  // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema;         // Destructuring Schema from mongoose

// Defining the Student schema
const StudentSchema = new Schema({
    name: {
        type: String,                   // Type of the field is String
        required: true                 // This field is required
    },
    cms_id: {
        type: Number,                  // Type of the field is Number
        required: true,                // This field is required
        unique: true                   // This field must be unique
    },
    room_no: {
        type: Number,                  // Type of the field is Number
        required: true                 // This field is required
    },
    batch: {
        type: Number,                  // Type of the field is Number
        required: true                 // This field is required
    },
    dept: {
        type: String,                  // Type of the field is String
        required: true                 // This field is required
    },
    course: {
        type: String,                  // Type of the field is String
        required: true                 // This field is required
    },
    email: {
        type: String,                  // Type of the field is String
        required: true,                // This field is required
        unique: true                   // This field must be unique
    },
    father_name: {
        type: String,                  // Type of the field is String
        required: true                 // This field is required
    },
    contact: {
        type: String,                  // Type of the field is String
        required: true                 // This field is required
    },
    address: {
        type: String,                  // Type of the field is String
        required: true                 // This field is required
    },
    dob: {
        type: Date,                    // Type of the field is Date
        required: true                 // This field is required
    },
    cnic: {
        type: String,                  // Type of the field is String
        required: true,                // This field is required
        unique: true                   // This field must be unique
    },
    user: {
        type: Schema.Types.ObjectId,   // Type of the field is ObjectId, referencing the 'user' model
        ref: 'user'                    // Reference to the 'user' collection
    },
    hostel: {
        type: Schema.Types.ObjectId,   // Type of the field is ObjectId, referencing the 'hostel' model
        ref: 'hostel'                  // Reference to the 'hostel' collection
    },
    date: {
        type: Date,                    // Type of the field is Date
        default: Date.now              // Default value is the current date and time
    }
});

// Exporting the Student model
module.exports = Student = mongoose.model('student', StudentSchema);
