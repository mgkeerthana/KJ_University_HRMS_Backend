const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Employee',
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        enum : ['Present', 'Absent', 'On Leave'],
        required : true
    },
    remarks : {
        type : String
    },
}, {timestamps : true});

attendanceSchema.index({ employee_id : 1, date : 1}, {unique : true});

module.exports = mongoose.model('Attendance', attendanceSchema);