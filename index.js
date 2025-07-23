const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendance');
const leaveRoutes = require('./routes/leaves');
const chatRoutes = require('./routes/chats');
const payrollRoutes = require('./routes/payrolls');
const calendarRoutes = require('./routes/calendars');
const studentRoutes = require('./routes/students');
const studentAttendanceRoutes = require('./routes/studentAttendance');
const fileRoutes = require('./routes/files');
const groupChatRoutes = require('./routes/groupChats');
const punchRoutes = require('./routes/punch');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/calenders', calendarRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/student-attendance', studentAttendanceRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/groupchat', groupChatRoutes);
app.use('/api/punch', punchRoutes);

// MongoDB connection`
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected Successfully');
})
.catch(err => console.error('MongoDB connection errror:',err));

const PORT = process.env.PORT || 5000;
app.get('/',(req, res) => {
    res.send('KJ University HRMS');    
});

app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));