const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const apiState = require('../service/apiState');  

const generateSendJWT = (user, res) => {
  const token = jwt.sign({id:user._id, name: user.name}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY
  });
  
  user.password = undefined;

  let data = { user, token };

  appSuccess({res, data});
};

exports.signup = catchAsync(async(req, res, next) => {
  let { email, password, confirmPassword, name } = req.body;
  // 內容不為空
  if (!email || !password || !confirmPassword || !name) {
    return appError(apiState.DATA_MISSING, next);
  };
  // 密碼正確
  if (password !== confirmPassword) {
    return appError('密碼不一致', next);
  };
  // 密碼8碼以上
  if (!validator.isLength(password, {min:8})) {
    return appError('密碼字數低於8碼', next);
  };
  // 是否為Email
  if (!validator.isEmail(email)) {
    return appError('Email格式不正確', next);
  };

  // 加密密碼
  password = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password
  });

  generateSendJWT(newUser, res)
}); 

exports.login = catchAsync(async(req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;
});