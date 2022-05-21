const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Meta API', // 文件名稱
    description: '範例生成文件' // 文件描述
  },
  host: 'fast-mountain-34375.herokuapp.com', // (重要) 本地: localhost:3005 | heroku: fast-mountain-34375.herokuapp.com
  schemes: ['http', 'https'], // swagger文件支援哪幾種模式
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiky',
      in: 'headers',
      name: 'authorization',
      description: '請加上 API Token'
    }
  },
  definitions: {
    getPosts: {
      status: true,
      data: [{
        _id: '627bbdb68f689a16b42ca602',
        user: {
          _id: '用戶ID',
          name: 'John',
          photo: '頭貼網址'
        },
        content: '貼文內容',
        image: '圖片網址',
        likes: 0,
        createdAt: '2022-05-11T14:45:41.770Z'
      }]
    },
    getUsers: {
      status: true,
      data: [
        {
          _id: '627e5f638f1c2825fe239443',
          name: '用戶名稱',
          photo: '頭貼網址',
        }
      ]
    },
    uploadImage: {
      status: true,
      data: {
        _id: '627bcc153ef5abfd5c800b5f',
        url: '圖片網址',
        createdAt: '2022-05-11T14:45:41.770Z'
      }
    },
    getImages: {
      status: true,
      data: [{
        _id: '627bbdb68f689a16b42ca602',
        url: '圖片網址',
        createdAt: '2022-05-11T14:45:41.770Z'
      }]
    }
  }
};

const outputFile = './swagger-output.json'; // 輸出的文件名稱(swagger json文件)
const endpointsFiles = ['./app.js'] // 讀取的檔案(進入點)

swaggerAutogen(outputFile, endpointsFiles, doc);