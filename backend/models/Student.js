const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    aadhar_no: {  
        type: Number,
        required: true,
        unique: true
    },
    room_no: {
        type: Number,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

StudentSchema.virtual('primaryKey').get(function(){
    return this.aadhar_no;  
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
