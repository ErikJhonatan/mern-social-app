import router from 'express';
import User from '../models/User.js';
import mongoose from 'mongoose';
import httpStatusCodes from 'http-status-codes';

const UsersRouter = router.Router();
UsersRouter.use((req, res, next) => {
  const id = req.path.split('/')[1];
  if (!mongoose.isObjectIdOrHexString(id)) return res.status(400).json({ message: 'ID de usuario inválido' });
  next();
});

// Get user
UsersRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.getUser(id);
    if (!user) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }
    const { password, ...publicUser } = user.toObject();
    res.json(publicUser);
  } catch (error) {
    next(error);
  }
});

// Delete User
UsersRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id: actorId } = req.auth;
    const { id } = req.params;
    
    if (id !== actorId && !req.user.isAdmin) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({
        message: "No puedes eliminar este usuario"
      });
    }

    const deletedUser = await User.deleteUser(id);
    if (!deletedUser) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }
    const { password, ...publicUser } = deletedUser.toObject();
    res.json(publicUser);
  } catch (error) {
    next(error);
  }
});

// Follow User
UsersRouter.post('/:followId/follow', async (req, res, next) => {
  try {
    const {id} = req.auth;
    const { followId } = req.params;
    res.json(await User.followUser(id, followId));
  } catch (error) {
    next(error);
  }
});

// Unfollow User
UsersRouter.post('/:unfollowId/unfollow', async (req, res, next) => {
  try {
    const {id} = req.auth;
    const { unfollowId } = req.params;
    res.json(await User.unfollowUser(id, unfollowId));
  } catch (error) {
    next(error);
  }
});

export default UsersRouter;
