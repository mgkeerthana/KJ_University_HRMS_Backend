const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  basicSalary: Number,
  workedHours: Number, // optional if using punch model
  totalSalary: Number,
  
  // 🔽 NEW FIELDS
  paymentType: {
    type: String,
    enum: ['Bank Transfer', 'UPI', 'Cash', 'Cheque'],
    default: 'Bank Transfer'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  paymentDate: {
    type: Date
  },
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
