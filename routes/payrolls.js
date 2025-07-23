const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const payrollcontrollers = require('../controllers/payrollControllers');

router.post('/add', auth(['Admin']), payrollcontrollers.addPayroll);
router.get('/get', auth(['Admin', 'Employee']), payrollcontrollers.getPayroll);
//router.post('/create-order', auth(['Admin']), payrollController.createSalaryOrder);


module.exports = router;
