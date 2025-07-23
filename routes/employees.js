const express = require('express');
const router = express.Router();
const EmpControllers = require('../controllers/EmpControllers');
const auth = require('../middleware/authMiddleware');

// List all employees
router.get('/', auth(['Admin', 'HOD']), EmpControllers.getAllEmployees);

// Get single employee
router.get('/:id', auth(['Admin', 'HOD']), EmpControllers.getEmployeeById);

// Update employee info
router.put('/:id', auth(['Admin']), EmpControllers.updateEmployee);

// Delete employee
router.delete('/:id', auth(['Admin']), EmpControllers.deleteEmployee);

module.exports = router;