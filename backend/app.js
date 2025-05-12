const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser le port de l'environnement ou 3000 par défaut

// Configuration de la connexion à la base de données PostgreSQL
// Les variables d'environnement sont définies dans docker-compose.yml
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"), // Assurez-vous que le port est un nombre
});

// Middleware pour parser le JSON (si vous en avez besoin plus tard)
app.use(express.json());

// Route de base pour tester la connexion et afficher un message
app.get('/', async (req, res) => {
    try {
        // Test de connexion à la base de données
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()'); // Simple requête pour tester
        const currentTime = result.rows[0].now;
        client.release(); // Libérer le client vers le pool

        res.send(`
      <h1>Connexion à la base de données réussie !</h1>
      <p>Le serveur backend fonctionne.</p>
      <p>Heure actuelle de la base de données : ${currentTime}</p>
      <p>Variables d'environnement utilisées pour la connexion DB :</p>
      <ul>
        <li>DB_USER: ${process.env.DB_USER}</li>
        <li>DB_HOST: ${process.env.DB_HOST}</li>
        <li>DB_NAME: ${process.env.DB_NAME}</li>
        <li>DB_PORT: ${process.env.DB_PORT}</li>
      </ul>
    `);
    } catch (err) {
        console.error('Erreur de connexion à la base de données ou d\'exécution de la requête', err.stack);
        res.status(500).send(`
      <h1>Erreur de connexion à la base de données</h1>
      <p>${err.message}</p>
      <pre>${err.stack}</pre>
      <p>Vérifiez les variables d'environnement et la configuration de la base de données.</p>
      <p>Variables d'environnement actuelles pour la DB :</p>
      <ul>
        <li>DB_USER: ${process.env.DB_USER}</li>
        <li>DB_HOST: ${process.env.DB_HOST}</li>
        <li>DB_NAME: ${process.env.DB_NAME}</li>
        <li>DB_PORT: ${process.env.DB_PORT}</li>
      </ul>
    `);
    }
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
        console.log(`Accédez à http://localhost:${PORT} dans votre navigateur.`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});