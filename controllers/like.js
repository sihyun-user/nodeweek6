const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');

// 取得個人按讚列表
exports.getLikeList = catchAsync(async(req, res, next) => {
  const data = await Post.find({
    likes: { $in: [req.user._id] }
  }, 'id user createdAt').populate({
    path: 'user',
    select: '_id name photo'
  }).exec();

  appSuccess({ res, data });
});