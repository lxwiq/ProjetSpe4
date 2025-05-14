// src/services/document-service.js
const prisma = require('../lib/prisma');

class DocumentService {
  async getAllDocuments(userId) {
    // Get documents owned by the user or shared with the user
    return await prisma.documents.findMany({
      where: {
        OR: [
          { owner_id: parseInt(userId) },
          {
            document_invitations: {
              some: {
                user_id: parseInt(userId),
                is_active: true
              }
            }
          }
        ],
        is_deleted: false
      },
      include: {
        users_documents_owner_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true
          }
        },
        document_invitations: {
          where: {
            user_id: parseInt(userId)
          },
          select: {
            permission_level: true
          }
        }
      }
    });
  }

  async getDocumentById(id, userId) {
    // Get a specific document by ID (only if the user has access)
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(id),
        OR: [
          { owner_id: parseInt(userId) },
          {
            document_invitations: {
              some: {
                user_id: parseInt(userId),
                is_active: true
              }
            }
          }
        ],
        is_deleted: false
      },
      include: {
        users_documents_owner_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true
          }
        },
        document_invitations: {
          include: {
            users_document_invitations_user_idTousers: {
              select: {
                id: true,
                username: true,
                full_name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to access it');
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

    try {
      // Check if the user has permission to update the document
      const document = await this.checkDocumentAccess(id, userId, ['write', 'admin']);

      if (!document) {
        console.error(`DocumentService: Document ${id} non trouvé ou accès refusé pour l'utilisateur ${userId}`);
        throw new Error('Document not found or you do not have permission to update it');
      }

      console.log(`DocumentService: Accès vérifié pour le document ${id}, utilisateur ${userId}`);
    } catch (error) {
      console.error(`DocumentService: Erreur lors de la vérification des droits d'accès:`, error);
      throw error;
    }

    // Si le document a un chemin de fichier, mettre à jour le fichier
    if (document.file_path && data.content !== undefined) {
      try {
        const fs = require('fs');
        const path = require('path');

        // Convertir le chemin relatif en chemin absolu
        const relativePath = document.file_path.replace(/^\/uploads\//, '');
        const uploadsDir = path.join(__dirname, '..', '..', 'src', 'uploads');
        const fullPath = path.join(uploadsDir, relativePath);

        console.log(`DocumentService: Mise à jour du fichier: ${fullPath}`);

        // Vérifier si le répertoire existe
        if (!fs.existsSync(uploadsDir)) {
          console.log(`DocumentService: Création du répertoire ${uploadsDir}`);
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Écrire le contenu dans le fichier
        fs.writeFileSync(fullPath, data.content || '');
        console.log(`DocumentService: Fichier ${fullPath} mis à jour avec succès`);

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
        fs.writeFileSync(fullPath, data.content || '');

        // Calculer la taille du fichier
        const stats = fs.statSync(fullPath);
        const fileSize = stats.size;

        // Chemin relatif pour la base de données
        const relativePath = `/uploads/${fileName}`;

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
    // First check if the document exists and is owned by the user
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(id),
        owner_id: parseInt(userId)
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to delete it');
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

  async inviteUserToDocument(documentId, invitedUserId, invitingUserId, permissionLevel = 'read') {
    // Check if the inviting user is the owner of the document
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
        owner_id: parseInt(invitingUserId)
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to invite users');
    }

    // Check if the invited user exists
    const invitedUser = await prisma.users.findUnique({
      where: { id: parseInt(invitedUserId) }
    });

    if (!invitedUser) {
      throw new Error('Invited user not found');
    }

    // Check if an invitation already exists
    const existingInvitation = await prisma.document_invitations.findFirst({
      where: {
        document_id: parseInt(documentId),
        user_id: parseInt(invitedUserId)
      }
    });

    if (existingInvitation) {
      // Update the existing invitation
      return await prisma.document_invitations.update({
        where: { id: existingInvitation.id },
        data: {
          permission_level: permissionLevel,
          invited_by: parseInt(invitingUserId),
          invitation_date: new Date(),
          is_active: true
        },
        include: {
          users_document_invitations_user_idTousers: {
            select: {
              id: true,
              username: true,
              full_name: true,
              email: true
            }
          }
        }
      });
    }

    // Create a new invitation
    return await prisma.document_invitations.create({
      data: {
        document_id: parseInt(documentId),
        user_id: parseInt(invitedUserId),
        permission_level: permissionLevel,
        invited_by: parseInt(invitingUserId),
        invitation_date: new Date(),
        is_active: true
      },
      include: {
        users_document_invitations_user_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true,
            email: true
          }
        }
      }
    });
  }

  async getDocumentCollaborators(documentId, userId) {
    // Check if the user has access to the document
    const document = await this.checkDocumentAccess(documentId, userId);

    if (!document) {
      throw new Error('Document not found or you do not have permission to view collaborators');
    }

    // Get all collaborators (including the owner and invited users)
    const invitations = await prisma.document_invitations.findMany({
      where: {
        document_id: parseInt(documentId),
        is_active: true
      },
      include: {
        users_document_invitations_user_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true,
            email: true
          }
        }
      }
    });

    // Get the owner information
    const owner = await prisma.users.findUnique({
      where: { id: document.owner_id },
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true
      }
    });

    return {
      owner,
      collaborators: invitations.map(invitation => ({
        user: invitation.users_document_invitations_user_idTousers,
        permission_level: invitation.permission_level,
        invitation_date: invitation.invitation_date
      }))
    };
  }

  async removeCollaborator(documentId, collaboratorId, userId) {
    // Check if the user is the owner of the document
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
        owner_id: parseInt(userId)
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to remove collaborators');
    }

    // Remove the collaborator by setting is_active to false
    return await prisma.document_invitations.updateMany({
      where: {
        document_id: parseInt(documentId),
        user_id: parseInt(collaboratorId)
      },
      data: {
        is_active: false
      }
    });
  }

  async checkDocumentAccess(documentId, userId, permissionLevels = ['read', 'write', 'admin']) {
    // Check if the user has access to the document with the specified permission level
    return await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
        OR: [
          { owner_id: parseInt(userId) },
          {
            document_invitations: {
              some: {
                user_id: parseInt(userId),
                is_active: true,
                permission_level: { in: permissionLevels }
              }
            }
          }
        ]
      }
    });
  }
}

module.exports = new DocumentService();
