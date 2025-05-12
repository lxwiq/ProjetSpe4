const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            // Authentification réussie
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
                    }
                }
            });
        } else {
            // Mot de passe incorrect
            return res.status(401).send('Mot de passe incorrect');
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

module.exports = router;
