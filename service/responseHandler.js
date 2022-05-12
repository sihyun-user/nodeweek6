const errorMsg = require('./errorMsg');

const handleSuccess = (res, data) => {
  res.send({
    status: true,
    data
  });
};

const handleError = (res, message = errorMsg.DEFAULT) => {
  res.status(400).send({
    status: false,
    message
  });
};

module.exports = {
  handleSuccess,
  handleError
}