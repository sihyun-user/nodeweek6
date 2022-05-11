const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名未填寫']
    },
    content: {
      type: String,
      required: [true, 'Content未填寫']
    },
    image: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false // 不要在前台顯示
    }
  },
  {
    versionKey: false
  }
);
const Post = mongoose.model('Post', postSchema)

module.exports = Post