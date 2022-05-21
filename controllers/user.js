const User = require('../models/userModel');
const catchAsync = require('../service/catchAsync');
const appSuccess = require('../service/appSuccess');
const appError = require('../service/appError');

const users = {
  getUsers: catchAsync(async(req, res, next) => {
    /*
      #swagger.tags = ['User - 用戶(API測試用)']
      #swagger.description = '取得全部用戶 API'
      #swagger.responses[200] = {
        description: '用戶資訊',
        schema: { $ref: '#/definitions/getUser' }
      }
    */
    const data = await User.find();
    appSuccess({res, data});
  }),
  createUser: catchAsync(async(req, res, next) => {
    /*
      #swagger.tags = ['Users - 用戶(API測試用)']
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
    const { name, email, photo } = req.body;

    if (!name | !email) return appError(apiState.DATA_MISSING, next);
    
    await User.create({
      name: name,
      email: email,
      photo: photo
    });
    appSuccess({res, message:'建立用戶成功'});
  })
};

module.exports = users