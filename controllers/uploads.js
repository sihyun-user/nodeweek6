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
  },
  async deleteAllImages(req, res) {
    /*
      #swagger.tags = ['Uploads - 圖片']
      #swagger.description = '刪除全部圖片 API'
      #swagger.security = [{'apikeyAuth': []}]
      #swagger.responses[200] = {
        description: '圖片資訊',
        schema: {
          status: true,
          data: []
        }
      }
    */
    await IMAGE.deleteMany();
    responseHandler.handleSuccess(res, []);
  }
}

module.exports = uploads