const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document-controller');

router.get('/', DocumentController.getAllDocuments);
router.post('/add', DocumentController.addDocument);
router.delete('/:id', DocumentController.deleteDocument);

module.exports = router;