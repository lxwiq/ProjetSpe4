const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document-controller');
const verifyToken = require('../middlewares/jwt');
const upload = require('../middlewares/upload');
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

// Routes pour la collaboration

/**
 * @swagger
 * /documents/{id}/invite:
 *   post:
 *     summary: Inviter un utilisateur à collaborer
 *     description: Invite un utilisateur à collaborer sur un document
 *     tags: [Documents, Collaboration]
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
 *             required:
 *               - invitedUserId
 *             properties:
 *               invitedUserId:
 *                 type: integer
 *                 description: ID de l'utilisateur invité
 *               permissionLevel:
 *                 type: string
 *                 enum: [read, write, admin]
 *                 default: read
 *                 description: Niveau de permission
 *     responses:
 *       201:
 *         description: Invitation envoyée avec succès
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document ou utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post('/:id/invite', verifyToken, validate(schemas.inviteCollaborator), asyncHandler(DocumentController.inviteUserToDocument));

/**
 * @swagger
 * /documents/{id}/collaborators:
 *   get:
 *     summary: Récupérer les collaborateurs
 *     description: Récupère la liste des collaborateurs d'un document
 *     tags: [Documents, Collaboration]
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
 *         description: Liste des collaborateurs
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id/collaborators', verifyToken, DocumentController.getDocumentCollaborators);

/**
 * @swagger
 * /documents/{id}/collaborators/{collaboratorId}:
 *   delete:
 *     summary: Supprimer un collaborateur
 *     description: Supprime un collaborateur d'un document
 *     tags: [Documents, Collaboration]
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
 *       - in: path
 *         name: collaboratorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du collaborateur à supprimer
 *     responses:
 *       200:
 *         description: Collaborateur supprimé avec succès
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Document ou collaborateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id/collaborators/:collaboratorId', verifyToken, DocumentController.removeCollaborator);

module.exports = router;