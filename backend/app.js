const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000; // Utiliser le port de l'environnement ou 3000 par défaut

// Affichage du log de demarrage
console.log('Starting backend server...');
