
const documentService = require('../services/document-service');
const notificationService = require('../services/notification-service');

class DocumentController {

  async getAllDocuments(req, res) {
    try {
      const userId = req.userId; // Get the user ID from the request object (set by JWT middleware)
      const documents = await documentService.getAllDocuments(userId);

      // Convertir les BigInt en nombre avant de les renvoyer
      const safeDocuments = JSON.parse(JSON.stringify(documents, (key, value) =>
        typeof value === 'bigint' ? Number(value) : value
      ));

      res.json(safeDocuments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des documents' });
    }
  }

  async getDocumentById(req, res) {
    try {
      const documentId = req.params.id;
      const userId = req.userId;
      const document = await documentService.getDocumentById(documentId, userId);

      // Convertir les BigInt en nombre avant de les renvoyer
      const safeDocument = JSON.parse(JSON.stringify(document, (key, value) =>
        typeof value === 'bigint' ? Number(value) : value
      ));

      res.json(safeDocument);
    } catch (err) {
      console.error(err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors de la récupération du document' });
    }
  }

  async addDocument(req, res) {
    try {
      const { title, content, parentFolderId, isFolder } = req.body;
      const file = req.file;
      console.log("Fichier reçu:", file);
      const userId = req.userId;

      // Traitement du chemin de fichier pour le stockage en base de données
      let filePath = null;
      let fileSize = null;
      let fileType = null;

      if (file) {
        // Utiliser un chemin relatif pour le stockage en base de données
        // Cela permettra de servir le fichier correctement via l'URL
        filePath = file.path.replace(/^.*[\\\/]uploads[\\\/]/, '/uploads/');

        // Si c'est un fichier texte, s'assurer qu'il a l'extension .txt
        if (file.mimetype.includes('text/plain') && !file.originalname.toLowerCase().endsWith('.txt')) {
          filePath = filePath + '.txt';
        }

        fileSize = file.size;
        fileType = file.mimetype;
      }

      const newDocument = await documentService.addDocument({
        title: file ? file.originalname : title,
        content,
        parentFolderId,
        isFolder,
        userId,
        filePath,
        size: fileSize,
        fileType,
      });

      // Convertir les BigInt en nombre avant de les renvoyer
      const safeDocument = JSON.parse(JSON.stringify(newDocument, (key, value) =>
        typeof value === 'bigint' ? Number(value) : value
      ));

      res.status(201).json({
        message: 'Document ajouté avec succès !',
        data: safeDocument
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout du document:", err);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du document' });
    }
  }

  async updateDocument(req, res) {
    try {
      const documentId = req.params.id;
      const userId = req.userId;
      const { title, content } = req.body;

      const updatedDocument = await documentService.updateDocument(documentId, { title, content }, userId);

      // Convertir les BigInt en nombre avant de les renvoyer
      const safeDocument = JSON.parse(JSON.stringify(updatedDocument, (key, value) =>
        typeof value === 'bigint' ? Number(value) : value
      ));

      res.json(safeDocument);
    } catch (err) {
      console.error(err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors de la mise à jour du document' });
    }
  }

  async deleteDocument(req, res) {
    try {
      const documentId = req.params.id;
      const userId = req.userId;
      await documentService.deleteDocument(documentId, userId);
      res.json({ message: `Document avec l'id ${documentId} a été supprimé` });
    } catch (err) {
      console.error(err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors de la suppression du document' });
    }
  }

  async inviteUserToDocument(req, res) {
    try {
      const documentId = req.params.id;
      const { invitedUserId, permissionLevel } = req.body;
      const invitingUserId = req.userId;

      if (!invitedUserId) {
        return res.status(400).json({ message: 'ID de l\'utilisateur invité manquant' });
      }

      const invitation = await documentService.inviteUserToDocument(
        documentId,
        invitedUserId,
        invitingUserId,
        permissionLevel || 'read'
      );

      // Créer une notification pour l'utilisateur invité
      const document = await documentService.getDocumentById(documentId, invitingUserId);
      await notificationService.createDocumentInviteNotification(
        invitedUserId,
        parseInt(documentId),
        invitingUserId,
        document.title,
        permissionLevel || 'read'
      );

      res.status(201).json(invitation);
    } catch (err) {
      console.error(err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors de l\'invitation de l\'utilisateur' });
    }
  }

  async getDocumentCollaborators(req, res) {
    try {
      const documentId = req.params.id;
      const userId = req.userId;

      const collaborators = await documentService.getDocumentCollaborators(documentId, userId);
      res.json(collaborators);
    } catch (err) {
      console.error(err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors de la récupération des collaborateurs' });
    }
  }

  async removeCollaborator(req, res) {
    try {
      const documentId = req.params.id;
      const collaboratorId = req.params.collaboratorId;
      const userId = req.userId;

      await documentService.removeCollaborator(documentId, collaboratorId, userId);
      res.json({ message: 'Collaborateur retiré avec succès' });
    } catch (err) {
      console.error(err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors du retrait du collaborateur' });
    }
  }
}

module.exports = new DocumentController();
