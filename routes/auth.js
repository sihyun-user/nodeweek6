const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/auth');

router.post('/auth/signup', AuthControllers.signup);

router.post('/auth/login', AuthControllers.login);

module.exports = router;