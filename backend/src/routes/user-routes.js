const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const verifyToken = require('../middlewares/jwt');
const upload = require('../middlewares/upload');
const { validate, schemas } = require('../middlewares/validator');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.get('/', verifyToken, userController.getAllUsers);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Rechercher des utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Terme de recherche
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.get('/search', verifyToken, userController.searchUsers);

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Modifier le profil utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               full_name:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.put('/profile', verifyToken, upload.single('profile_picture'), validate(schemas.updateUserProfile), userController.ModifyUsers);

/**
 * @swagger
 * /users/profile/picture:
 *   post:
 *     summary: Mettre à jour la photo de profil
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo de profil mise à jour avec succès
 *       400:
 *         description: Aucune image téléchargée
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.post('/profile/picture', verifyToken, upload.single('profile_picture'), validate(schemas.updateProfilePicture), userController.updateProfilePicture);

/**
 * @swagger
 * /users/batch:
 *   get:
 *     summary: Récupérer plusieurs utilisateurs par leurs IDs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: true
 *         schema:
 *           type: string
 *         description: Liste d'IDs d'utilisateurs séparés par des virgules
 *     responses:
 *       200:
 *         description: Liste des utilisateurs demandés
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.get('/batch', verifyToken, userController.getUsersByIds);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;