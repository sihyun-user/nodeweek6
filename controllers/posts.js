const errorMsg = require('../service/errorMsg');
const responseHandler = require('../service/responseHandler');
const Post = require('../models/postModel');
const User = require('../models/userModel');

const posts = {
  async getPosts(req, res) {
    /*
      #swagger.tags = ['Posts - 貼文']
      #swagger.description = '取得貼文 API'
      #swagger.responses[200] = { 
        description: '貼文資訊',
        schema: { $ref: '#/definitions/getPosts' }
      }
    */

    // 貼文關鍵字搜尋與篩選
    const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
    const q = req.query.q !== undefined ? {'content': new RegExp(req.query.q)} : {};
    const allPosts = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    responseHandler.handleSuccess(res, allPosts);
  },
  async createPosts(req, res) {
    try {
      /*
        #swagger.tags = ['Posts - 貼文']
        #swagger.description = '建立貼文 API'
        #swagger.parameters['body'] = {
          in: 'body',
          type: 'object',
          required: true,
          description: '資料格式',
          schema: { 
            $user: '6277c7231f5cea212fc08c8a',
            $content: '貼文內容',
            image: '圖片網址',
          }
        }
        #swagger.responses[200] = { 
          description: '貼文資訊',
          schema: { $ref: '#/definitions/createPosts' }
        }
        #swagger.responses[400] = { 
          description: '錯誤資訊',
          schema: { status: false, message: '欄位未填寫正確' }
        }
      */
      const { body } = req;

      const newPost = await Post.create({
        user: body.user,
        content : body.content,
        image: body.image
      });
      responseHandler.handleSuccess(res, newPost);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.POST);
    };
  },
  async deleteAllPosts(req, res) {
    /*
      #swagger.tags = ['Posts - 貼文']
      #swagger.description = '刪除全部貼文 API'
      #swagger.responses[200] = {
        description: '貼文資訊',
        schema: {
          status: true,
          data: []
        }
      }
    */
    await Post.deleteMany();
    responseHandler.handleSuccess(res, []);
  },
  async deleteOnePosts(req, res) {
    try {
      /*
        #swagger.tags = ['Posts - 貼文']
        #swagger.description = '刪除單則貼文 API'
        #swagger.responses[200] = {
          description: '貼文資訊',
          schema: { $ref: '#/definitions/deleteOnePosts' }
        }
        #swagger.responses[400] = { 
          description: '錯誤資訊',
          schema: { status: false, message: '刪除失敗，欄位未填寫正確，或無此ID' }
        }
      */
      const id = req.params.id;

      const Postsdata = await Post.findByIdAndDelete(id);
      
      if (!Postsdata) throw error;

      allPosts = await Post.find();

      responseHandler.handleSuccess(res, allPosts);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.DELETE);
    }
  },
  async updatePosts(req, res) {
    try {
      /*
        #swagger.tags = ['Posts - 貼文']
        #swagger.description = '更新單則貼文 API'
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
          schema: { $ref: '#/definitions/updatePosts' }
        }
        #swagger.responses[400] = { 
          description: '錯誤資訊',
          schema: { status: false, message: '欄位未填寫正確，或無此ID' }
        }
      */
      const id = req.params.id;
      const { name, content } = req.body;

      const updateData = await Post.findByIdAndUpdate(id, {
        name: name,
        content: content,
      },{new: true});

      if (!updateData) throw error;

      responseHandler.handleSuccess(res, updateData);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.PATCH);
    }
  }
};

module.exports = posts