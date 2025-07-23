const Payroll = require('../models/Payroll');
const Razorpay = require('razorpay');

// Add or update payroll record
exports.addPayroll = async (req, res) => {
  try {
    const { employeeId, amount, month, year } = req.body;

    const payroll = await Payroll.findOneAndUpdate(
      { employee: employeeId, month, year },
      { amount, status: 'Paid' },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Payroll recorded/updated', payroll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get payroll by year 
exports.getPayroll = async (req, res) => {
  try {
    const { employeeId, year } = req.query;
    const filter = { employee: employeeId };

    if (year) filter.year = parseInt(year);

    const records = await Payroll.find(filter).populate('employee', 'name email');
    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Create Razorpay order for salary payment
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// //exports.createSalaryOrder = async (req, res) => {
//   try {
//     const { employeeId, amount, month, year } = req.body;

//     const options = {
//       amount: amount * 100, // in paise
//       currency: 'INR',
//       receipt: `salary_${employeeId}_${month}_${year}`,
//       payment_capture: 1
//     };

//     const order = await razorpay.orders.create(options);
//     res.status(200).json({ order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Order creation failed' });
//   }
// }; 