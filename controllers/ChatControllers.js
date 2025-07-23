const Chat = require('../models/Chat');
const Employee = require('../models/Employee');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, message } = req.body;

    // Fetch names for both sender and receiver
    const sender = await Employee.findById(senderId).select('name');
    const receiver = await Employee.findById(receiverId).select('name');

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const chat = new Chat({
      sender: senderId,
      receiver: receiverId,
      message
    });

    await chat.save();

    res.status(201).json({
      message: 'Message Sent Successfully',
      chat: {
        _id: chat._id,
        message: chat.message,
        createdAt: chat.createdAt,
        sender: {
          id: sender._id,
          name: sender.name
        },
        receiver: {
          id: receiver._id,
          name: receiver.name
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get chat history
exports.getChatWithUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;

    const messages = await Chat.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name')
      .populate('receiver', 'name');

    // Format response to include both sender and receiver details
    const formattedMessages = messages.map(msg => ({
      _id: msg._id,
      message: msg.message,
      createdAt: msg.createdAt,
      sender: {
        id: msg.sender._id,
        name: msg.sender.name
      },
      receiver: {
        id: msg.receiver._id,
        name: msg.receiver.name
      }
    }));

    res.status(200).json(formattedMessages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
;

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;

    // Find the message
    const message = await Chat.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Allow only sender or Admin to delete
    const isSender = message.sender.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'Admin';

    if (!isSender && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await message.deleteOne();

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//
