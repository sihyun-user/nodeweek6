const express = require('express');
const router = express.Router();
const PostsControllers = require('../controllers/post');

router.get('/posts', 
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '取得貼文列表 API'
    #swagger.responses[200] = { 
      description: '貼文資訊',
      schema: { $ref: '#/definitions/getPosts' }
    }
  */
  PostsControllers.getAllPost
);

router.get('/post/:post_id',
  /*
    #swagger.tags= ['Post - 貼文']
    #swagger.description = '取得單筆貼文 API'
    #swagger.responses[200] = { 
      description: '貼文資訊',
      schema: { $ref: '#/definitions/getOnePost' }
    }
  */  
  PostsControllers.getOnePost
);

router.post('/post',
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '建立貼文 API'
    #swagger.parameters['body'] = {
      in: 'body',
      type: 'object',
      required: true,
      description: '資料格式',
      schema: { 
        $user: '用戶ID',
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
  PostsControllers.createPost
);

router.patch('/post/:post_id',
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '更新此筆貼文 API'
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
  PostsControllers.updatePost
);

router.delete('/posts',
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '刪除全部貼文 API'
    #swagger.responses[200] = {
      description: '貼文資訊',
      schema: {
        status: true,
        message: '刪除所有貼文成功'
      }
    }
  */
  PostsControllers.deleteAllPost
);

router.delete('/post/:post_id',
  /*
    #swagger.tags = ['Post - 貼文']
    #swagger.description = '刪除此筆貼文 API'
    #swagger.responses[200] = {
      description: '貼文資訊',
      schema: { 
        status: true,
        message: '刪除此筆貼文成功'
      }
    }
  */
  PostsControllers.deleteOnePost
);

module.exports = router