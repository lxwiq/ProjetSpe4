const express = require('express');
const { pool } = require('./config/database');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Import Route Files
const usersRoutes = require('./routes/users/get_users');
const documentsRoutes = require('./routes/documents/get_documents');
const modifyUsersRoutes = require('./routes/users/modify_users');
const authRoutes = require('./routes/authentification/auth');

// Middleware
app.use([cors({
    origin: 'http://localhost:4200',
    credentials:true,
}), express.json()]);

// Route Handlers
app.use('/users', usersRoutes);
app.use('/documents', documentsRoutes);
app.use('/modify_user', modifyUsersRoutes); 
app.use('/auth', authRoutes);

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