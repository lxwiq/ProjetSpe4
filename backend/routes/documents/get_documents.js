// backend/routes/documents/get_documents.js
const express = require('express');
const router = express.Router();
const { pool } = require('../../config/database');
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM documents');
        res.json(result.rows);
        result.rows.forEach(doc => {
            console.log(`Document ID: ${doc.id}, Titre: ${doc.title}`);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des documents');
    }
});

module.exports = router;