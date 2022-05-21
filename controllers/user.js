const User = require('../models/userModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');

exports.getUsers = catchAsync(async(req, res, next) => {
  const data = await User.find();
  appSuccess({res, data});
})

exports.createUser = catchAsync(async(req, res, next) => {
  const { name, email, photo } = req.body;

  if (!name | !email) return appError(apiState.DATA_MISSING, next);
  
  await User.create({
    name: name,
    email: email,
    photo: photo
  });
  appSuccess({res, message:'建立用戶成功'});
})