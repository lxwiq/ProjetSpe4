const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const DocumentController = require('../controllers/document-controller');
const verifyToken = require('../middlewares/jwt');
router.get('/', verifyToken,  DocumentController.getAllDocuments);
router.post('/add', verifyToken, upload.single('file'),DocumentController.addDocument);
router.delete('/:id', verifyToken, DocumentController.deleteDocument);

module.exports = router;