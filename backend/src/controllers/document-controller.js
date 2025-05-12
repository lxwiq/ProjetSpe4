
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
  async addDocument(req, res) {
    try {
      const { title, content } = req.body;
      const newDocument = await documentService.addDocument({ title, content });
      res.status(201).json(newDocument);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l\'ajout du document');
    }
  }
  async deleteDocument(req, res) {
    try {
      const documentId = req.params.id;
      await documentService.deleteDocument(documentId);
      res.send(`Document avec l'id ${documentId} a été supprimé`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la suppression du document');
    }
  }
 

}

module.exports = new DocumentController();