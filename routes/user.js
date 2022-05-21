const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/user');

router.get('/users',
  /*
    #swagger.tags = ['User - 用戶(API測試用)']
    #swagger.description = '取得全部用戶 API'
    #swagger.responses[200] = {
      description: '用戶資訊',
      schema: { $ref: '#/definitions/getUsers' }
    }
  */
  UsersControllers.getUsers
);

router.post('/user',
  /*
    #swagger.tags = ['User - 用戶(API測試用)']
    #swagger.description = '建立用戶 API'
    #swagger.parameters['body'] = {
      in: 'body',
      type: 'object',
      required: true,
      description: '資料格式',
      schema: {
        $name: '用戶名稱',
        $email: 'test@gmail.com',
        photo: ''
      }
    }
    #swagger.responses[200] = {
      description: '用戶資訊',
      schema: {
        status: true,
        message: '建立用戶成功'
      }
    }
  */
  UsersControllers.createUser
);

module.exports = router