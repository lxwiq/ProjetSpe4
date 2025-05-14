// src/middleware/upload-middleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Configuration du stockage
// Créez les répertoires s'ils n'existent pas
const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
const profilePicsDir = path.join(uploadsDir, 'profile_pictures');
const documentsDir = path.join(uploadsDir, 'documents');
const imagesDir = path.join(uploadsDir, 'images');
const pdfsDir = path.join(uploadsDir, 'pdfs');
const othersDir = path.join(uploadsDir, 'others');

// Créer tous les répertoires nécessaires
[uploadsDir, profilePicsDir, documentsDir, imagesDir, pdfsDir, othersDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Déterminer le répertoire de destination en fonction de la route et du type de fichier
        const isProfilePicture = req.originalUrl.includes('/profile/picture') ||
                                req.originalUrl.includes('/profile');

        if (isProfilePicture) {
            cb(null, profilePicsDir); // Photos de profil
        } else {
            // Pour les documents, choisir le répertoire en fonction du type MIME
            const mimetype = file.mimetype.toLowerCase();

            if (mimetype.includes('image/')) {
                cb(null, imagesDir); // Images
            } else if (mimetype.includes('application/pdf')) {
                cb(null, pdfsDir); // PDFs
            } else if (mimetype.includes('text/') ||
                      mimetype.includes('application/msword') ||
                      mimetype.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                cb(null, documentsDir); // Documents texte
            } else {
                cb(null, othersDir); // Autres types de fichiers
            }
        }
    },
    filename: (req, file, cb) => {
        // Pour les photos de profil, utiliser l'ID de l'utilisateur dans le nom du fichier
        const isProfilePicture = req.originalUrl.includes('/profile/picture') ||
                                req.originalUrl.includes('/profile');

        // Générer un hash unique pour éviter les collisions de noms de fichiers
        const uniqueHash = crypto.randomBytes(8).toString('hex');

        // Obtenir l'extension du fichier
        let extension = path.extname(file.originalname).toLowerCase();

        // Pour les fichiers texte sans extension ou avec une extension différente de .txt
        if (file.mimetype.includes('text/plain') && extension !== '.txt') {
            extension = '.txt';
        }

        // Nettoyer le nom original du fichier (enlever les caractères spéciaux)
        const cleanFileName = file.originalname
            .replace(/\.[^/.]+$/, "") // Enlever l'extension
            .replace(/[^a-z0-9]/gi, '_') // Remplacer les caractères spéciaux par des underscores
            .toLowerCase();

        if (isProfilePicture && req.userId) {
            // Format: user_ID_timestamp.extension
            cb(null, `user_${req.userId}_${Date.now()}${extension}`);
        } else {
            // Format: nom-original_hash-unique_timestamp.extension
            cb(null, `${cleanFileName}_${uniqueHash}_${Date.now()}${extension}`);
        }
    }
});

// Filtrage des types de fichiers
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
        // Pour les documents, autoriser une large gamme de types de fichiers
        const allowedMimeTypes = [
            // Images
            'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
            // Documents
            'application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            // Texte
            'text/plain', 'text/html', 'text/csv',
            // Archives
            'application/zip', 'application/x-rar-compressed',
            // Autres
            'application/json', 'application/xml'
        ];

        // Extensions autorisées
        const allowedExtensions = /jpg|jpeg|png|gif|webp|svg|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|html|htm|csv|zip|rar|json|xml/;

        const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedMimeTypes.includes(file.mimetype.toLowerCase());

        if (extname && mimetype) return cb(null, true);

        cb(`Type de fichier non autorisé. Les types autorisés sont:
            Images (jpg, png, gif, webp, svg),
            Documents (pdf, doc, docx, xls, xlsx, ppt, pptx),
            Texte (txt, html, csv),
            Archives (zip, rar) et autres formats courants.`);
    }
};

/**
 * Fonction utilitaire pour obtenir le chemin relatif d'un fichier
 * @param {string} absolutePath - Chemin absolu du fichier
 * @returns {string} Chemin relatif du fichier pour le stockage en base de données
 */
const getRelativePath = (absolutePath) => {
    const parts = absolutePath.split('uploads');
    return `/uploads${parts[1]}`;
};

/**
 * Fonction utilitaire pour obtenir le type de document à partir du MIME type
 * @param {string} mimetype - Type MIME du fichier
 * @returns {string} Type de document (image, pdf, document, archive, autre)
 */
const getDocumentType = (mimetype) => {
    mimetype = mimetype.toLowerCase();

    if (mimetype.includes('image/')) return 'image';
    if (mimetype.includes('application/pdf')) return 'pdf';
    if (mimetype.includes('text/') ||
        mimetype.includes('application/msword') ||
        mimetype.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
        mimetype.includes('application/vnd.ms-excel') ||
        mimetype.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
        mimetype.includes('application/vnd.ms-powerpoint') ||
        mimetype.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
        return 'document';
    }
    if (mimetype.includes('application/zip') || mimetype.includes('application/x-rar-compressed')) {
        return 'archive';
    }

    return 'autre';
};

// Middleware Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 25 * 1024 * 1024 } // Limite à 25MB
});

// Exporter les fonctions utilitaires avec le middleware
module.exports = {
    upload,
    getRelativePath,
    getDocumentType
};