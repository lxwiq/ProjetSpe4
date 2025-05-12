// backend/routes/users/modify_users.js
const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');
const bcrypt = require('bcrypt');
const saltRounds = 12;


router.post('/', async (req, res) => {
    try {
        const { id, username, email, full_name, password } = req.body;
        const password_hash = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, full_name = $3, password_hash=$4 WHERE id = $5',
            [username, email, full_name, password_hash, id]
        );
        res.json(result.rows);
        res.status(200).send('Utilisateur modifié avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la modification de l\'utilisateur');
    }
});

module.exports = router;