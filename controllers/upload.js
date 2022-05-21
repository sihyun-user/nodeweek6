const IMAGE = require('../models/imageModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');
const uploadHnadle = require('../service/uploadHnadle');

const uploads = {
  getAllImage: catchAsync(async(req, res, next) => {
    /*
      #swagger.tags = ['Upload - 圖片']
      #swagger.description = '取得所有圖片 API'
      #swagger.responses[200] = { 
        description: '圖片資訊',
        schema: { $ref: '#/definitions/getImages' }
      }
    */
    const data = await IMAGE.find();
    appSuccess({res, data});
  }),
  uploadImage: catchAsync(async(req, res, next) => {
    // 上傳圖片到圖床
    const file = req.file.buffer;
    const imgurData = await uploadHnadle.uploadImgur(file);
    if (!imgurData) return appError({
      statusCode: 400,
      message:'上傳失敗，圖片格式錯誤或無法上傳'
    }, next);

    /*
      #swagger.tags = ['Upload - 圖片']
      #swagger.description = '上傳圖片 API'
      #swagger.consumes = ['multipart/form-data']
      #swagger.parameters['singleFile'] = {
        in: 'formData',
        name: 'image',
        type: 'file',
        required: true,
        description: '圖檔',
        schema: { 
          $image: '圖檔',
        }
      }
      #swagger.responses[200] = { 
        description: '圖片資訊',
        schema: { $ref: '#/definitions/uploadImages' }
      }
    */
    const imgurLink = imgurData.link;
    await IMAGE.create({ url: imgurLink });
    appSuccess({res, message:'上傳圖片成功'});
  }),
  deleteAllImage: catchAsync(async(req, res, next) => {
    /*
      #swagger.tags = ['Upload - 圖片']
      #swagger.description = '刪除全部圖片 API'
      #swagger.security = [{'apikeyAuth': []}]
      #swagger.responses[200] = {
        description: '圖片資訊',
        schema: {
          status: true,
          message: '刪除所有圖片成功'
        }
      }
    */
    await IMAGE.deleteMany();
    appSuccess({res, message:'刪除所有圖片成功'});
  })
};

module.exports = uploads;