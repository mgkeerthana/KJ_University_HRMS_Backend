const Student = require('../models/Student');

// Add new student
exports.addStudent = async (req, res) => {
  try {
    const { name, roll_number, department, year, section, email, phone, guardian_contact } = req.body;
    const student = new Student({ name, roll_number, department, year, section, email, phone, guardian_contact });
    await student.save();
    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get single student
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const updates = req.body;
    const student = await Student.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};