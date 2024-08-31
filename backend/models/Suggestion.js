const mongoose = require('mongoose');  // Importing mongoose for MongoDB object modeling
const Schema = mongoose.Schema;         // Destructuring Schema from mongoose

// Defining the Suggestion schema
const SuggestionSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,  // Type of the field is ObjectId
        ref: 'student'                // Reference to the 'student' model
    },
    hostel: {
        type: Schema.Types.ObjectId,  // Type of the field is ObjectId
        ref: 'hostel'                 // Reference to the 'hostel' model
    },
    title: {
        type: String,                 // Type of the field is String
        required: true                // This field is required
    },
    description: {
        type: String,                 // Type of the field is String
        required: true                // This field is required
    },
    status: {
        type: String,                 // Type of the field is String
        default: 'pending'            // Default value is 'pending'
    },
    date: {
        type: Date,                   // Type of the field is Date
        default: Date.now             // Default value is the current date and time
    }
});

// Creating and exporting the Suggestion model using the SuggestionSchema
module.exports = Suggestion = mongoose.model('suggestion', SuggestionSchema);
