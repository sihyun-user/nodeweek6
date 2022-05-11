const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/posts');

router.get('/', PostsControllers.getPosts);

router.post('/', PostsControllers.createPosts);

router.delete('/', PostsControllers.deleteAllPosts);

router.delete('/:id', PostsControllers.deleteOnePosts);

router.patch('/:id', PostsControllers.updatePosts);

module.exports = router