const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/user');

router.get('/users', UsersControllers.getUsers);
router.post('/user', UsersControllers.createUser);

module.exports = router