const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

module.exports = router;