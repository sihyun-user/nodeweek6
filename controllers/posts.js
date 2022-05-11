const errorMsg = require('../service/errorMsg');
const responseHandler = require('../service/responseHandler');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');

const posts = {
  async getPosts(req, res) {
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
    await Post.deleteMany();
    responseHandler.handleSuccess(res, []);
  },
  async deleteOnePosts(req, res) {
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