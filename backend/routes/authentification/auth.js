const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');

const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        const user = result.rows[0];
        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                // Authentification réussie
                res.json({ message: 'Authentification réussie' });
                res.status(200)
            } else {
                // Mot de passe incorrect
                res.status(401).send('Mot de passe incorrect');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'authentification');
    }



});
module.exports = router;
