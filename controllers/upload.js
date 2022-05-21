const IMAGE = require('../models/imageModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const uploadHnadle = require('../service/uploadHnadle');

exports.getAllImage = catchAsync(async(req, res, next) => {
  const data = await IMAGE.find();
  appSuccess({res, data});
})

exports.uploadImage = catchAsync(async(req, res, next) => {
  // 上傳圖片到圖床
  const file = req.file.buffer;
  const imgurData = await uploadHnadle.uploadImgur(file);
  if (!imgurData) return appError({
    statusCode: 400,
    message:'上傳失敗，圖片格式錯誤或無法上傳'
  }, next);

  const imgurLink = imgurData.link;
  await IMAGE.create({ url: imgurLink });
  appSuccess({res, message:'上傳圖片成功'});
})

exports.deleteAllImage = catchAsync(async(req, res, next) => {
  await IMAGE.deleteMany();
  appSuccess({res, message:'刪除所有圖片成功'});
})