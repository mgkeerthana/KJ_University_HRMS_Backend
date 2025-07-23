const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    },
  roll_number: {
    type: String,
    required: true,
    unique: true
    },
  department: {
    type : String
    },
    year: {
    type : String
    },
    section: {
    type : String
    },
    email: {
    type : String
    },
    phone: {
    type : String
    },
    guardian_contact: {
    type : String
    },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);