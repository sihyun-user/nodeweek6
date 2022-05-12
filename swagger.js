const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Meta API', // 文件名稱
    description: '範例生成文件' // 文件描述
  },
  host: 'heroku:fast-mountain-34375.herokuapp.com', // (重要) 本地:localhost:3005 | heroku:fast-mountain-34375.herokuapp.com
  schemes: ['http', 'https'], // swagger文件支援哪幾種模式
  definitions: {
    getPosts: {
      status: true,
      data: [{
        _id: '627bbdb68f689a16b42ca602',
        user: {
          _id: '6277c7231f5cea212fc08c8a',
          name: 'John',
          photo: '頭貼網址'
        },
        content: '貼文內容',
        image: '圖片網址',
        likes: 0
      }]
    },
    createPosts: {
      status: true,
      data: {
        _id: '627bcc153ef5abfd5c800b5f',
        user: '6277c7231f5cea212fc08c8a',
        content: '貼文內容',
        image: '圖片網址',
        likes: 0,
        createdAt: '2022-05-11T14:45:41.770Z'
      }
    },
    deleteOnePosts: {
      status: true,
      data: [
        {
          _id: '627bcc153ef5abfd5c800b5f',
          user: '6277c7231f5cea212fc08c8a',
          content: '貼文內容',
          image: '圖片網址',
          likes: 0,
        }
      ]
    },
    updatePosts: {
      status: true,
      data: {
        _id: '627bcc153ef5abfd5c800b5f',
        user: '6277c7231f5cea212fc08c8a',
        content: '貼文內容',
        image: '圖片網址',
        likes: 0,
      }
    },
    getUsers: {
      status: true,
      data: [
        {
          _id: '6277c7231f5cea212fc08c8a',
          name: '用戶名稱',
          photo: '頭貼網址',
        }
      ]
    },
    createUsers: {
      status: true,
      data: {
        _id: '6277c7231f5cea212fc08c8a',
        name: '用戶名稱',
        email: 'test@gmail.com',
        photo: '頭貼網址',
      }
    }
  }
};

const outputFile = './swagger-output.json'; // 輸出的文件名稱(swagger json文件)
const endpointsFiles = ['./app.js'] // 讀取的檔案(進入點)

swaggerAutogen(outputFile, endpointsFiles, doc);