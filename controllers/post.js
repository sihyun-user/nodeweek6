const Post = require('../models/postModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const apiState = require('../service/apiState');  
const { checkId } = require('../service/appVerify');

// 取得所有貼文 API
exports.getAllPosts = catchAsync(async(req, res, next) => {
  const query = req.query;

  // 貼文關鍵字搜尋與篩選
  const timeSort = query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
  const q = query.q !== undefined ? {'content': new RegExp(query.q)} : {};
  const data = await Post.find(q).populate({
    path: 'user',
    select: '_id name photo likes'
  }).populate({
    path: 'comments',
    select: 'comment user'
  }).sort(timeSort);

  appSuccess({res, data});
});

// 取得會員貼文 API
exports.getUserPosts = catchAsync(async(req, res, next) => {
  const userID = req.params.user_id;

  // 檢查 ObjectId 型別是否有誤
  if (userID && !checkId(userID)) {
    return appError(apiState.ID_ERROR, next);
  };

  const user= await User.findById(userID);
  if (!user) return appError(apiState.DATA_NOT_FOUND, next);

  const data = await Post.find({ user: userID }).exec();

  appSuccess({ res, data });
});

// 取得一則貼文 API
exports.getOnePost = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;

  // 檢查 ObjectId 型別是否有誤
  if (!checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  }

  const data = await Post.findById(postId).populate({
    path: 'user',
    select: '_id name photo'
  }).exec();

  if (!data) return appError(apiState.DATA_NOT_FOUND, next);

  appSuccess({res, data})
});

// 新增一則貼文 API
exports.createPost = catchAsync(async(req, res, next) => {
  const { content, image } = req.body;

  if (!content) return appError(apiState.DATA_MISSING, next);

  const data = await Post.create({
    user: req.user._id, 
    content, 
    image
  });

  appSuccess({res, data});
});

// 編輯一則貼文 API
exports.updatePost = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;
  const { image, content } = req.body;

  if (!content) return appError(apiState.DATA_MISSING, next);
  
  // 檢查 ObjectId 型別是否有誤
  if (!checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  }

  const data = await Post.findByIdAndUpdate(postId, {
    image: image,
    content: content,
  },{new: true}).exec();

  if(!data) return appError(apiState.DATA_NOT_FOUND, next);

  appSuccess({res, message:'編輯此筆貼文成功'})
});

// 刪除一則貼文 API
exports.deleteOnePost = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;

  // 檢查 ObjectId 型別是否有誤
  if (!checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  }

  const post = await Post.findByIdAndDelete(postId);

  if (!post) return appError(apiState.DATA_NOT_FOUND, next);
  
  appSuccess({res, message:'刪除此筆貼文成功'});
});

// 新增一則貼文的按讚 API
exports.addPostLike = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;

  // 檢查 ObjectId 型別是否有誤
  if (postId && !checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  };
  
  const data = await Post.findOneAndUpdate({ _id: postId }, {
    $addToSet: { likes: req.user.id }
  },{new: true}).exec();

  if (!data) return appError(apiState.DATA_NOT_FOUND, next);

  appSuccess({ res, message: '貼文按讚成功' });
});

// 取消一則貼文的按讚 API
exports.canclePostLike = catchAsync(async(req, res, next) => {
  const postId = req.params.post_id;

  // 檢查 ObjectId 型別是否有誤
  if (postId && !checkId(postId)) {
    return appError(apiState.ID_ERROR, next);
  };
  
  const data = await Post.findOneAndUpdate({ _id: postId }, {
    $pull: { likes: req.user._id }
  }).exec();

  if (!data) return appError(apiState.DATA_NOT_FOUND, next);

  appSuccess({ res, message: '貼文取消按讚成功' });
});

// 新增一則貼文的留言 API 
exports.craetePostComment = catchAsync(async(req, res, next) => {
  const user = req.user._id;
  const post =  req.params.post_id;
  const { comment } = req.body;

  if (!comment) return (apiState.DATA_NOT_FOUND, next);

  // 檢查 ObjectId 型別是否有誤
  if (post && !checkId(post)) {
    return appError(apiState.ID_ERROR, next);
  };

  const data = await Comment.create({
    post, user, comment
  });

  appSuccess({ res, data })
});
