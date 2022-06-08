const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, '會員ID為必填']
    },
    content: {
      type: String,
      required: [true, '貼文內容為必填']
    },
    image: {
      type: String,
      default: ''
    },
    likes: [
      { 
        type: mongoose.Schema.ObjectId, 
        ref: 'user' 
      }
    ],
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