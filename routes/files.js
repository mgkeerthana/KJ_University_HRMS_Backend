const express = require('express');
const multer = require('multer');
const router = express.Router();
const FileControllers = require('../controllers/FileControllers');
const auth = require('../middleware/authMiddleware');

// Configure multer to upload to "uploads/" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder relative to project root
  },
  filename: function (req, file, cb) {
    // unique filename: Date-now_originalfilename
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage });

// Upload file (Admin, HOD, Employee)
router.post('/upload', auth(['Admin', 'HOD', 'Employee']), upload.single('file'), FileControllers.uploadFile);

// List uploaded files (Admin, HOD)
router.get('/list', auth(['Admin', 'HOD', 'Employee']), FileControllers.listFiles);

// Delete file by ID (Admin, HOD)
router.delete('/:id', auth(['Admin', 'HOD']), FileControllers.deleteFile);

// Download file by ID (Admin, HOD)
router.get('/download/:id', auth(['Admin','HOD']), FileControllers.downloadFile);

module.exports = router;