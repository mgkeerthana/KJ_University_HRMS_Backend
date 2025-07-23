const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  name: String,
  department: String,
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true
  }
}, { timestamps: true });

studentAttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);
