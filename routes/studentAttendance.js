const express = require('express');
const router = express.Router();
const StudentAttendanceControllers = require('../controllers/StudentAttendanceControllers');
const auth = require('../middleware/authMiddleware');

// Mark attendance for a student
router.post('/mark', auth(['HOD', 'Admin']), StudentAttendanceControllers.markAttendance);

// Get attendance records of a student
router.get('/date', auth(['Employee', 'Admin', 'HOD']), StudentAttendanceControllers.getByDate);

// Get attendance records of a student by month
router.get('/month', auth(['Employee', 'Admin', 'HOD']), StudentAttendanceControllers.getByMonth);

// Get attendance records of a student by year
router.get('/year', auth(['Admin', 'HOD']), StudentAttendanceControllers.getByYear);

module.exports = router;
