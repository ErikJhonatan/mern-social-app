import router from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import httpStatusCodes from 'http-status-codes';
import { validatePostBody, validatePostId } from '../middlewares/validatePost.js';

const PostsRouter = router.Router();
// create post
PostsRouter.post('/', validatePostBody, async (req, res, next) => {
  const newPost = new Post({ ...req.postData, userId: req.auth.id });
  try {
    const post = await newPost.save();
    res.status(httpStatusCodes.CREATED).json(post);
  } catch (error) {
    next(error);
  }
});

// update a post
PostsRouter.put('/:id', validatePostId, validatePostBody, async (req, res, next) => {
  try {
    const userAuthId = req.auth.id;
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error("Post no encontrado");
      err.status = httpStatusCodes.NOT_FOUND;
      throw err;
    }
    if (post.userId !== userAuthId) {
      const err = new Error("No puedes editar este post");
      err.status = httpStatusCodes.UNAUTHORIZED;
      throw err;
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      $set: req.postData
    }, { new: true, runValidators: true });
    res.status(httpStatusCodes.OK).json(updatedPost);
  }
  catch (error) {
    next(error);
  }
});

// delete a post
PostsRouter.delete('/:id', validatePostId, async (req, res, next) => {
  try {
    const userAuthId = req.auth.id;
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error("Post no encontrado");
      err.status = httpStatusCodes.NOT_FOUND;
      throw err;
    }
    if (post.userId !== userAuthId) {
      const err = new Error("No puedes eliminar este post");
      err.status = httpStatusCodes.UNAUTHORIZED;
      throw err;
    }
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(httpStatusCodes.OK).json(deletedPost);
  }
  catch (error) {
    next(error);
  }
});

// like / dislike a post

PostsRouter.post('/:id/like', validatePostId, async (req, res, next) => {
  try {
    const userAuthId = req.auth.id;
    const post = await Post.findById(req.params.id);
    if (!post) {
      const err = new Error("Post no encontrado");
      err.status = httpStatusCodes.NOT_FOUND;
      throw err;
    }
    if (post.likes.includes(userAuthId)) {
      post.likes = post.likes.filter((like) => like !== userAuthId);
    } else {
      post.likes.push(userAuthId);
    }
    await post.save();
    res.status(httpStatusCodes.OK).json(post);
  }
  catch (error) {
    next(error);
  }
});

// get timeline posts

PostsRouter.get('/timeline/all', async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.id);
    const posts = await Post.find({ userId: { $in: [req.auth.id, ...user.followings] } }).sort({ createdAt: -1 });
    res.status(httpStatusCodes.OK).json(posts);
  }
  catch (error) {
    next(error);
  }
});

export default PostsRouter;
