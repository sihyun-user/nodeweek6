const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const apiState = require('../service/apiState'); 
const handleVerify = require('../service/appVerify');

exports.signup = catchAsync(async(req, res, next) => {
  let { email, password, confirmPassword, name } = req.body;
  // 內容不為空
  if (!email || !password || !confirmPassword || !name) {
    return appError(apiState.DATA_MISSING, next);
  };
  // 密碼正確
  if (password !== confirmPassword) {
    return appError({statusCode: 400, message:'密碼不一致'}, next);
  };
  // 密碼8碼以上
  if (!validator.isLength(password, {min:8})) {
    return appError({statusCode: 400, message:'密碼字數低於8碼'}, next);
  };
  // 是否為Email
  if (!validator.isEmail(email)) {
    return appError({statusCode: 400, message:'E-mail格式錯誤'}, next);
  };
  // 信箱不重複
  const data = await User.findOne({email}).exec();
  if (data) {
    return appError({statusCode: 400, message:'信箱已被使用'}, next);
  };

  // 加密密碼
  password = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password
  });

  handleVerify.generateSendJWT(newUser, res)
}); 

exports.login = catchAsync(async(req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) 
  return appError(apiState.DATA_MISSING, next);

  const user = await User.findOne({ email }).select('+password').exec();

  if (!user) {
    return appError({statusCode: 400, message:'E-mail帳號錯誤'}, next);
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return appError({statusCode: 400, message:'密碼錯誤'}, next);
  }
  
  handleVerify.generateSendJWT(user, res)
});

exports.updatePassword = catchAsync(async(req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return appError(apiState.DATA_MISSING, next);
  }

  if (password !== confirmPassword) {
    return appError({statusCode: 400, message:'密碼不一致'}, next);
  };

  newPassword = await bcrypt.hash(password, 8);

  const user = await User.findByIdAndUpdate(req.user._id, {
    password: newPassword
  }).exec();

  handleVerify.generateSendJWT(user, res);
});

exports.getProfile = catchAsync(async(req, res, next) => {
  appSuccess({res, data: req.user})
});

exports.updateProfile = catchAsync(async(req, res, next) => {
  const userId = req.user._id;
  const { name, sex, photo } = req.body;

  if (sex !== 'male' && sex !== 'female') {
    return appError({statusCode: 400, message:'sex 僅接受 male、female'}, next);
  }

  const data = await User.findByIdAndUpdate(userId, {
    name, sex, photo
  },{new: true, runValidators: true}).exec();

  appSuccess({res, data})
})