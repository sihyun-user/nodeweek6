const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/users');

router.get('/', UsersControllers.getUsers);
router.post('/', UsersControllers.createUsers);
router.delete('/', UsersControllers.deleteAllUsers);

module.exports = router