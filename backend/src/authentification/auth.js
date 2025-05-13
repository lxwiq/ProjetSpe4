const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middlewares/jwt');

router.post('/', async (req, res) => {
    try {
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

            const token = jwt.sign({
                userId: user.id,
                isAdmin: user.is_admin || false // Inclure le statut d'administrateur dans le token
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            // Configurer le cookie HTTP-only
            res.cookie('jwt_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
                sameSite: 'strict',
                maxAge: 3600000 // 1 heure en millisecondes
            });

            return res.status(200).json({
                message: 'Authentification réussie',
                data: {
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        isAdmin: user.is_admin || false
                    },
                    token: token // Inclure le token dans la réponse
                }
            });
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
    } catch (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de l\'authentification');
    }
});

// Route de déconnexion
router.post('/logout', (req, res) => {
    // Supprimer le cookie JWT
    res.clearCookie('jwt_token');
    return res.status(200).json({ message: 'Déconnexion réussie' });
});

// Route pour vérifier si l'utilisateur est toujours authentifié
router.get('/check-session', verifyToken, async (req, res) => {
    try {
        // Si le middleware verifyToken a passé, l'utilisateur est authentifié
        // Récupérer les informations de l'utilisateur
        const user = await prisma.users.findUnique({
            where: { id: req.userId }
        });

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé',
                data: { authenticated: false }
            });
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
                    isAdmin: user.is_admin || false
                }
            }
        });
    } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error);
        return res.status(500).json({
            message: 'Erreur lors de la vérification de la session',
            data: { authenticated: false }
        });
    }
});

module.exports = router;
