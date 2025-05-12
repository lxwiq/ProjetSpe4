const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document-controller');
const verifyToken = require('../middlewares/jwt');
router.get('/', verifyToken,  DocumentController.getAllDocuments);
router.post('/add', verifyToken,DocumentController.addDocument);
router.delete('/:id', verifyToken, DocumentController.deleteDocument);

module.exports = router;