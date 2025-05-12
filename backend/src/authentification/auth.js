const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        const user = result.rows[0];

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            // Authentification réussie
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ 
                message: 'Authentification réussie',
                data: {
                    user,
                    token
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

module.exports = router;
