const File = require('../models/File');
const fs = require('fs');
const path = require('path');

// Upload File
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploader = req.user;

    const file = new File({
      uploader: uploader.id,
      uploaderName: uploader.name,
      uploaderEmail: uploader.email,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: `uploads/${req.file.filename}` 
    });

    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// List Files
exports.listFiles = async (req, res) => {
  try {
    const files = await File.find().populate('uploader', 'name email');
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete File
exports.deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.filename);

    // Delete file from disk if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Update file document with deleter info before removing
    file.deletedBy = req.user.id;
    file.deletedByName = req.user.name;
    file.deletedByEmail = req.user.email;

    await file.deleteOne();
//
    res.status(200).json({ message: `File deleted successfully by ${req.user.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Download File
exports.downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.filename);
    res.download(filePath, file.originalname);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};