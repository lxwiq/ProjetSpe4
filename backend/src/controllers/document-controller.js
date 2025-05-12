
const documentService = require('../services/document-service');
class DocumentController {

  async getAllDocuments(req, res) {
    try {
      const userId = req.userId; // Get the user ID from the request object (set by JWT middleware)
      const documents = await documentService.getAllDocuments(userId);
      res.json(documents);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des documents');
    }
  }
  async addDocument(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.userId; // Get the user ID from the request object (set by JWT middleware)
      const newDocument = await documentService.addDocument({ title, content, userId });
      res.status(201).json(newDocument);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l\'ajout du document');
    }
  }
  async deleteDocument(req, res) {
    try {
      const documentId = req.params.id;
      const userId = req.userId; // Get the user ID from the request object (set by JWT middleware)
      await documentService.deleteDocument(documentId, userId);
      res.send(`Document avec l'id ${documentId} a été supprimé`);
    } catch (err) {
      console.error(err);
      if (err.message === 'Document not found or you do not have permission to delete it') {
        return res.status(403).send(err.message);
      }
      res.status(500).send('Erreur lors de la suppression du document');
    }
  }


}

module.exports = new DocumentController();
