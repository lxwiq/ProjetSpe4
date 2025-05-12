const express = require('express');
const { pool } = require('./config/database');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 12;
const PORT = process.env.PORT || 3000;

// Import Route Files
const usersRoutes = require('./routes/users/get_users');
const documentsRoutes = require('./routes/documents/get_documents');
const modifyUsersRoutes = require('./routes/users/modify_users');

// Middleware
app.use(express.json());

// Route Handlers
app.use('/users', usersRoutes);
app.use('/documents', documentsRoutes);
app.use('/modify_user', modifyUsersRoutes); // Or a different route as appropriate

// Route de test pour vérifier la connexion à la base de données
app.get('/testdb', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la connexion à la base de données');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});