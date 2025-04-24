
const User = require('../Schema');
const CheckCredit = async (req, res, next) => {
    try {
      const userId = req.user?._id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      if (user.credit <= 0) {
        return res.status(403).json({ error: 'Insufficient credit' });
      }
  
      next();
    } catch (err) {
      console.error('CheckCredit Error:', err);
      res.status(500).json({ error: 'Server error checking credit' });
    }
  };
  
  module.exports = CheckCredit;