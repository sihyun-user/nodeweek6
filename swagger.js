const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Meta API', // 文件名稱
    description: '範例生成文件' // 文件描述
  },
  host: 'fast-mountain-34375.herokuapp.com', // (重要) 本地: localhost:3005 | heroku: fast-mountain-34375.herokuapp.com
  schemes: ['http', 'https'], // swagger文件支援哪幾種模式
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: '請加上 API Token'
    }
  },
  definitions: {
    getPosts: {
      status: true,
      data: [{
        _id: '貼文ID',
        user: {
          _id: '會員ID',
          name: '會員名',
          photo: '頭貼網址'
        },
        content: '貼文內容',
        image: '圖片網址',
        likes: ['會員ID'],
        createdAt: '建立時間'
      }]
    },
    getOnePost: {
      status: true,
      data: {
        _id: '貼文ID',
        user: {
          _id: '會員ID',
          name: '會員名',
          photo: '頭貼網址'
        },
        content: '貼文內容',
        image: '圖片網址',
        likes: ['會員ID'],
        createdAt: '建立時間'
      }
    },
    uploadImage: {
      status: true,
      data: {
        _id: '圖片ID',
        url: '圖片網址',
        createdAt: '建立時間'
      }
    },
    getImages: {
      status: true,
      data: [{
        _id: '圖片ID',
        url: '圖片網址',
        createdAt: '建立時間'
      }]
    },
    auth: {
      status: true,
      data: {
        user: {
          _id: '會員ID',
          name: '會員名',
          email: '會員E-mail',
          photo: '頭貼網址',
          sex: '[male、female]'
        },
        token: ''
      }
    },
    profile: {
      status: true,
      data: {
        _id: '會員ID',
        name: '會員名',
        email: '會員E-mail',
        photo: '頭貼網址',
        sex: '[male、female]'
      }
    },
    updatePassword: {
      status: true,
      data: {
        user: {
          _id: '會員ID',
          name: '會員名',
          email: '會員E-mail',
          photo: '頭貼網址',
          sex: '[male、female]'
        },
        token: ''
      }
    },
    getLikeList: {
      status: true,
      data: [{ 
        _id: '貼文ID',
        user: {
          _id: '會員ID',
          name: '會員名',
          photo: '頭貼網址'
        },
        createdAt: '建立時間'
      }]
    }
  }
};

const outputFile = './swagger-output.json'; // 輸出的文件名稱(swagger json文件)
const endpointsFiles = ['./app.js'] // 讀取的檔案(進入點)

swaggerAutogen(outputFile, endpointsFiles, doc);