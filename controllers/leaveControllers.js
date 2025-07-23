const Leave = require('../models/Leave');

// Request leave
exports.requestLeave = async (req, res) => {
  try {
    const { start_date, end_date, reason } = req.body;
    const employeeId = req.user.id; // comes from auth middleware

    const leave = new Leave({
      employee_id: employeeId,
      start_date,
      end_date,
      reason
    });

    await leave.save();
    res.status(201).json({ message: 'Leave requested successfully', leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get leaves for an employee
exports.getEmployeeLeaves = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const leaves = await Leave.find({ employee_id: employeeId });
    res.status(200).json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Approve or reject leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    res.status(200).json({ message: 'Leave status updated', leave });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};