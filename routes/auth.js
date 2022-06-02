const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/auth');
const { isAuth } = require('../service/appVerify');

router.post('/auth/signup',
  /*
    #swagger.tags = ['Auth - 用戶']
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
  AuthControllers.signup
);

router.post('/auth/login',
  /*
    #swagger.tags = ['Auth - 用戶']
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
  AuthControllers.login
);

router.get('/auth/profile', isAuth, 
  /*
    #swagger.tags = ['Auth - 用戶']
    #swagger.description = '取得用戶資料 API'
    #swagger.security = [{'api_key': ['apiKeyAuth']}]
    #swagger.responses[200] = { 
      description: '用戶資訊',
      schema: { $ref: '#/definitions/profile' }
    }
  */
  AuthControllers.getProfile
);

router.post('/auth/updatePassword', isAuth, 
  /*
    #swagger.tags = ['Auth - 用戶']
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
  AuthControllers.updatePassword
);

module.exports = router;