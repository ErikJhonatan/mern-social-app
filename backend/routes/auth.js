import router from 'express';
import User from '../models/User.js';
import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.config.js';
import upload from '../middlewares/uploadMiddleware.js';
import { unlink } from 'fs/promises';

const authRouter = router.Router();

// Register
authRouter.post('/register', upload.single('profileImg'), async (req, res, next) => {
  try {
    const user = new User(req.body);
    
    const savedUser = await user.save();
  
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'users',
        crop: "scale"
      });
      imageUrl = result.secure_url;
    }
    const updated = await User.findByIdAndUpdate(savedUser._id, { profilePicture: imageUrl }, { new: true });
    const { password, ...userData } = updated._doc;
    await unlink(req.file.path);
    res.status(201).json(userData);
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
    console.log(token);
    res.cookie('token', token, { 
      path: '/',
      httpOnly: true, 
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      secure: process.env.NODE_ENV === 'production' ? true : false, // Solo en producción
      domain: 'localhost' // Solo en desarrollo
    });
    const { password, ...userData } = user._doc;
    res.status(200).json(userData);

  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Refresh Token

authRouter.post('/refresh-token', async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error('No hay token');
      error.status = httpStatusCodes.UNAUTHORIZED;
      throw error;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    const newToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie('token', newToken, { httpOnly: true, sameSite: 'strict' });

    const { password, ...userData } = user._doc;
    res.status(200).json(userData);

  } catch (err) {
    next(err);
  }
});


authRouter.get('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0), sameSite: 'strict' });
  res.status(200).json({ message: 'Logout' });
});

authRouter.get('/me', async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error('No hay token');
      error.status = httpStatusCodes.UNAUTHORIZED;
      throw error;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if(!user) {
      const error = new Error('Usuario no encontrado');
      error.status = httpStatusCodes.NOT_FOUND;
      throw error;
    }
    const { password, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
});

// Check if user is logged in
authRouter.get('/is-logged-in', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(httpStatusCodes.UNAUTHORIZED).json({ loggedIn: false });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.status(httpStatusCodes.OK).json({ loggedIn: true });
  } catch (err) {
    res.status(httpStatusCodes.UNAUTHORIZED).json({ loggedIn: false });
  }
});

export default authRouter;
