const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document-controller');
const verifyToken = require('../middlewares/jwt');
const upload = require('../middlewares/upload');
// Routes pour la gestion des documents
router.get('/', verifyToken, DocumentController.getAllDocuments);
router.get('/:id', verifyToken, DocumentController.getDocumentById);
router.post('/', verifyToken, upload.single('file'),DocumentController.addDocument);
router.put('/:id', verifyToken, DocumentController.updateDocument);
router.delete('/:id', verifyToken, DocumentController.deleteDocument);

// Routes pour la collaboration
router.post('/:id/invite', verifyToken, DocumentController.inviteUserToDocument);
router.get('/:id/collaborators', verifyToken, DocumentController.getDocumentCollaborators);
router.delete('/:id/collaborators/:collaboratorId', verifyToken, DocumentController.removeCollaborator);

module.exports = router;