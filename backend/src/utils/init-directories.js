/**
 * Script d'initialisation des répertoires nécessaires à l'application
 * Ce script est exécuté au démarrage de l'application pour s'assurer que
 * tous les répertoires nécessaires existent
 */

const fs = require('fs');
const path = require('path');

/**
 * Initialise les répertoires nécessaires à l'application
 */
function initDirectories() {
  console.log('Initialisation des répertoires...');
  
  // Chemin de base pour les uploads
  const baseDir = path.join(__dirname, '..', '..', 'src');
  const uploadsDir = path.join(baseDir, 'uploads');
  const profilePicsDir = path.join(uploadsDir, 'profile_pictures');
  
  // Créer les répertoires s'ils n'existent pas
  ensureDirectoryExists(uploadsDir);
  ensureDirectoryExists(profilePicsDir);
  
  console.log('Répertoires initialisés avec succès.');
}

/**
 * S'assure qu'un répertoire existe, le crée s'il n'existe pas
 * @param {string} dirPath - Chemin du répertoire
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Création du répertoire: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
    
    // Définir les permissions appropriées (lecture/écriture pour tous)
    try {
      fs.chmodSync(dirPath, 0o777);
    } catch (err) {
      console.warn(`Impossible de définir les permissions pour ${dirPath}:`, err);
    }
  } else {
    console.log(`Le répertoire existe déjà: ${dirPath}`);
  }
}

module.exports = initDirectories;
