const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Meta API', // 文件名稱
    description: '範例生成文件' // 文件描述
  },
  host: 'localhost:3005', // (重要) 本地:localhost:3005 | heroku:xxxx
  schemes: ['http', 'https'], // swagger文件支援哪幾種模式
};

const outputFile = './swagger-output.json'; // 輸出的文件名稱(swagger json文件)
const endpointsFiles = ['./app.js'] // 讀取的檔案(進入點)

swaggerAutogen(outputFile, endpointsFiles, doc);