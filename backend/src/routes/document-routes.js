const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document-controller');
const verifyToken = require('../middlewares/jwt');
const { upload, getRelativePath, getDocumentType } = require('../middlewares/upload');
const { validate, schemas } = require('../middlewares/validator');
const { asyncHandler } = require('../middlewares/error-handler');

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Gestion des documents
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewDocument:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Titre du document
 *         content:
 *           type: string
 *           description: Contenu du document
 *         parentFolderId:
 *           type: integer
 *           description: ID du dossier parent
 *         isFolder:
 *           type: boolean
 *           description: Indique si c'est un dossier
 *     DocumentResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du document
 *         title:
 *           type: string
 *           description: Titre du document
 *         content:
 *           type: string
 *           description: Contenu du document
 *         owner_id:
 *           type: integer
 *           description: ID du propriétaire
 *         is_folder:
 *           type: boolean
 *           description: Indique si c'est un dossier
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 *         last_modified_by:
 *           type: integer
 *           description: ID du dernier modificateur
 */

// Routes pour la gestion des documents

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Récupérer tous les documents
 *     description: Récupère tous les documents accessibles par l'utilisateur
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DocumentResponse'
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.get('/', verifyToken, DocumentController.getAllDocuments);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Récupérer un document par ID
 *     description: Récupère un document spécifique par son ID
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     responses:
 *       200:
 *         description: Document trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentResponse'
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', verifyToken, DocumentController.getDocumentById);

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Ajouter un nouveau document
 *     description: Crée un nouveau document ou dossier
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               parentFolderId:
 *                 type: integer
 *               isFolder:
 *                 type: boolean
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Document créé avec succès
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.post('/', verifyToken, upload.single('file'), validate(schemas.createDocument), asyncHandler(DocumentController.addDocument));

/**
 * @swagger
 * /documents/{id}:
 *   put:
 *     summary: Mettre à jour un document
 *     description: Met à jour un document existant
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Document mis à jour avec succès
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', verifyToken, validate(schemas.updateDocument), asyncHandler(DocumentController.updateDocument));

/**
 * @swagger
 * /documents/{id}/file:
 *   put:
 *     summary: Mettre à jour un document avec un fichier
 *     description: Met à jour un document existant en remplaçant son fichier
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document mis à jour avec succès
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/file', verifyToken, upload.single('file'), asyncHandler(DocumentController.updateDocumentFile));

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Supprimer un document
 *     description: Supprime un document existant
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     responses:
 *       200:
 *         description: Document supprimé avec succès
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', verifyToken, DocumentController.deleteDocument);

/**
 * @swagger
 * /documents/download/{id}:
 *   get:
 *     summary: Télécharger un document
 *     description: Télécharge le fichier associé à un document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     responses:
 *       200:
 *         description: Fichier téléchargé avec succès
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/download/:id', verifyToken, asyncHandler(DocumentController.downloadDocument));

// Document sharing routes have been removed as part of the permissions system removal

module.exports = router;