const Calendar = require('../models/Calendar');

// Add a calendar event
exports.addEvent = async (req, res) => {
  try {
    const { title, description, date, event_type } = req.body;
    const event = new Calendar({ title, description, date, event_type });
    await event.save();
    res.status(201).json({ message: 'Event added successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Calendar.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single event
exports.getEventById = async (req, res) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const updates = req.body;
    const event = await Calendar.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Calendar.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};