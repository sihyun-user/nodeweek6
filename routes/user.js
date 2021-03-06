const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user');
const { isAuth } = require('../service/appVerify');

router.post('/user/signup',
  /*
    #swagger.tags = ['User - 用戶']
    #swagger.description = '註冊 API'
    #swagger.parameters['body'] = {
      in: 'body',
      type: 'object',
      required: true,
      description: '資料格式',
      schema: { 
        $name: '',
        $email: '',
        $password: '',
        $confirmPassword: '',
      }
    }
    #swagger.responses[200] = { 
      description: '註冊資訊',
      schema: { $ref: '#/definitions/login' }
    }
  */
  UserControllers.signup
);

router.post('/user/login',
  /*
    #swagger.tags = ['User - 用戶']
    #swagger.description = '登入 API'
    #swagger.parameters['body'] = {
      in: 'body',
      type: 'object',
      required: true,
      description: '資料格式',
      schema: { 
        $email: '',
        $password: '',
      }
    }
    #swagger.responses[200] = { 
      description: '登入資訊',
      schema: { $ref: '#/definitions/login' }
    }
  */
  UserControllers.login
);

router.post('/user/updatePassword', isAuth, 
  /*
    #swagger.tags = ['User - 用戶']
    #swagger.description = '更新密碼 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]
    #swagger.parameters['body'] = {
      in: 'body',
      type: 'object',
      required: true,
      description: '資料格式',
      schema: { 
        $password: '',
        $confirmPassword: '',
      }
    }
    #swagger.responses[200] = { 
      description: '更新密碼資訊',
      schema: { $ref: '#/definitions/updatePassword' }
    }
  */
  UserControllers.updatePassword
);

router
  .route('/user/profile')
  .get(isAuth, 
    /*
      #swagger.tags = ['User - 用戶']
      #swagger.description = '取得用戶資料 API'
      #swagger.security = [{'api_key': ['apiKeyAuth']}]
      #swagger.responses[200] = { 
        description: '用戶資訊',
        schema: { $ref: '#/definitions/profile' }
      }
    */
    UserControllers.getProfile
  )
  .patch(isAuth, 
    /*
      #swagger.tags = ['User - 用戶']
      #swagger.description = '更新用戶資料 API'
      #swagger.security = [{'api_key': ['apiKeyAuth']}]
      #swagger.parameters['body'] = {
        in: 'body',
        type: 'object',
        required: true,
        description: '資料格式',
        schema: { 
          $name: '',
          $sex: '',
          photo: ''
        }
      }
      #swagger.responses[200] = { 
        description: '更新用戶資訊',
        schema: { $ref: '#/definitions/profile' }
      }
    */
    UserControllers.updateProfile
  )

module.exports = router;