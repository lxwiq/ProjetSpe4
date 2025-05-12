const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document-controller');

router.get('/', DocumentController.getAllDocuments);


module.exports = router;