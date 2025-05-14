// src/middleware/upload-middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Configuration du stockage
// Créez les répertoires s'ils n'existent pas
const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
const profilePicsDir = path.join(uploadsDir, 'profile_pictures');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(profilePicsDir)) fs.mkdirSync(profilePicsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Déterminer le répertoire de destination en fonction de la route
        const isProfilePicture = req.originalUrl.includes('/profile/picture') ||
                                req.originalUrl.includes('/profile');

        if (isProfilePicture) {
            cb(null, profilePicsDir); // Utiliser le chemin absolu pour les photos de profil
        } else {
            cb(null, uploadsDir); // Utiliser le chemin absolu pour les autres fichiers
        }
    },
    filename: (req, file, cb) => {
        // Pour les photos de profil, utiliser l'ID de l'utilisateur dans le nom du fichier
        const isProfilePicture = req.originalUrl.includes('/profile/picture') ||
                                req.originalUrl.includes('/profile');

        // Obtenir l'extension du fichier
        let extension = path.extname(file.originalname).toLowerCase();

        // Pour les fichiers texte sans extension ou avec une extension différente de .txt
        if (file.mimetype.includes('text/plain') && extension !== '.txt') {
            extension = '.txt';
        }

        if (isProfilePicture && req.userId) {
            // Format: user_ID_timestamp.extension
            cb(null, `user_${req.userId}_${Date.now()}${extension}`);
        } else {
            // Format standard pour les autres fichiers
            cb(null, `${Date.now()}${extension}`);
        }
    }
});

// Filtrage des types de fichiers (optionnel)
const fileFilter = (req, file, cb) => {
    // Déterminer le type de fichier en fonction de la route
    const isProfilePicture = req.originalUrl.includes('/profile/picture') ||
                            req.originalUrl.includes('/profile');

    if (isProfilePicture) {
        // Pour les photos de profil, n'autoriser que les images
        const allowedTypes = /jpg|jpeg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) return cb(null, true);
        cb('Seules les images sont autorisées pour les photos de profil (jpg, jpeg, png, gif, webp)');
    } else {
        // Pour les autres fichiers, autoriser plus de types
        const allowedTypes = /pdf|doc|docx|txt|png|jpg|jpeg|svg/;

        // Vérifier si c'est un fichier texte brut
        if (file.mimetype.includes('text/plain')) {
            return cb(null, true);
        }

        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) return cb(null, true);
        cb('Type de fichier non autorisé. Les types autorisés sont: pdf, doc, docx, txt, png, jpg, jpeg, svg et les fichiers texte.');
    }
};

// Middleware Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite à 10MB
});

module.exports = upload;