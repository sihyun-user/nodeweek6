const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const apiState = require('../service/apiState');  

// 取得個人按讚貼文名單
exports.getLikeList = catchAsync(async(req, res, next) => {
  const data = await Post.find({
    likes: { $in: [req.user._id] }
  }, 'user createdAt').populate({
    path: 'user',
    select: 'name photo'
  }).exec();

  appSuccess({ res, data });
});

// 取得個人追蹤名單
exports.getFollowList = catchAsync(async(req, res, next) => {
  const data = await User.find({
    _id: req.user._id
  }, 'following')

  appSuccess({ res, data });
});

// 追蹤朋友
exports.followUser = catchAsync(async(req, res, next) => {
  const userId = req.user._id;
  const followId = req.params.user_id

  if (userId === followId) {
    return appError({statusCode: 400, message:'您無法追蹤自己'}, next);
  }

  const checkUser = await User.findById(followId).exec();
  if (!checkUser) return appError(apiState.DATA_NOT_FOUND, next);

  // 個人追蹤
  await User.updateOne(
    {
      _id: userId,
      'following.user': { $ne: followId }
    },
    {
      $addToSet: { following: { user: followId } }
    }
  );

  // 對方也追蹤
  await User.updateOne(
    {
      _id: followId,
      'followers.user': { $ne: userId }
    },
    {
      $addToSet: { followers: { user: userId } }
    }
  );

  appSuccess({ res, message: '追蹤成功' })
});

// 取消追蹤朋友
exports.unfollowUser = catchAsync(async(req, res, next) => {
  const userId = req.user._id;
  const followId = req.params.user_id

  if (userId === followId) {
    return appError({statusCode: 400, message:'您無法取消追蹤自己'}, next);
  }

  const checkUser = await User.findById(followId).exec();
  if (!checkUser) return appError(apiState.DATA_NOT_FOUND, next);

  // 個人取消追蹤
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: { following: { user: followId } }
    }
  );
  
  // 對方也取消追蹤
  await User.updateOne(
    {
      _id: followId,
    },
    {
      $pull: { followers: { user: userId } }
    }
  );

  appSuccess({ res, message: '取消追蹤成功' })
});