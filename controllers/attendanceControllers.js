const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, remarks } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(400).json({ message: 'Employee not found' });

    const attendanceDate = new Date(date).setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      { employee_id: employeeId, date: attendanceDate },
      { status, remarks },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: 'Attendance marked successfully', attendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get attendance by employee
exports.getAttendanceByEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const attendanceRecords = await Attendance.find({ employee_id: employeeId });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get attendance by date
exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    const records = await Attendance.find({ date: targetDate }).populate('employee_id', 'name email');
    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get attendance by month
exports.getAttendanceByMonth = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: 'Year and Month are required' });
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const records = await Attendance.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    }).populate('employee_id', 'name email');

    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get attendance by year
exports.getAttendanceByYear = async (req, res) => { 
  try {
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ message: 'Year is required' });
    }

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year + 1}-01-01`);

    const records = await Attendance.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    }).populate('employee_id', 'name email');

    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
