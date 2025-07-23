const EmployeeAttendance = require('../models/EmployeeAttendance');

// Punch In Controller
exports.punchIn = async (req, res) => {
    const employeeId = req.user._id; 
    const Today = new Date().setHours(0, 0, 0, 0); 

    try {
        const exsisting = await EmployeeAttendance.findOne({employee : employeeId, date : Today});
        if (exsisting) {
            return res.status(400).json({ message: 'Already punched in for today' });
        }

        const record = await EmployeeAttendance.create({
            employee: employeeId,
            date: Today,
            punch_in: new Date(),
            status: 'Pending'
        });
        res.status(200).json({ message: 'Punch-in recorded', record });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Punch Out Controller
exports.punchOut = async (req, res) => {
    const employeeId = req.user._id; 
    const Today = new Date().setHours(0, 0, 0, 0);

    try {
        const record = await EmployeeAttendance.findOne({ employee: employeeId, date: Today });
        if (!record || record.punchOut) {
            return res.status(404).json({ message: 'No punch-in record found for today' });
        }

        record.punch_out = new Date();
        record.worked_hours = Math.abs(new Date (record.punchOut) - new Date (record.punchIn))/ (1000 * 60 * 60); 
        record.status = 'Completed';
        await record.save();

        res.status(200).json({ message: 'Punch-out recorded', record });

        if (record.punch_out) {
            return res.status(400).json({ message: 'Already punched out for today' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// View Today's Punch Record
exports.viewTodayPunchRecord = async (req, res) => {
    const employeeId = req.user._id; 
    const Today = new Date().setHours(0, 0, 0, 0);

    try {
        const record = await EmployeeAttendance.findOne({ employee : employeeId, date : Today });
        if (!record) {
            return res.status(404).json({ message: 'No punch record found for today' });
        }
        res.status(200).json(record);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};