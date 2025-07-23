const express = require('express');
const router = express.Router();
const attendanceControllers = require('../controllers/attendanceControllers');
const auth = require('../middleware/authMiddleware');

// Mark attendance
router.post('/mark', auth(['Admin', 'HoD']), attendanceControllers.markAttendance);

// Get attendance records of an employee
router.get('/employee/:employeeId', auth(['Admin', 'HoD', 'Employee']), attendanceControllers.getAttendanceByEmployee);

// Get attendance by date
router.get('/date', auth(['Admin', 'HoD']), attendanceControllers.getAttendanceByDate);

// Get attendance by month
router.get('/month', auth(['Admin', 'HoD']), attendanceControllers.getAttendanceByMonth);

// Get attendance by year
router.get('/year', auth(['Admin', 'HoD']), attendanceControllers.getAttendanceByYear);

module.exports = router;