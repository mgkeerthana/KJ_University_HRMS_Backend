const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  uploaderName: String,
  uploaderEmail: String,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  deletedByName: String,
  deletedByEmail: String,
  filename: { type: String, required: true },
  path: String, // 🔥 store relative path
  originalname: String,
  mimetype: String,
  size: Number,
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
