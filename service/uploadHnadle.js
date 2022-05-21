const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const uploadModule = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,  // 限制 2 MB
  },
  fileFilter (req, file, callback) {  // 限制檔案格式為 image
    if (!file.mimetype.match(/^image/)) {
      callback(new Error('檔案格式錯誤'));
    } else {
      callback(null, true);
    }
  }
});

const uploadImgur = async (file) => {
  try {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('album', process.env.IMGUR_ALBUM_ID) // 指定的相簿

    const api = 'https://api.imgur.com/3/image'
    const response = await axios.post(api, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${process.env.IMGUR_ACCESS_TOKEN}` // 上傳到指定的相簿 (token有一個月期限)
        // 'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`
      }
    })
    return response.data.data;
  } catch (error) {
    console.log('圖片上傳imgur失敗');
  }
}

module.exports = {
  uploadModule,
  uploadImgur
}