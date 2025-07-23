const express = require('express');
const router = express.Router();
const leaveControllers = require('../controllers/leaveControllers');
const auth = require('../middleware/authMiddleware');

// Employees can request leave
router.post('/request', auth(['Employee']), leaveControllers.requestLeave);

// Admin/HOD can view leaves for a specific employee
router.get('/employee/:employeeId', auth(['Admin', 'HOD']), leaveControllers.getEmployeeLeaves);

// Admin/HOD can update leave status
router.put('/:id/status', auth(['Admin', 'HOD']), leaveControllers.updateLeaveStatus);

module.exports = router;