
import mongoose from 'mongoose';
import User from '../models/User.js';

const checkUserExists = async (req, res, next) => {
  try {
  if (req.auth) {
    if (!mongoose.isObjectIdOrHexString(req.auth.id)) return res.status(401).json({message: 'Identidad inválida'});
    const user = await User.findById(req.auth.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }
    req.user = user;
  }
  next();
  } catch (error) {
    next(error);
  }
};

export default checkUserExists;
