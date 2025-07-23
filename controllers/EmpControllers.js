const Employee = require('../models/Employee');
// All Employee ID
exports.getAllEmployees = async (req, res) => {
    try {
        const employee = await Employee.find().select('-password');
        res.status(200).json(employee);

    } catch(err) {
        console.error(err);
        return res.status(500).json({message : 'Server Error '});
    }
};

// Single Employeee ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).select('-password');
        if(!employee) {
            return res.status(400).json({message : 'Employee Not Found'});
        }
        res.status(200).json(employee);
    } catch(err) {
        console.error(err);
        return res.status(500).json({message : ' Server Error '});
    }
};

//Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const updates = req.body; // 

        if (updates.password) {
            return res.status(400).json({ message: 'Cannot update password here' });
        }

        const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {
            new: true
        }).select('-password');

        if (!employee) {
            return res.status(400).json({ message: 'Employee Not Found' });
        }

        res.status(200).json({ message: 'Employee Updated Successfully', employee });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if(!employee) {
            return res.status(400).json({message : 'Employee Not Found '});
        }
        res.status(200).json({message : 'Employee Deleted Succesfully'})
    } catch(err) {
        console.error(err);
        return res.status(500).json({message : ' Server Error '});
    }
};