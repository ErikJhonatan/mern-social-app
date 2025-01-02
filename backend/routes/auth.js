import router from 'express';
import User from '../models/User.js';
import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.config.js';
import upload from '../middlewares/uploadMiddleware.js';
import { unlink } from 'fs/promises';

const authRouter = router.Router();

const cookieOptions = {
  path: '/', httpOnly: true, sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};

// Register only profile fields; privilege fields come from the server.
authRouter.post('/register', upload.single('profileImage'), async (req, res, next) => {
  let uploaded;
  let saved = false;
  try {
    if (!req.file?.path) return res.status(400).json({ errors: ['La imagen de perfil es requerida'] });
    const { username, email, password, desc, city, from, website, relationship } = req.body;
    const user = new User({ username, email, password, desc, city, from, website, relationship });
    await user.validate();
    uploaded = await cloudinary.uploader.upload(req.file.path, { folder: 'users', crop: 'scale' });
    user.profilePicture = uploaded.secure_url;
    const savedUser = await user.save();
    saved = true;
    const { password: omitted, ...userData } = savedUser.toObject();
    res.status(201).json(userData);
  } catch (error) {
    if (!saved && uploaded?.public_id) {
      await cloudinary.uploader.destroy(uploaded.public_id).catch(() => {});
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ errors: Object.values(error.errors).map(item => item.message) });
    }
    if (error.code === 11000) return res.status(409).json({ message: 'El usuario o correo ya existe' });
    next(error);
  } finally {
    if (req.file?.path) await unlink(req.file.path).catch(() => {});
  }
});

// Login
authRouter.post('/login', async (req, res, next) => {
  try {
    if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
      return res.status(400).json({ message: 'Correo y contraseña requeridos' });
    }
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
    res.cookie('token', token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 });
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
      const error = new Error('No hay token');
      error.status = httpStatusCodes.UNAUTHORIZED;
      throw error;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
    const newToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie('token', newToken, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 });

    const { password, ...userData } = user._doc;
    res.status(200).json(userData);

  } catch (err) {
    next(err);
  }
});


authRouter.get('/logout', (req, res) => {
  res.clearCookie('token', cookieOptions);
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
