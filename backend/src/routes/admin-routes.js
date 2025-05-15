const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwt');
const isAdmin = require('../middlewares/admin');
const adminController = require('../controllers/admin-controller');

// Routes accessibles uniquement aux administrateurs
// Toutes les routes utilisent d'abord verifyToken pour authentifier l'utilisateur,
// puis isAdmin pour vérifier les privilèges

// Récupérer tous les utilisateurs
router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);

// Créer un nouvel utilisateur
router.post('/users', verifyToken, isAdmin, adminController.createUser);

// Désactiver un compte utilisateur
router.put('/users/:userId/deactivate', verifyToken, isAdmin, adminController.deactivateUser);

// Réactiver un compte utilisateur
router.put('/users/:userId/activate', verifyToken, isAdmin, adminController.activateUser);

module.exports = router;
