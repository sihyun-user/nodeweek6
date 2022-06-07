const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const apiState = require('../service/apiState');  

exports.getLikeList = catchAsync(async(req, res, next) => {
  const data = await Post.find({
    likes: { $in: [req.user._id] }
  }, 'id user createdAt').populate({
    path: 'user',
    select: '_id name photo'
  }).exec();

  appSuccess({ res, data });
});

exports.updatePostLike = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;

  console.log(postId)
  
  const data = await Post.findOneAndUpdate({ _id: postId }, {
    $addToSet: { likes: req.user.id }
  },{new: true}).exec();

  appSuccess({ res, data });
});

exports.deletePostLike = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;
  
  const data = await Post.findOneAndUpdate({ _id: postId }, {
    $pull: { likes: req.user._id }
  }).exec();

  appSuccess({ res, data });
});