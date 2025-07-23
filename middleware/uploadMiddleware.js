const multer = require('multer');
const path = require('path');

// Configure where to save files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // uploads/ folder in project root
  },
  filename: function (req, file, cb) {
    // unique file name: timestamp_originalname.ext
    cb(null, Date.now() + '_' + file.originalname);
  }
});

// Optional: File type filter (example: images or pdfs only)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|pdf/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);
//   if (extname && mimetype) return cb(null, true);
//   cb(new Error('Only images and PDFs are allowed!'));
// };

// Optional: Set limits like max file size (5MB here)
const limits = {
  fileSize: 5 * 1024 * 1024 // 5MB
};

const upload = multer({
  storage,
  limits,
  // fileFilter
});

// File type filter for mp4 videos
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(new Error('Only mp4 videos are allowed!'), false);
  }
};

module.exports = upload;