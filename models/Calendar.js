const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  event_type: {
    type: String,
    enum: ['Holiday', 'Exam', 'Meeting', 'Festival', 'Other'],
    default: 'Other'
  }
}, { timestamps: true });

module.exports = mongoose.model('Calendar', calendarSchema);