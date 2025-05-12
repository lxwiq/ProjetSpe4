const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 12;
const PORT = process.env.PORT || 3000; // Utiliser le port de l'environnement ou 3000 par défaut

// Affichage du log de demarrage
console.log('Starting backend server...');

app.use(express.json()); // Middleware pour parser les requêtes JSON

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'collaborative_docs',
    password: 'root',
    
    port: 5432,
});


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

// PARTIE UTILISATEURS

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
});

app.post('/create_user', async (req,res)=>{
    try{

        const { username, email, full_name,password} = req.body;
        const password_hash = await bcrypt.hash(password, saltRounds); 
        const two_factor_enabled = false;
        const two_factor_secret = null;  
        const result = await pool.query(
            'CREATE users SET username = $1, email = $2, full_name = $3,two_factor_enabled = $4, two_factor_secret = $5, password_hash=$6',
            [username, email, full_name,two_factor_enabled, two_factor_secret,password_hash]
        );
        res.json(result.rows)


    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la modification de l\'utilisateur');

    }       

})
app.post('/modify_user', async (req, res) => {
    try {
        const { id, username, email, full_name, password } = req.body;
        const password_hash = await bcrypt.hash(password, saltRounds); 
        const result = await pool.query(
            'UPDATE users SET username = $1, email = $2, full_name = $3, password_hash=$4 WHERE id = $5',
            [username, email, full_name, password_hash, id]
        );
        res.json(result.rows)
        res.status(200).send('Utilisateur modifié avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la modification de l\'utilisateur');
    }
});



// PARTIE DOCUMENT
app.get('/documents', async (req, res) => {
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










