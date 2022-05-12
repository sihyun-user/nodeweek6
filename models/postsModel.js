const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user', // (指向 user model) 引用 user collection (用 ObjectId 撈取 user ollection 的資料)
      required: [true, '貼文 ID 未填寫']
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
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);
const Post = mongoose.model('Post', postSchema)

module.exports = Post