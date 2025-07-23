const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name : { 
    type : String, 
    required: true
  },
  email : { 
    type : String, 
    required : true, 
    unique : true 
  },
  phone : {
    type : String
  },
  department : {
    type : String
  },
  designation : {
    type : String
  },
  qualification : {
    type : String
  },
  specialization : {
    type : String
  },
  employment_type : {
    type : String
  },
  date_of_joining : {
    type : Date
  },
  salary : {
    type : Number
  },
  registrationNumber : { 
    type: Number, 
    unique: true 
  }, 
  role: { 
    type: String, 
    enum: ['Admin', 'HOD', 'Employee'], 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
