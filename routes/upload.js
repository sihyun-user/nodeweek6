const express = require('express');
const router = express.Router();
const UploadsControllers = require('../controllers/upload');
const { uploadModule } = require('../service/uploadHnadle');

router.get('/uploads',
  /*
    #swagger.tags = ['Upload - 圖片']
    #swagger.description = '取得所有圖片 API'
    #swagger.responses[200] = { 
      description: '圖片資訊',
      schema: { $ref: '#/definitions/getImages' }
    }
  */
  UploadsControllers.getAllImage
);

router.post('/upload',
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
      schema: { $ref: '#/definitions/uploadImage' }
    }
  */
  uploadModule.single('image'), UploadsControllers.uploadImage
);

router.delete('/uploads',
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
  UploadsControllers.deleteAllImage
);

module.exports = router