const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/post');

router.get('/posts', PostsControllers.getAllPost);

router.get('/post/:post_id', PostsControllers.getOnePost);

router.post('/post', PostsControllers.createPost);

router.patch('/post/:post_id', PostsControllers.updatePost);

router.delete('/posts', PostsControllers.deleteAllPost);

router.delete('/post/:post_id', PostsControllers.deleteOnePost);

module.exports = router