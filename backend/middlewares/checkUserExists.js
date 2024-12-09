
import User from '../models/User.js';

const checkUserExists = async (req, res, next) => {
  if (req.auth) {
    const user = await User.findById(req.auth.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
  }
  next();
};

export default checkUserExists;