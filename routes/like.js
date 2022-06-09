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

router.post('/follow/:user_id', isAuth, 
  /*
    #swagger.tags = ['follow - 追蹤']
    #swagger.description = '追蹤朋友 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]  
    #swagger.responses[200] = { 
      description: '追蹤資訊',
      schema: { 
        status: true,
        message: '追蹤成功'
      }
    }
  */
  likeControllers.followUser
);

router.post('/unfollow/:user_id', isAuth, 
  /*
    #swagger.tags = ['follow - 追蹤']
    #swagger.description = '取消追蹤朋友 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]  
    #swagger.responses[200] = { 
      description: '追蹤資訊',
      schema: { 
        status: true,
        message: '取消追蹤成功'
      }
    }
  */
  likeControllers.unfollowUser
);


module.exports = router