const errorMsg = require('../service/errorMsg');
const responseHandler = require('../service/responseHandler');
const uploadHnadle = require('../service/uploadHnadle');
const IMAGE = require('../models/imageModel');

const uploads = {
  async getImages(req, res) {
    /*
      #swagger.tags = ['Uploads - 圖片']
      #swagger.description = '取得所有圖片 API'
      #swagger.responses[200] = { 
        description: '圖片資訊',
        schema: { $ref: '#/definitions/getUsers' }
      }
    */
    const allImages = await IMAGE.find();
    responseHandler.handleSuccess(res, allImages);
  },
  async uploadImages(req, res) {
    try {
      // 上傳圖片到圖床
      const file = req.file.buffer;
      const imgurData = await uploadHnadle.uploadImgur(file);
      const imgurLink = imgurData.link;

      /*
        #swagger.tags = ['Uploads - 圖片']
        #swagger.description = '上傳圖片 API'
        #swagger.parameters['body'] = {
          in: 'body',
          type: 'object',
          required: true,
          description: '資料格式',
          schema: { 
            $url: '圖片網址',
          }
        }
        #swagger.responses[200] = { 
          description: '圖片資訊',
          schema: { $ref: '#/definitions/uploadImages' }
        }
        #swagger.responses[400] = { 
          description: '錯誤資訊',
          schema: { status: false, message: '上傳圖片失敗，請重新確認' }
        }
      */
      const newImage =  await IMAGE.create({ 
        url: imgurLink
      });
      responseHandler.handleSuccess(res, newImage);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.IMAGE_POST)
    }
  } 
}

module.exports = uploads