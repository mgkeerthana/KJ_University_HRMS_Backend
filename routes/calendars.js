const express = require('express');
const router = express.Router();
const CalendarControllers = require('../controllers/CalendarControllers');
const auth = require('../middleware/authMiddleware');

// Add a calendar event (Admin only)
router.post('/', auth(['Admin']), CalendarControllers.addEvent);

// Get all events (any logged-in user)
router.get('/', auth(['Admin', 'HOD', 'Employee']), CalendarControllers.getAllEvents);

// Get single event
router.get('/:id', auth(['Admin', 'HOD', 'Employee']), CalendarControllers.getEventById);

// Update event (Admin only)
router.put('/:id', auth(['Admin']), CalendarControllers.updateEvent);

// Delete event (Admin only)
router.delete('/:id', auth(['Admin']), CalendarControllers.deleteEvent);

module.exports = router;