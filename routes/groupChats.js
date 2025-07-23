const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const GroupChatControllers = require('../controllers/GroupChatControllers');

// Group APIs
// Create a group chat (Admin, HOD)
router.post('/create', auth(['Admin', 'HOD']), GroupChatControllers.createGroup);

// Send a message in group chat (Admin, HOD, Employee)
router.post('/send', auth(['Admin', 'HOD', 'Employee']), GroupChatControllers.sendGroupMessage);

// Get all group messages (Admin, HOD, Employee)
router.get('/:groupId', auth(['Admin', 'HOD', 'Employee']), GroupChatControllers.getGroupMessages);

// Delete group message (Admin, HOD, Employee)
router.delete('/:id', auth(['Admin', 'HOD', 'Employee']), GroupChatControllers.deleteGroupMessage);

// Delete Group (Admin, HOD)
router.delete('/group/:groupId', auth(['Admin', 'HOD']), GroupChatControllers.deleteGroup);

module.exports = router;
