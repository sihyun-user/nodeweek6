const express = require('express');
const router = express.Router();
const likeControllers = require('../controllers/like');
const { isAuth } = require('../service/appVerify');

router
  .route('/likes')
  .get(isAuth, 
    /*
      #swagger.tags = ['Like - 按讚']
      #swagger.description = '取得個人按讚列表 API'
      #swagger.security = [{'api_key': ['apiKeyAuth']}]  
      #swagger.responses[200] = { 
        description: '按讚資訊',
        schema: { $ref: '#/definitions/getLikeList' }
      }
    */
    likeControllers.getLikeList
  );


module.exports = router