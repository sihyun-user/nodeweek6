const Post = require('../models/postModel');
const User = require('../models/userModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const handleVerify = require('../service/appVerify');
const apiState = require('../service/apiState');  

exports.getAllPost = catchAsync(async(req, res, next) => {
  const query = req.query;
    
  // 檢查 ObjectId 型別是否有誤
  if (query.user_id && !handleVerify.checkId(query.user_id)) {
    return appError(apiState.ID_ERROR, next);
  }

  // 貼文關鍵字搜尋與篩選
  const timeSort = query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
  const q = query.q !== undefined ? {'content': new RegExp(query.q)} : {};
  const userId = query.user_id ? {user: query.user_id} : {};
  const data = await Post.find({...userId, ...q}).populate({
    path: 'user',
    select: '_id name photo'
  }).sort(timeSort);

  appSuccess({res, data});
})

exports.getOnePost = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;

  // 檢查 ObjectId 型別是否有誤
  if (!handleVerify.checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  }

  const data = await Post.findById(postId).populate({
    path: 'user',
    select: '_id name photo'
  }).exec();
  if (!data) return appError(apiState.DATA_NOT_FOUND, next);

  appSuccess({res, data})
})

exports.createPost = catchAsync(async(req, res, next) => {
  const { user, content, image, likes, createdAt } = req.body;

  if (!user || !content) return appError(apiState.DATA_MISSING, next);

  // 檢查 ObjectId 型別是否有誤
  if (!handleVerify.checkId(user)) {
    return appError(apiState.ID_ERROR, next);
  }

  // 檢查用戶資料
  const userData = await User.findById(user).exec();
  if(!userData) return appError({
    statusCode: 400,
    message: '查無用戶資料，無法新增貼文'
  }, next);

  const data = await Post.create({
    user, content, image, likes, createdAt
  });

  appSuccess({res, message:'新增貼文成功'});
})

exports.updatePost = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;
  const { image, content } = req.body;

  if (!content) return appError(apiState.DATA_MISSING, next);
  
  // 檢查 ObjectId 型別是否有誤
  if (!handleVerify.checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  }

  const data = await Post.findByIdAndUpdate(postId, {
    image: image,
    content: content,
  },{new: true});

  if(!data) return appError(apiState.DATA_NOT_FOUND, next);

  appSuccess({res, message:'編輯此筆貼文成功'})
})

exports.deleteOnePost = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;

  // 檢查 ObjectId 型別是否有誤
  if (!handleVerify.checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  }

  const post = await Post.findByIdAndDelete(postId);
  if (!post) return appError(apiState.DATA_NOT_FOUND, next);
  
  appSuccess({res, message:'刪除此筆貼文成功'});
})

exports.deleteAllPost = catchAsync(async(req, res, next) => {
  await Post.deleteMany();
  appSuccess({res, message:'刪除所有貼文成功'});
})


// module.exports = posts