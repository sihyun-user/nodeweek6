const express = require('express');
const router = express.Router();
const likeControllers = require('../controllers/like');
const { isAuth } = require('../service/appVerify');

router
  .route('/likes')
  .get(isAuth, likeControllers.getLikeList);

router
  .route('/like/:post_id')
  .post(isAuth, likeControllers.updatePostLike)
  .delete(isAuth, likeControllers.deletePostLike);

module.exports = router