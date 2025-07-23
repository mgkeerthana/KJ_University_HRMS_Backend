const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
