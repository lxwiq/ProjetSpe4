const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const verifyToken = require('../middlewares/jwt');

// Routes pour les utilisateurs
router.get('/', verifyToken, userController.getAllUsers);
router.get('/search', verifyToken, userController.searchUsers);
router.get('/modify', verifyToken, userController.ModifyUsers);
router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;