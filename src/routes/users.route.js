const express = require('express');
const UsersController = require('../controllers/users.controller.js');
const UsersService = require('../services/users.service');
const router = express.Router();
const usersController = new UsersController();

router.post('/signup', usersController.createUser);
router.post('/login', usersController.loginUser);

module.exports = router;
