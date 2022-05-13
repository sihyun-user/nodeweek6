const errorMsg = require('../service/errorMsg');
const responseHandler = require('../service/responseHandler');
const User = require('../models/userModel')

const users = {
  async getUsers(req, res) {
    /*
      #swagger.tags = ['Users - 用戶(API測試用)']
      #swagger.description = '取得全部用戶 API'
      #swagger.responses[200] = {
        description: '用戶資訊',
        schema: { $ref: '#/definitions/getUsers' }
      }
    */
    const allUsers = await User.find();
    responseHandler.handleSuccess(res, allUsers);
  },
  async createUsers(req, res) {
    try {
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
          schema: { $ref: '#/definitions/createUsers' }
        }
        #swagger.responses[400] = {
          description: '錯誤資訊',
          schema: { status: false, message: '欄位未填寫正確' }
        }
      */
      const { body } = req;
      
      const newUsers = await User.create({
        name: body.name,
        email: body.email,
        photo: body.photo
      });

      responseHandler.handleSuccess(res, newUsers);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.USER_POST);
    }
    
  },
  async deleteAllUsers(req, res) {
    /*
      #swagger.tags = ['Users - 用戶(API測試用)']
      #swagger.description = '刪除全部用戶 API'
      #swagger.responses[200] = {
        description: '用戶資訊',
        schema: {
          status: true,
          data: []
        }
      }
    */
    await User.deleteMany();
    responseHandler.handleSuccess(res, []);
  }
}

module.exports = users