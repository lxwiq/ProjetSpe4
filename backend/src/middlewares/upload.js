// src/middleware/upload-middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Configuration du stockage
    // Créez le répertoire s'il n'existe pas
    const dir = path.join(__dirname, '..', '..', 'src', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../backend/src/uploads/'); // Répertoire de stockage
    },                                                    
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom de fichier unique
    }
});

// Filtrage des types de fichiers (optionnel)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|txt|png|jpg|jpeg|svg|/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb('Type de fichier non autorisé');
};

// Middleware Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite à 10MB
});

module.exports = upload;