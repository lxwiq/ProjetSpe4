// src/routes/2fa-routes.js
const express = require('express');
const router = express.Router();
const twoFactorAuthController = require('../controllers/2fa-controller');
const verifyToken = require('../middlewares/jwt');

// Routes pour la configuration et la gestion de la 2FA
// Ces routes nécessitent une authentification (verifyToken)
router.get('/setup', verifyToken, twoFactorAuthController.setupTwoFactor);
router.post('/verify-setup', verifyToken, twoFactorAuthController.verifySetup);
router.post('/disable', verifyToken, twoFactorAuthController.disableTwoFactor);
router.get('/status', verifyToken, twoFactorAuthController.checkStatus);

// Route pour la vérification 2FA lors de la connexion
// Cette route ne nécessite pas d'authentification complète
router.post('/verify-login', twoFactorAuthController.verifyLogin);

module.exports = router;
