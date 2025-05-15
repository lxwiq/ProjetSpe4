/**
 * Routes pour la gestion des tokens JWT
 */
const express = require('express');
const router = express.Router();
const tokenService = require('../services/token-service');
const prisma = require('../lib/prisma');
const { ApiError, asyncHandler } = require('../middlewares/error-handler');
const { validate, schemas } = require('../middlewares/validator');

/**
 * @swagger
 * tags:
 *   name: Tokens
 *   description: Gestion des tokens d'authentification
 */

/**
 * @swagger
 * /token/refresh:
 *   post:
 *     summary: Rafraîchir un token d'accès
 *     description: Utilise un token de rafraîchissement pour générer un nouveau token d'accès
 *     tags: [Tokens, Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Token de rafraîchissement
 *     responses:
 *       200:
 *         description: Nouveau token d'accès généré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Nouveau token d'accès
 *       401:
 *         description: Token de rafraîchissement invalide ou expiré
 *       500:
 *         description: Erreur serveur
 */
router.post('/refresh', validate(schemas.refreshToken), asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  // Rafraîchir le token d'accès
  const { accessToken, payload } = tokenService.refreshAccessToken(refreshToken);

  // Vérifier si l'utilisateur est toujours actif (non bloqué)
  const user = await prisma.users.findUnique({
    where: { id: payload.userId }
  });

  if (!user) {
    throw new ApiError(404, 'Utilisateur non trouvé');
  }

  // Vérifier si le compte est désactivé (bloqué)
  if (user.is_active === false) {
    return res.status(403).json({
      message: 'Compte désactivé',
      data: {
        authenticated: false,
        reason: 'account_blocked'
      }
    });
  }

  // Configurer le cookie HTTP-only avec le nouveau token
  res.cookie('jwt_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes en millisecondes
  });

  return res.status(200).json({
    message: 'Token rafraîchi avec succès',
    data: {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        profile_picture: user.profile_picture,
        isAdmin: user.is_admin || false,
        is_active: user.is_active
      }
    }
  });
}));

module.exports = router;
