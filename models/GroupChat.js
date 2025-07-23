const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
}, { timestamps: true });

module.exports = mongoose.model('GroupChat', groupChatSchema);
