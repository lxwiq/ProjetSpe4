const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const verifyToken = require('..jwt.js');
router.get('/', verifyToken,userController.getAllUsers);
router.get('/modify',verifyToken, userController.ModifyUsers);

module.exports = router;