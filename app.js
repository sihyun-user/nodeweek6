const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output');

// service
const errorMsg = require('./service/errorMsg');
const responseHandler = require('./service/responseHandler');

// router
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();

require('./connections');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// page not found
app.use('*', (req, res, next) => {
  next(responseHandler.handleError(res, errorMsg.NOT_FOUND))
});

module.exports = app;
