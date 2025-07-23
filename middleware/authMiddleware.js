const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

module.exports = (roles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the full Employee record
      const user = await Employee.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Invalid user' });
      }

      // Check role permissions
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = user; // ✅ attach full employee info here
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid Token' });
    }
  };
};
