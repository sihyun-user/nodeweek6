const errorMsg = require('../service/errorMsg');
const responseHandler = require('../service/responseHandler');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

const posts = {
  async getPosts(req, res) {
    /*
      #swagger.tags = ['Posts - 貼文']
      #swagger.description = '取得全部貼文 API'
      #swagger.responses[200] = { 
        description: '貼文資訊',
        schema: {
          "status": true,
          "data": [{
              "_id": "627b71adbd87b7922f3688c7",
              "user": {
                "_id": "62787493c586f2cd6a79da0e",
                "name": "Ada",
                "photo": "https://thumb.fakeface.rest/thumb_female_27_5a94a297efb15caf0e3d769ce1694953e8bf33e2.jpg"
              },
              "content": "測試 ref 關聯資料 4",
              "image": "",
              "likes": 0
          }]
        }
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
        #swagger.description = '取得全部貼文 API'
        #swagger.parameters['body'] = {
          in: 'body',
          description: '資料格式'
        }
      */
      const { user, content } = req.body;
  
      const newPost = await Post.create({
        user: user,
        content : content
      });
    
      responseHandler.handleSuccess(res, newPost);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.POST);
    };
  },
  async deleteAllPosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     */
    await Post.deleteMany();
    responseHandler.handleSuccess(res, []);
  },
  async deleteOnePosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     */
    try {
      const id = req.params.id;
      const postData = await Post.find({'_id': id});

      if(postData.length == 0) throw error; 

      await Post.findByIdAndDelete(id);

      allPosts = await Post.find();

      responseHandler.handleSuccess(res, allPosts);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.DELETE);
    }
  },
  async updatePosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     */
    try {
      const id = req.params.id;
      const { name, content } = req.body;

      const postData = await Post.find({'_id': id});

      if(postData.length == 0 ) throw error;

      const updateData = await Post.findByIdAndUpdate(id, {
        name: name,
        content: content,
      },{new: true});

      responseHandler.handleSuccess(res, updateData);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.PATCH);
    }
  }
};

module.exports = posts