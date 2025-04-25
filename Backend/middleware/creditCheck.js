
const User = require('../Schema');
const CheckCredit = async (req, res, next) => {
    try {
      const userId = req.user?._id;
      if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (user.credits <= 0) {
        return res.status(403).json({ message: 'Insufficient credit' });
      }
  
      next();
    } catch (err) {
      console.error('CheckCredit Error:', err);
      res.status(500).json({ message: 'Server error checking credit' });
    }
  };
  
  module.exports = CheckCredit;