const Employee = require('../models/Employee');
const Counter = require('../models/Counter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const departments = ['CSE', 'DSAI', 'AIML', 'ECE', 'ME', 'CE', 'EE'];
const designations = ['Assistant Professor', 'Associate Professor', 'Professor'];
const qualifications = ['M.Tech', 'Ph.D', 'B.Tech', 'M.Sc', 'MBA'];
const specializations = ['AI', 'ML', 'Cybersecurity', 'Robotics', 'Data Science', 'Networks'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Guest Lecturer'];

const generateRandomPassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: 'Name and Password are required' });
    }

    // Get unique global registration number
    const regNumber = await getNextSequence('employee');

    // Always generate email like employee1@kjuniversity.com
    const email = `employee${regNumber}@kjuniversity.com`;

    // Generate random phone number starting with 8 or 9
    const firstDigit = Math.random() < 0.5 ? '8' : '9';
    const restDigits = Math.floor(100000000 + Math.random() * 900000000).toString();
    const phone = firstDigit + restDigits;

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({
      name,
      email,
      phone,
      registrationNumber: regNumber,  // 🔥 Save reg number in DB
      department: departments[Math.floor(Math.random() * departments.length)],
      designation: designations[Math.floor(Math.random() * designations.length)],
      qualification: qualifications[Math.floor(Math.random() * qualifications.length)],
      specialization: specializations[Math.floor(Math.random() * specializations.length)],
      employment_type: employmentTypes[Math.floor(Math.random() * employmentTypes.length)],
      date_of_joining: new Date(),
      salary: Math.floor(30000 + Math.random() * 70000),
      role: 'Employee',
      password: hashedPassword
    });

    await employee.save();

    res.status(201).json({
      message: 'Employee Registered Successfully',
      assignedEmail: employee.email,
      assignedPhone: employee.phone,
      registrationNumber: regNumber
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//Login 
exports.login = async (req, res) => {
    try{
        const { name , password } = req.body;

        const employee = await Employee.findOne({name});
        if(!employee) {
            return res.status(400).json({message : 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if(!isMatch) {
            return res.status(400).json({message : 'Invalid Credentials'})
        }

        const token = jwt.sign(
            { id : employee._id , role : employee.role },
            process.env.JWT_SECRET,
            {expiresIn : '1d'}
        );

        res.status(200).json({
            token,
            user : {
                id : employee._id,
                name : employee.name,
                role : employee.role
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({message : 'Server Error'});
    }
};