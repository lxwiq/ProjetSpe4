
const documentService = require('../services/document-service');
const notificationService = require('../services/notification-service');
const { getRelativePath, getDocumentType } = require('../middlewares/upload');
const path = require('path');
const fs = require('fs');

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
      let fileName = null;
      let fileOriginalName = null;
      let fileExtension = null;
      let fileUploadDate = null;

      if (file) {
        // Utiliser un chemin relatif pour le stockage en base de données
        filePath = getRelativePath(file.path);

        // Extraire les métadonnées du fichier
        fileSize = file.size;
        fileType = file.mimetype;
        fileName = path.basename(file.path);
        fileOriginalName = file.originalname;
        fileExtension = path.extname(file.originalname).toLowerCase();
        fileUploadDate = new Date();

        // Si c'est un fichier texte sans extension .txt, ajouter l'extension
        if (file.mimetype.includes('text/plain') && fileExtension !== '.txt') {
          fileExtension = '.txt';
          filePath = filePath + '.txt';
        }

        console.log("Métadonnées du fichier:", {
          filePath,
          fileSize,
          fileType,
          fileName,
          fileOriginalName,
          fileExtension,
          fileUploadDate
        });
      }

      const newDocument = await documentService.addDocument({
        title: file ? fileOriginalName : title,
        content,
        parentFolderId,
        isFolder,
        userId,
        filePath,
        size: fileSize,
        fileType,
        fileName,
        fileOriginalName,
        fileExtension,
        fileUploadDate
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

  /**
   * Mettre à jour un document avec un nouveau fichier
   */
  async updateDocumentFile(req, res) {
    try {
      const documentId = req.params.id;
      const userId = req.userId;
      const { title } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Aucun fichier fourni' });
      }

      // Récupérer le document existant
      const existingDocument = await documentService.getDocumentById(documentId, userId);

      if (!existingDocument) {
        return res.status(404).json({ message: 'Document non trouvé' });
      }

      // Supprimer l'ancien fichier si nécessaire
      if (existingDocument.file_path) {
        try {
          const oldFilePath = path.join(__dirname, '..', '..', 'src', existingDocument.file_path.replace(/^\/uploads\//, 'uploads/'));
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
            console.log(`Ancien fichier supprimé: ${oldFilePath}`);
          }
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'ancien fichier:', error);
          // Continuer même si la suppression échoue
        }
      }

      // Préparer les métadonnées du nouveau fichier
      const filePath = getRelativePath(file.path);
      const fileSize = file.size;
      const fileType = file.mimetype;
      const fileName = path.basename(file.path);
      const fileOriginalName = file.originalname;
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const fileUploadDate = new Date();

      // Mettre à jour le document
      const updatedDocument = await documentService.updateDocumentFile(documentId, {
        title: title || fileOriginalName,
        userId,
        filePath,
        fileSize,
        fileType,
        fileName,
        fileOriginalName,
        fileExtension,
        fileUploadDate
      });

      // Convertir les BigInt en nombre avant de les renvoyer
      const safeDocument = JSON.parse(JSON.stringify(updatedDocument, (key, value) =>
        typeof value === 'bigint' ? Number(value) : value
      ));

      res.json({
        message: 'Document mis à jour avec succès !',
        data: safeDocument
      });
    } catch (err) {
      console.error('Erreur lors de la mise à jour du document avec fichier:', err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors de la mise à jour du document' });
    }
  }

  /**
   * Télécharger un document
   */
  async downloadDocument(req, res) {
    try {
      const documentId = req.params.id;
      const userId = req.userId;

      // Récupérer le document
      const document = await documentService.getDocumentById(documentId, userId);

      if (!document) {
        return res.status(404).json({ message: 'Document non trouvé' });
      }

      // Vérifier si le document a un fichier associé
      if (!document.file_path) {
        return res.status(404).json({ message: 'Aucun fichier associé à ce document' });
      }

      // Construire le chemin absolu du fichier
      const filePath = path.join(__dirname, '..', '..', 'src', document.file_path.replace(/^\/uploads\//, 'uploads/'));

      // Vérifier si le fichier existe
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Fichier non trouvé sur le serveur' });
      }

      // Déterminer le type MIME
      const mimeType = document.file_type || 'application/octet-stream';

      // Définir les en-têtes pour le téléchargement
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${document.file_original_name || document.title}"`);

      // Envoyer le fichier
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (err) {
      console.error('Erreur lors du téléchargement du document:', err);
      if (err.message.includes('not found') || err.message.includes('permission')) {
        return res.status(403).json({ message: err.message });
      }
      res.status(500).json({ message: 'Erreur lors du téléchargement du document' });
    }
  }

  // Document sharing methods have been removed as part of the permissions system removal
}

module.exports = new DocumentController();
