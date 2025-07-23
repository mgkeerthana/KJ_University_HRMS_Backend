const express = require('express');
const router = express.Router();
const StudentControllers = require('../controllers/StudentControllers');
const auth = require('../middleware/authMiddleware');

// Add student (Admin only)
router.post('/', auth(['Admin']), StudentControllers.addStudent);

// Get all students
router.get('/', auth(['Admin', 'HOD']), StudentControllers.getAllStudents);

// Get single student by ID
router.get('/:id', auth(['Admin', 'HOD']), StudentControllers.getStudentById);

// Update student
router.put('/:id', auth(['Admin']), StudentControllers.updateStudent);

// Delete student
router.delete('/:id', auth(['Admin']), StudentControllers.deleteStudent);

module.exports = router;