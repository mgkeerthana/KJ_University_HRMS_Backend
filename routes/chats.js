const express = require('express');
const router = express.Router();
const ChatControllers = require('../controllers/ChatControllers');
const auth = require('../middleware/authMiddleware');

// Send a message (any logged-in user)
router.post('/send', auth(['Admin', 'Employee', 'HOD']), ChatControllers.sendMessage);

// Get chat history with a specific user
router.get('/with/:userId', auth(['Admin', 'Employee', 'HOD']), ChatControllers.getChatWithUser);

// Delete a message (any logged-in user)
router.delete('/:id', auth(['Admin', 'Employee', 'HOD']), ChatControllers.deleteMessage);

module.exports = router;