import router from 'express';
import User from '../models/User.js';
import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';

const authRouter = router.Router();

// Register
authRouter.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    const { password, ...userData } = savedUser._doc;
    res.status(200).json(userData);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);  
      err = {message: errors, status: httpStatusCodes.BAD_REQUEST };
    }
    next(err);
  }
});

// Login
authRouter.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error('No existe cuenta asociada a ese correo');
      error.status = httpStatusCodes.NOT_FOUND;
      throw error;
    }
    const isValidPassword = await user.comparePassword(req.body.password);
    if (!isValidPassword) {
      const error = new Error('Credenciales invalidas');
      error.status = httpStatusCodes.UNAUTHORIZED;
      throw error;
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie(('token', token, { httpOnly: true, sameSite: true }));

    const { password, ...userData } = user._doc;
    res.status(200).json(userData);

  } catch (err) {
    next(err);
  }
});

// Refresh Token

authRouter.post('/refresh-token', async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error({message: 'No hay token', status: httpStatusCodes.UNAUTHORIZED});
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    const newToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie(('token', newToken, { httpOnly: true, sameSite: true }));

    const { password, ...userData } = user._doc;
    res.status(200).json(userData);

  } catch (err) {
    next(err);
  }
});


authRouter.get('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0), sameSite: true });
  res.status(200).json({ message: 'Logout' });
});

export default authRouter;
