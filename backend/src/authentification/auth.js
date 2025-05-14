const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/jwt');
const twoFactorAuthService = require('../services/2fa-service');
const tokenService = require('../services/token-service');
const { asyncHandler, ApiError } = require('../middlewares/error-handler');
const { validate, schemas } = require('../middlewares/validator');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentification utilisateur
 *     description: Permet à un utilisateur de se connecter avec son email et son mot de passe
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Données de requête invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mot de passe incorrect. 4 tentative(s) restante(s) avant verrouillage du compte."
 *       403:
 *         description: Compte verrouillé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Compte temporairement verrouillé. Veuillez réessayer dans 15 minute(s)."
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validate(schemas.login), asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        // Vérifier si le compte est verrouillé
        if (user.locked_until && new Date(user.locked_until) > new Date()) {
            const minutesLeft = Math.ceil((new Date(user.locked_until).getTime() - new Date().getTime()) / 60000);
            return res.status(403).json({
                message: `Compte temporairement verrouillé. Veuillez réessayer dans ${minutesLeft} minute(s).`
            });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            // Authentification réussie - réinitialiser les tentatives de connexion et mettre à jour la date de dernière connexion
            await prisma.users.update({
                where: { id: user.id },
                data: {
                    login_attempts: 0,
                    last_login: new Date(),
                    locked_until: null
                }
            });

            // Vérifier si l'utilisateur a activé la 2FA
            const isTwoFactorEnabled = await twoFactorAuthService.isTwoFactorEnabled(user.id);

            if (isTwoFactorEnabled) {
                // Si la 2FA est activée, générer un token temporaire
                const tempToken = jwt.sign({
                    userId: user.id,
                    isTemp: true
                }, process.env.JWT_SECRET_KEY, { expiresIn: '5m' }); // Token temporaire valide 5 minutes

                return res.status(200).json({
                    message: 'Authentification partielle - 2FA requise',
                    data: {
                        requireTwoFactor: true,
                        tempToken: tempToken,
                        userId: user.id
                    }
                });
            } else {
                // Si la 2FA n'est pas activée, procéder à l'authentification normale
                const payload = {
                    userId: user.id,
                    isAdmin: user.is_admin || false // Inclure le statut d'administrateur dans le token
                };

                // Générer une paire de tokens (accès + rafraîchissement)
                const { accessToken, refreshToken } = tokenService.generateTokenPair(payload);

                // Configurer le cookie HTTP-only pour le token d'accès
                res.cookie('jwt_token', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000 // 15 minutes en millisecondes
                });

                // Configurer le cookie HTTP-only pour le token de rafraîchissement
                res.cookie('refresh_token', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/token/refresh', // Limiter le cookie à la route de rafraîchissement
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours en millisecondes
                });

                return res.status(200).json({
                    message: 'Authentification réussie',
                    data: {
                        user: {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                            full_name: user.full_name,
                            profile_picture: user.profile_picture,
                            isAdmin: user.is_admin || false
                        },
                        accessToken: accessToken, // Inclure le token d'accès dans la réponse
                        refreshToken: refreshToken, // Inclure le token de rafraîchissement dans la réponse
                        requireTwoFactor: false
                    }
                });
            }
        } else {
            // Mot de passe incorrect - incrémenter le compteur de tentatives
            const maxAttempts = 5; // Nombre maximum de tentatives avant verrouillage
            const lockDuration = 15; // Durée de verrouillage en minutes

            const newAttempts = (user.login_attempts || 0) + 1;
            const updateData = {
                login_attempts: newAttempts
            };

            // Si le nombre maximum de tentatives est atteint, verrouiller le compte
            if (newAttempts >= maxAttempts) {
                const lockUntil = new Date();
                lockUntil.setMinutes(lockUntil.getMinutes() + lockDuration);
                updateData.locked_until = lockUntil;
            }

            // Mettre à jour les tentatives de connexion
            await prisma.users.update({
                where: { id: user.id },
                data: updateData
            });

            // Message d'erreur adapté
            if (newAttempts >= maxAttempts) {
                return res.status(403).json({
                    message: `Compte temporairement verrouillé suite à de multiples tentatives échouées. Veuillez réessayer dans ${lockDuration} minutes.`
                });
            } else {
                const attemptsLeft = maxAttempts - newAttempts;
                return res.status(401).json({
                    message: `Mot de passe incorrect. ${attemptsLeft} tentative(s) restante(s) avant verrouillage du compte.`
                });
            }
        }
}));

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion utilisateur
 *     description: Déconnecte l'utilisateur en supprimant son token JWT
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Déconnexion réussie"
 */
router.post('/logout', (req, res) => {
    // Supprimer le cookie JWT
    res.clearCookie('jwt_token');
    return res.status(200).json({ message: 'Déconnexion réussie' });
});

/**
 * @swagger
 * /auth/check-session:
 *   get:
 *     summary: Vérifier la session utilisateur
 *     description: Vérifie si l'utilisateur est toujours authentifié et renvoie ses informations
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Session valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Session valide"
 *                 data:
 *                   type: object
 *                   properties:
 *                     authenticated:
 *                       type: boolean
 *                       example: true
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/check-session', verifyToken, asyncHandler(async (req, res) => {
    // Si le middleware verifyToken a passé, l'utilisateur est authentifié
    // Récupérer les informations de l'utilisateur
    const user = await prisma.users.findUnique({
        where: { id: req.userId }
    });

    if (!user) {
        throw new ApiError(404, 'Utilisateur non trouvé', { authenticated: false });
    }

    return res.status(200).json({
        message: 'Session valide',
        data: {
            authenticated: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                full_name: user.full_name,
                profile_picture: user.profile_picture,
                isAdmin: user.is_admin || false
            }
        }
    });
}));

module.exports = router;
