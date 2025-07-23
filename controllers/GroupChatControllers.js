const Group = require('../models/Group');
const GroupChat = require('../models/GroupChat');
const Employee = require('../models/Employee');

// Create group
exports.createGroup = async (req, res) => {
  const { name, members } = req.body;

  try {
    const existing = await Group.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Group already exists' });

    const group = new Group({ name, members });
    await group.save();

    res.status(201).json({ message: 'Group created', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Send message to group
exports.sendGroupMessage = async (req, res) => {
  const { groupId, message } = req.body;
  const senderId = req.user._id;

  try {
    const group = await Group.findById(groupId);
    if (!group || !group.members.includes(senderId)) {
      return res.status(403).json({ message: 'Not a group member' });
    }

    const newMsg = new GroupChat({
      group: groupId,
      sender: senderId,
      message
    });

    await newMsg.save();

    const sender = await Employee.findById(senderId).select('name email');

    res.status(201).json({
      message: 'Group message sent',
      chat: {
        _id: newMsg._id,
        message: newMsg.message,
        createdAt: newMsg.createdAt,
        sender: {
          id: sender._id,
          name: sender.name
        },
        group: groupId
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get messages of a group
exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;

  try {
    const group = await Group.findById(groupId);
    if (!group || !group.members.includes(userId)) {
      return res.status(403).json({ message: 'Not a group member' });
    }

    const messages = await GroupChat.find({ group: groupId })
      .sort({ createdAt: 1 })
      .populate('sender', 'name email');

    const formatted = messages.map(msg => ({
      _id: msg._id,
      message: msg.message,
      createdAt: msg.createdAt,
      sender: {
        id: msg.sender._id,
        name: msg.sender.name
      }
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete group message
exports.deleteGroupMessage = async (req, res) => {
  const messageId = req.params.id;
  const userId = req.user._id;

  try {
    const msg = await GroupChat.findById(messageId);
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    const isAdmin = req.user.role === 'Admin';
    const isSender = msg.sender.toString() === userId.toString();

    if (!isSender && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    const deleter = await Employee.findById(userId).select('name email');

    await msg.deleteOne();

    res.status(200).json({
      message: 'Group message deleted successfully',
      deletedBy: {
        id: deleter._id,
        name: deleter.name
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete entire group and its messages
exports.deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    // Only Admin or HOD allowed
    if (!['Admin', 'HOD'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to delete group' });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const deleter = await Employee.findById(req.user._id).select('name email');

    // Delete all messages in this group
    await GroupChat.deleteMany({ group: groupId });

    // Delete the group
    await group.deleteOne();

    res.status(200).json({
      message: 'Group and its messages deleted successfully',
      deletedBy: {
        id: deleter._id,
        name: deleter.name,
        email: deleter.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

