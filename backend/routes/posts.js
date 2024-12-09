import router from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import httpStatusCodes from 'http-status-codes';

const PostsRouter = router.Router();
// create post
PostsRouter.post('/', async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(httpStatusCodes.CREATED).json(post);
  } catch (error) {
    next(error);
  }
});

// update a post
PostsRouter.put('/:id', async (req, res, next) => {
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
      $set: req.body
    }, { new: true }); 
    res.json(updatedPost).status(httpStatusCodes.OK);
  }
  catch (error) {
    next(error);
  }
});

// delete a post
PostsRouter.delete('/:id', async (req, res, next) => {
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
    res.json(deletedPost).status(httpStatusCodes.OK);
  }
  catch (error) {
    next(error);
  }
});

// like / dislike a post

PostsRouter.post('/:id/like', async (req, res, next) => {
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
    res.json(post).status(httpStatusCodes.OK);
  }
  catch (error) {
    next(error);
  }
});

// get timeline posts

PostsRouter.get('/timeline/all', async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.id);
    const userPosts = await Post.find({ userId: user._id });
    const friendPosts = await Promise.all(
      user.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts)).status(httpStatusCodes.OK);
  }
  catch (error) {
    next(error);
  }
});

export default PostsRouter;