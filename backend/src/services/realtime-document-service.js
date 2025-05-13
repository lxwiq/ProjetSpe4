// src/services/realtime-document-service.js
const prisma = require('../lib/prisma');

class RealtimeDocumentService {
  constructor() {
    // Map pour stocker les documents actuellement en édition
    // clé: document_id, valeur: { content, users: [user_ids], lastSaved: timestamp }
    this.activeDocuments = new Map();
  }

  /**
   * Ajoute un utilisateur à un document actif ou crée une nouvelle session
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Informations sur le document
   */
  async joinDocument(documentId, userId) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await this.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      throw new Error('Accès refusé au document');
    }

    // Récupérer le document depuis la base de données
    const document = await prisma.documents.findUnique({
      where: { id: documentId },
      include: {
        document_invitations: {
          where: {
            is_active: true
          },
          include: {
            users_document_invitations_user_idTousers: {
              select: {
                id: true,
                username: true,
                full_name: true
              }
            }
          }
        },
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
      throw new Error('Document non trouvé');
    }

    // Si le document n'est pas déjà en édition active, l'ajouter
    if (!this.activeDocuments.has(documentId)) {
      this.activeDocuments.set(documentId, {
        content: document.content || '',
        users: [userId],
        lastSaved: new Date(),
        title: document.title
      });
    } else {
      // Ajouter l'utilisateur à la liste des utilisateurs actifs s'il n'y est pas déjà
      const activeDoc = this.activeDocuments.get(documentId);
      if (!activeDoc.users.includes(userId)) {
        activeDoc.users.push(userId);
        this.activeDocuments.set(documentId, activeDoc);
      }
    }

    // Préparer les informations sur les utilisateurs actifs
    const activeUserIds = this.activeDocuments.get(documentId).users;

    // Récupérer les informations détaillées des utilisateurs actifs
    const activeUsers = await Promise.all(
      activeUserIds.map(async (userId) => {
        try {
          return await this.getUserInfo(userId);
        } catch (error) {
          console.error(`Error getting user info for user ${userId}:`, error);
          return { id: userId, username: `User ${userId}` };
        }
      })
    );

    // Retourner les informations sur le document et les utilisateurs actifs
    return {
      document,
      activeUsers,
      currentContent: this.activeDocuments.get(documentId).content
    };
  }

  /**
   * Retire un utilisateur d'un document actif
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   */
  leaveDocument(documentId, userId) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    if (this.activeDocuments.has(documentId)) {
      const activeDoc = this.activeDocuments.get(documentId);
      activeDoc.users = activeDoc.users.filter(id => id !== userId);

      // Si plus personne n'édite le document, le supprimer de la liste des documents actifs
      if (activeDoc.users.length === 0) {
        this.activeDocuments.delete(documentId);
      } else {
        this.activeDocuments.set(documentId, activeDoc);
      }
    }
  }

  /**
   * Met à jour le contenu d'un document
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @param {string} content - Nouveau contenu
   * @returns {Promise<Object>} - Informations sur la mise à jour
   */
  async updateDocumentContent(documentId, userId, content) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await this.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      throw new Error('Accès refusé au document');
    }

    // Vérifier si le document est en édition active
    if (!this.activeDocuments.has(documentId)) {
      throw new Error('Document non actif');
    }

    // Mettre à jour le contenu
    const activeDoc = this.activeDocuments.get(documentId);
    activeDoc.content = content;
    activeDoc.lastModifiedBy = userId;
    activeDoc.lastModified = new Date();
    this.activeDocuments.set(documentId, activeDoc);

    return {
      documentId,
      content,
      lastModifiedBy: userId,
      lastModified: activeDoc.lastModified
    };
  }

  /**
   * Sauvegarde le contenu d'un document dans la base de données
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Informations sur la sauvegarde
   */
  async saveDocument(documentId, userId) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await this.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      throw new Error('Accès refusé au document');
    }

    // Vérifier si le document est en édition active
    if (!this.activeDocuments.has(documentId)) {
      throw new Error('Document non actif');
    }

    const activeDoc = this.activeDocuments.get(documentId);

    // Mettre à jour le document dans la base de données
    const updatedDocument = await prisma.documents.update({
      where: { id: documentId },
      data: {
        content: activeDoc.content,
        last_modified_by: userId,
        updated_at: new Date()
      }
    });

    // Créer une nouvelle version du document
    const latestVersion = await prisma.document_versions.findFirst({
      where: { document_id: documentId },
      orderBy: { version_number: 'desc' },
      select: { version_number: true }
    });

    const newVersionNumber = latestVersion ? latestVersion.version_number + 1 : 1;

    await prisma.document_versions.create({
      data: {
        document_id: documentId,
        version_number: newVersionNumber,
        content: activeDoc.content,
        modified_by: userId,
        change_summary: `Modification automatique par ${userId}`
      }
    });

    // Mettre à jour la date de dernière sauvegarde
    activeDoc.lastSaved = new Date();
    this.activeDocuments.set(documentId, activeDoc);

    return {
      documentId,
      savedAt: activeDoc.lastSaved,
      versionNumber: newVersionNumber
    };
  }

  /**
   * Vérifie si un utilisateur a accès à un document
   * @param {number} documentId - ID du document
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<boolean>} - true si l'utilisateur a accès, false sinon
   */
  async checkUserDocumentAccess(documentId, userId) {
    documentId = parseInt(documentId);
    userId = parseInt(userId);

    // Vérifier si l'utilisateur est le propriétaire du document
    const document = await prisma.documents.findFirst({
      where: {
        id: documentId,
        OR: [
          { owner_id: userId },
          {
            document_invitations: {
              some: {
                user_id: userId,
                is_active: true
              }
            }
          }
        ]
      }
    });

    return !!document;
  }

  /**
   * Invite un utilisateur à éditer un document
   * @param {number} documentId - ID du document
   * @param {number} invitedUserId - ID de l'utilisateur invité
   * @param {number} invitingUserId - ID de l'utilisateur qui invite
   * @param {string} permissionLevel - Niveau de permission (read, write, admin)
   * @returns {Promise<Object>} - Informations sur l'invitation
   */
  async inviteUserToDocument(documentId, invitedUserId, invitingUserId, permissionLevel = 'write') {
    documentId = parseInt(documentId);
    invitedUserId = parseInt(invitedUserId);
    invitingUserId = parseInt(invitingUserId);

    // Vérifier si l'utilisateur qui invite a accès au document
    const document = await prisma.documents.findFirst({
      where: {
        id: documentId,
        owner_id: invitingUserId
      }
    });

    if (!document) {
      throw new Error('Document non trouvé ou vous n\'avez pas les droits pour inviter');
    }

    // Vérifier si l'utilisateur invité existe
    const invitedUser = await prisma.users.findUnique({
      where: { id: invitedUserId }
    });

    if (!invitedUser) {
      throw new Error('Utilisateur invité non trouvé');
    }

    // Vérifier si une invitation existe déjà
    const existingInvitation = await prisma.document_invitations.findFirst({
      where: {
        document_id: documentId,
        user_id: invitedUserId
      }
    });

    if (existingInvitation) {
      // Mettre à jour l'invitation existante
      const updatedInvitation = await prisma.document_invitations.update({
        where: { id: existingInvitation.id },
        data: {
          permission_level: permissionLevel,
          invited_by: invitingUserId,
          invitation_date: new Date(),
          is_active: true
        }
      });
      return updatedInvitation;
    } else {
      // Créer une nouvelle invitation
      const newInvitation = await prisma.document_invitations.create({
        data: {
          document_id: documentId,
          user_id: invitedUserId,
          permission_level: permissionLevel,
          invited_by: invitingUserId
        }
      });
      return newInvitation;
    }
  }

  /**
   * Récupère les utilisateurs actifs sur un document
   * @param {number} documentId - ID du document
   * @param {boolean} detailed - Si true, retourne les informations détaillées des utilisateurs
   * @returns {Promise<Array>} - Liste des utilisateurs actifs
   */
  async getActiveUsers(documentId, detailed = false) {
    documentId = parseInt(documentId);

    if (!this.activeDocuments.has(documentId)) {
      return [];
    }

    const userIds = this.activeDocuments.get(documentId).users;

    if (!detailed) {
      return userIds;
    }

    // Récupérer les informations détaillées des utilisateurs
    const activeUsers = await Promise.all(
      userIds.map(async (userId) => {
        try {
          return await this.getUserInfo(userId);
        } catch (error) {
          console.error(`Error getting user info for user ${userId}:`, error);
          return { id: userId, username: `User ${userId}` };
        }
      })
    );

    return activeUsers;
  }

  /**
   * Récupère les informations d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Informations sur l'utilisateur
   */
  async getUserInfo(userId) {
    userId = parseInt(userId);

    // Récupérer les informations de l'utilisateur depuis la base de données
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        full_name: true,
        profile_picture: true
      }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Générer une couleur unique pour l'utilisateur basée sur son ID
    const colors = [
      '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
      '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'
    ];
    const color = colors[userId % colors.length];

    return {
      ...user,
      color
    };
  }
}

module.exports = new RealtimeDocumentService();
