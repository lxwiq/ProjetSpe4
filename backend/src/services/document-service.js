// src/services/document-service.js
const prisma = require('../lib/prisma');

class DocumentService {
  async getAllDocuments(userId) {
    // Get all documents that are not deleted
    return await prisma.documents.findMany({
      where: {
        is_deleted: false
      },
      include: {
        users_documents_owner_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true
          }
        }
      }
    });
  }

  async getDocumentById(id, userId) {
    // Get a specific document by ID
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(id),
        is_deleted: false
      },
      include: {
        users_documents_owner_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true
          }
        }
      }
    });

    if (!document) {
      throw new Error('Document not found');
    }

    // Si le document n'est pas un dossier et a un chemin de fichier, lire le contenu du fichier
    if (!document.is_folder && document.file_path) {
      try {
        const fs = require('fs');
        const path = require('path');

        // Convertir le chemin relatif en chemin absolu
        const relativePath = document.file_path.replace(/^\/uploads\//, '');
        const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
        const fullPath = path.join(uploadsDir, relativePath);

        console.log(`Tentative de lecture du fichier: ${fullPath}`);

        // Vérifier si le fichier existe
        if (fs.existsSync(fullPath)) {
          // Lire le contenu du fichier
          const content = fs.readFileSync(fullPath, 'utf8');

          // Mettre à jour le document avec le contenu lu depuis le fichier
          document.content = content;
          console.log(`Contenu du fichier lu avec succès (${content.length} caractères)`);
        } else {
          console.warn(`Fichier non trouvé: ${fullPath}`);
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du fichier:', error);
      }
    }

    return document;
  }

  async addDocument({title, content, parentFolderId, isFolder,
                      userId, filePath, size, fileType}) {
    const fs = require('fs');
    const path = require('path');

    // Si c'est un dossier, on ne crée pas de fichier
    if (isFolder) {
      return await prisma.documents.create({
        data: {
          title,
          content: null,
          parent_folder_id: parentFolderId ? parseInt(parentFolderId) : null,
          is_folder: true,
          owner_id: parseInt(userId),
          file_path: null,
          file_size: null,
          file_type: null
        }
      });
    }

    // Si ce n'est pas un dossier et qu'il n'y a pas de chemin de fichier déjà défini,
    // on crée un fichier .txt avec le contenu
    if (!isFolder && !filePath) {
      // Générer un nom de fichier unique
      const timestamp = Date.now();
      const fileName = `${timestamp}.txt`;

      // Chemin complet du fichier
      const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
      const fullPath = path.join(uploadsDir, fileName);

      // S'assurer que le répertoire existe
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Écrire le contenu dans le fichier
      fs.writeFileSync(fullPath, content || '');

      // Calculer la taille du fichier
      const stats = fs.statSync(fullPath);
      const fileSize = stats.size;

      // Chemin relatif pour la base de données
      const relativePath = `/uploads/${fileName}`;

      // Créer le document dans la base de données sans le contenu
      return await prisma.documents.create({
        data: {
          title,
          content: null, // On ne stocke plus le contenu dans la base de données
          parent_folder_id: parentFolderId ? parseInt(parentFolderId) : null,
          is_folder: false,
          owner_id: parseInt(userId),
          file_path: relativePath,
          file_size: fileSize,
          file_type: 'text/plain'
        }
      });
    }

    // Si un chemin de fichier est déjà fourni (cas d'un téléchargement explicite)
    return await prisma.documents.create({
      data: {
        title,
        content: null, // On ne stocke plus le contenu dans la base de données
        parent_folder_id: parentFolderId ? parseInt(parentFolderId) : null,
        is_folder: isFolder || false,
        owner_id: parseInt(userId),
        file_path: filePath,
        file_size: size,
        file_type: fileType
      }
    });
  }


  async updateDocument(id, data, userId) {
    console.log(`DocumentService: Tentative de mise à jour du document ${id} par l'utilisateur ${userId}`);

    // Get the document
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(id),
        is_deleted: false
      }
    });

    if (!document) {
      console.error(`DocumentService: Document ${id} non trouvé`);
      throw new Error('Document not found');
    }

    console.log(`DocumentService: Document ${id} trouvé`);
    console.log(`DocumentService: Contenu reçu: ${data.content ? data.content.length : 0} caractères`);

    // Si le document a un chemin de fichier ou si le contenu est défini, mettre à jour le fichier
    if (data.content !== undefined) {
      try {
        const fs = require('fs');
        const path = require('path');

        // Convertir le chemin relatif en chemin absolu
        const relativePath = document.file_path.replace(/^\/uploads\//, '');
        const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');

        // S'assurer que le répertoire existe
        if (!fs.existsSync(uploadsDir)) {
          console.log(`DocumentService: Création du répertoire ${uploadsDir}`);
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const fullPath = path.join(uploadsDir, relativePath);

        console.log(`DocumentService: Chemin complet du fichier: ${fullPath}`);

        console.log(`DocumentService: Mise à jour du fichier: ${fullPath}`);

        // Écrire le contenu dans le fichier
        try {
          // Vérifier que le contenu est bien défini
          const contentToWrite = data.content || '';
          console.log(`DocumentService: Tentative d'écriture de ${contentToWrite.length} caractères dans le fichier ${fullPath}`);
          console.log(`DocumentService: Aperçu du contenu: ${contentToWrite.substring(0, 100)}...`);

          // Écrire le contenu dans le fichier
          fs.writeFileSync(fullPath, contentToWrite);

          // Vérifier que le fichier a bien été écrit
          if (fs.existsSync(fullPath)) {
            const writtenContent = fs.readFileSync(fullPath, 'utf8');
            console.log(`DocumentService: Vérification du fichier: ${writtenContent.length} caractères écrits`);

            if (writtenContent.length === 0 && contentToWrite.length > 0) {
              console.error(`DocumentService: ERREUR - Le fichier a été créé mais le contenu n'a pas été écrit correctement`);
              // Nouvelle tentative avec une méthode alternative
              fs.writeFileSync(fullPath, contentToWrite, { encoding: 'utf8', flag: 'w' });

              // Vérifier à nouveau
              const retryContent = fs.readFileSync(fullPath, 'utf8');
              console.log(`DocumentService: Après nouvelle tentative: ${retryContent.length} caractères écrits`);
            }
          } else {
            console.error(`DocumentService: ERREUR - Le fichier n'a pas été créé`);
          }

          console.log(`DocumentService: Fichier ${fullPath} mis à jour avec succès`);
        } catch (writeError) {
          console.error(`DocumentService: Erreur lors de l'écriture dans le fichier:`, writeError);

          // Tentative alternative d'écriture
          try {
            const contentToWrite = data.content || '';
            console.log(`DocumentService: Tentative alternative d'écriture dans ${fullPath}`);

            // Utiliser une méthode alternative d'écriture
            const fd = fs.openSync(fullPath, 'w');
            fs.writeSync(fd, contentToWrite);
            fs.closeSync(fd);

            console.log(`DocumentService: Écriture alternative réussie`);
          } catch (alternativeError) {
            console.error(`DocumentService: Échec de la tentative alternative:`, alternativeError);
            throw writeError; // Relancer l'erreur originale
          }
        }

        // Créer une copie de sauvegarde
        try {
          const backupDir = path.join(__dirname, '..', '..', 'backups');
          if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
          }

          const backupPath = path.join(backupDir, `document_${id}_backup_${Date.now()}.txt`);
          fs.writeFileSync(backupPath, data.content || '');
          console.log(`DocumentService: Sauvegarde créée à ${backupPath}`);
        } catch (backupError) {
          console.error(`DocumentService: Erreur lors de la création de la sauvegarde:`, backupError);
          // Ne pas échouer si la sauvegarde échoue
        }

        // Calculer la nouvelle taille du fichier
        const stats = fs.statSync(fullPath);
        const fileSize = stats.size;

        // Mettre à jour le document dans la base de données sans le contenu
        console.log(`DocumentService: Mise à jour du document ${id} dans la base de données`);
        const updatedDocument = await prisma.documents.update({
          where: { id: parseInt(id) },
          data: {
            title: data.title,
            content: null, // On ne stocke plus le contenu dans la base de données
            updated_at: new Date(),
            last_modified_by: parseInt(userId),
            file_size: fileSize
          }
        });
        console.log(`DocumentService: Document ${id} mis à jour avec succès dans la base de données`);

        // Créer une nouvelle version du document
        try {
          console.log(`DocumentService: Création d'une nouvelle version pour le document ${id}`);
          const latestVersion = await prisma.document_versions.findFirst({
            where: { document_id: parseInt(id) },
            orderBy: { version_number: 'desc' },
            select: { version_number: true }
          });

          const newVersionNumber = latestVersion ? latestVersion.version_number + 1 : 1;

          await prisma.document_versions.create({
            data: {
              document_id: parseInt(id),
              version_number: newVersionNumber,
              content: data.content,
              modified_by: userId,
              change_summary: data.changeSummary || `Updated by user ${userId}`
            }
          });
          console.log(`DocumentService: Version ${newVersionNumber} créée pour le document ${id}`);
        } catch (versionError) {
          console.error(`DocumentService: Erreur lors de la création de la version:`, versionError);
          // Ne pas échouer si la création de version échoue
        }

        return updatedDocument;
      } catch (error) {
        console.error('DocumentService: Erreur lors de la mise à jour du fichier:', error);
        throw error;
      }
    } else if (!document.file_path && data.content !== undefined) {
      // Si le document n'a pas de chemin de fichier mais a un contenu, créer un fichier
      try {
        const fs = require('fs');
        const path = require('path');

        // Générer un nom de fichier unique
        const timestamp = Date.now();
        const fileName = `${timestamp}.txt`;

        // Chemin complet du fichier
        const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
        const fullPath = path.join(uploadsDir, fileName);

        // S'assurer que le répertoire existe
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Écrire le contenu dans le fichier
        try {
          fs.writeFileSync(fullPath, data.content || '');
          console.log(`DocumentService: Contenu écrit dans le fichier: ${data.content ? data.content.substring(0, 50) + '...' : ''}`);
        } catch (writeError) {
          console.error(`DocumentService: Erreur lors de l'écriture dans le fichier:`, writeError);
          throw writeError;
        }

        // Calculer la taille du fichier
        const stats = fs.statSync(fullPath);
        const fileSize = stats.size;

        // Chemin relatif pour la base de données
        const relativePath = `/uploads/${fileName}`;
        console.log(`DocumentService: Chemin relatif pour la base de données: ${relativePath}`);

        // Mettre à jour le document dans la base de données
        return await prisma.documents.update({
          where: { id: parseInt(id) },
          data: {
            title: data.title,
            content: null, // On ne stocke plus le contenu dans la base de données
            updated_at: new Date(),
            last_modified_by: parseInt(userId),
            file_path: relativePath,
            file_size: fileSize,
            file_type: 'text/plain'
          }
        });
      } catch (error) {
        console.error('Erreur lors de la création du fichier:', error);
        throw error;
      }
    } else {
      // Si le document n'a pas de contenu à mettre à jour, mettre à jour uniquement le titre
      return await prisma.documents.update({
        where: { id: parseInt(id) },
        data: {
          title: data.title,
          updated_at: new Date(),
          last_modified_by: parseInt(userId)
        }
      });
    }
  }

  async deleteDocument(id, userId) {
    // Check if the document exists
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(id),
        is_deleted: false
      }
    });

    if (!document) {
      throw new Error('Document not found');
    }

    // Si le document a un chemin de fichier, supprimer le fichier physique
    if (document.file_path) {
      try {
        const fs = require('fs');
        const path = require('path');

        // Convertir le chemin relatif en chemin absolu
        const relativePath = document.file_path.replace(/^\/uploads\//, '');
        const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
        const fullPath = path.join(uploadsDir, relativePath);

        console.log(`Tentative de suppression du fichier: ${fullPath}`);

        // Vérifier si le fichier existe
        if (fs.existsSync(fullPath)) {
          // Supprimer le fichier
          fs.unlinkSync(fullPath);
          console.log(`Fichier supprimé avec succès: ${fullPath}`);
        } else {
          console.warn(`Fichier non trouvé lors de la suppression: ${fullPath}`);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du fichier:', error);
        // On continue la suppression du document même si la suppression du fichier échoue
      }
    }

    // If the document exists and is owned by the user, delete it
    return await prisma.documents.delete({
      where: { id: parseInt(id) }
    });
  }

  // Document sharing methods have been removed as part of the permissions system removal
}

module.exports = new DocumentService();
