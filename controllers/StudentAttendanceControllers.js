const Attendance = require('../models/StudentAttendance');

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, name, department, date, status } = req.body;
    const attendanceDate = new Date(date).setHours(0, 0, 0, 0);

    const record = await Attendance.findOneAndUpdate(
      { studentId, date: attendanceDate },
      { name, department, status },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Attendance marked', record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get by date
exports.getByDate = async (req, res) => {
  try {
    const date = new Date(req.query.date).setHours(0, 0, 0, 0);
    const records = await Attendance.find({ date });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get by month
exports.getByMonth = async (req, res) => {
  try {
    const { year, month } = req.query;
    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const records = await Attendance.find({
      date: { $gte: start, $lt: end }
    });

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get by year
exports.getByYear = async (req, res) => {
  try {
    const { year } = req.query;
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${parseInt(year) + 1}-01-01`);

    const records = await Attendance.find({
      date: { $gte: start, $lt: end }
    });

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
