const Posts = require('../models/postsModel');
const errorMsg = require('../service/errorMsg');
const responseHandler = require('../service/responseHandler');

const posts = {
  async getPosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     */
    const allPosts = await Posts.find();
    responseHandler.handleSuccess(res, allPosts);
  },
  async createPosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     */
    try {
      const { name, content } = req.body;
  
      if (!name || !content) throw error;
  
      const newPost = await Posts.create({
        name: name,
        content : content
      });
    
      responseHandler.handleSuccess(res, newPost);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.POST);
    };
  },
  async deleteAllPosts(req, res) {
    await Posts.deleteMany();
    responseHandler.handleSuccess(res, []);
  },
  async deleteOnePosts(req, res) {
    try {
      const id = req.params.id;
      const postData = await Posts.find({'_id': id});

      if(postData.length == 0) throw error; 

      await Posts.findByIdAndDelete(id);

      allPosts = await Posts.find();

      responseHandler.handleSuccess(res, allPosts);
    } catch (error) {
      responseHandler.handleError(res, errorMsg.DELETE);
    }
  },
  async updatePosts(req, res) {
    try {
      const id = req.params.id;
      const { name, content } = req.body;

      const postData = await Posts.find({'_id': id});

      if(!name || !content || postData.length == 0 ) throw error;

      const updateData = await Posts.findByIdAndUpdate(id, {
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