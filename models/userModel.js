const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '用戶名為必填']
    },
    email: {
      type: String,
      required: [true, 'Email為必填'],
      unique: true,
      lowercase: true,
      select: false
    },
    photo: {
      type: String,
      default: null
    },
  },
  {
    versionKey: false
  }
);

const User = mongoose.model('user', userSchema);

module.exports = User;