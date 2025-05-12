
const documentService = require('../services/document-service');
class DocumentController {
  async getAllDocuments(req, res) {
    try {
      const documents = await documentService.getAllDocuments();
      res.json(documents);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des documents');
    }
  }
}

module.exports = new DocumentController();