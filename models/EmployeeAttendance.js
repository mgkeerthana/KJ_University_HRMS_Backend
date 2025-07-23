const mongoose = require('mongoose');

const EmployeeAttendanceSchema = new mongoose.Schema ({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    PunchIn : {
        type: Date
    },
    PunchOut: {
        type: Date
    },
    workedHours: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
}, { timestamps: true });

EmployeeAttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema);