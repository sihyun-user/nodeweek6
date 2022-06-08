const express = require('express');
const router = express.Router();
const PostControllers = require('../controllers/post');
const { isAuth } = require('../service/appVerify');

router.get('/posts', isAuth, 
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '取得貼文列表 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]
    #swagger.parameters['timeSort'] = {
      in: 'query',
      type: 'String',
      description: '時間排序 [desc / asc]',
    },
    #swagger.parameters['q'] = {
      in: 'query',
      type: 'String',
      description: '關鍵字搜尋',
    },
    #swagger.responses[200] = { 
      description: '貼文資訊',
      schema: { $ref: '#/definitions/getPosts' }
    }
  */
  PostControllers.getAllPosts
);

router.get('/posts/:user_id', isAuth, 
  /*
    #swagger.tags= ['Post - 貼文']
    #swagger.description = '取得會員貼文 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]
    #swagger.responses[200] = { 
      description: '貼文資訊',
      schema: { $ref: '#/definitions/getPosts' }
    }
  */
  PostControllers.getUserPosts
);

router
  .route('/post')
  .post(isAuth,
    /*
      #swagger.tags = ['Post - 貼文']
      #swagger.description = '建立貼文 API'
      #swagger.security = [{'api_key': ['apiKeyAuth']}]
      #swagger.parameters['body'] = {
        in: 'body',
        type: 'object',
        required: true,
        description: '資料格式',
        schema: { 
          $content: '貼文內容',
          image: '圖片網址',
        }
      }
      #swagger.responses[200] = { 
        description: '貼文資訊',
        schema: {
          status: true,
          message: '新增貼文成功'
        }
      }
    */
    PostControllers.createPost
  );

router
  .route('/post/:post_id')
  .get(isAuth,
    /*
      #swagger.tags= ['Post - 貼文']
      #swagger.description = '取得單筆貼文 API'
      #swagger.security = [{'api_key': ['apiKeyAuth']}]
      #swagger.responses[200] = { 
        description: '貼文資訊',
        schema: { $ref: '#/definitions/getOnePost' }
      }
    */
    PostControllers.getOnePost
  )
  .patch(isAuth,
    /*
      #swagger.tags = ['Post - 貼文']
      #swagger.description = '更新此筆貼文 API'
      #swagger.security = [{'api_key': ['apiKeyAuth']}]
      #swagger.parameters['body'] = {
        in: 'body',
        type: 'object',
        required: true,
        description: '資料格式',
        schema: { 
          $content: '貼文內容',
          image: '圖片網址',
        }
      }
      #swagger.responses[200] = {
        description: '貼文資訊',
        schema: { 
          status: true,
          message: '編輯此筆貼文成功'
        }
      }
    */
    PostControllers.updatePost
  )
  .delete(isAuth,
    /*
      #swagger.tags = ['Post - 貼文']
      #swagger.description = '刪除此筆貼文 API'
      #swagger.security = [{'api_key': ['apiKeyAuth']}]
      #swagger.responses[200] = {
        description: '貼文資訊',
        schema: { 
          status: true,
          message: '刪除此筆貼文成功'
        }
      }
    */
    PostControllers.deleteOnePost
  );

router.post('/post/:post_id/like', isAuth, 
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '貼文按讚 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]  
    #swagger.responses[200] = {
      description: '貼文資訊',
      schema: { 
        status: true,
        message: '貼文按讚成功'
      }
    }
  */
  PostControllers.addPostLike
);

router.post('/post/:post_id/unlike', isAuth,
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '取消貼文按讚 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]  
    #swagger.responses[200] = {
      description: '貼文資訊',
      schema: { 
        status: true,
        message: '取消貼文按讚成功'
      }
    }
  */
  PostControllers.canclePostLike
);

module.exports = router