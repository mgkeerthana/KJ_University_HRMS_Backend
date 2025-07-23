const express = require('express');
const router = express.Router();
const PunchControllers = require('../controllers/PunchControllers');
const auth = require('../middleware/authMiddleware');

router.post('/in', auth(['Admin', 'HOD', 'Employee']), PunchControllers.punchIn);
router.post('/out', auth(['Admin', 'HOD', 'Employee']), PunchControllers.punchOut);
router.get('/today', auth(['Admin', 'HOD', 'Employee']), PunchControllers.viewTodayPunchRecord);

module.exports = router;