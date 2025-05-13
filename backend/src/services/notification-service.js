// src/services/notification-service.js
const prisma = require('../lib/prisma');

class NotificationService {
  constructor() {
    // Map pour stocker les notifications non lues par utilisateur
    // clé: userId, valeur: [notifications]
    this.pendingNotifications = new Map();
  }

  /**
   * Crée une nouvelle notification
   * @param {number} userId - ID de l'utilisateur destinataire
   * @param {string} type - Type de notification (message, invitation, etc.)
   * @param {Object} data - Données associées à la notification
   * @param {number} senderId - ID de l'utilisateur qui a déclenché la notification (optionnel)
   * @returns {Promise<Object>} - Notification créée
   */
  async createNotification(userId, type, data, senderId = null) {
    // Créer la notification dans la base de données
    const notification = await prisma.notifications.create({
      data: {
        user_id: userId,
        type,
        content: JSON.stringify(data),
        sender_id: senderId,
        created_at: new Date(),
        is_read: false
      },
      include: {
        users_notifications_sender_idTousers: senderId ? {
          select: {
            id: true,
            username: true,
            full_name: true,
            profile_picture: true
          }
        } : undefined
      }
    });

    // Ajouter la notification à la liste des notifications en attente
    this.addPendingNotification(userId, notification);

    return notification;
  }

  /**
   * Ajoute une notification à la liste des notifications en attente
   * @param {number} userId - ID de l'utilisateur
   * @param {Object} notification - Notification à ajouter
   */
  addPendingNotification(userId, notification) {
    if (!this.pendingNotifications.has(userId)) {
      this.pendingNotifications.set(userId, []);
    }
    
    this.pendingNotifications.get(userId).push(notification);
  }

  /**
   * Récupère les notifications en attente pour un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Array<Object>} - Liste des notifications en attente
   */
  getPendingNotifications(userId) {
    if (this.pendingNotifications.has(userId)) {
      return this.pendingNotifications.get(userId);
    }
    return [];
  }

  /**
   * Supprime les notifications en attente pour un utilisateur
   * @param {number} userId - ID de l'utilisateur
   */
  clearPendingNotifications(userId) {
    this.pendingNotifications.set(userId, []);
  }

  /**
   * Récupère les notifications d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @param {boolean} unreadOnly - Récupérer uniquement les notifications non lues
   * @param {number} limit - Nombre de notifications à récupérer
   * @param {number} offset - Offset pour la pagination
   * @returns {Promise<Array<Object>>} - Liste des notifications
   */
  async getUserNotifications(userId, unreadOnly = false, limit = 20, offset = 0) {
    const notifications = await prisma.notifications.findMany({
      where: {
        user_id: userId,
        ...(unreadOnly ? { is_read: false } : {})
      },
      include: {
        users_notifications_sender_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true,
            profile_picture: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: limit,
      skip: offset
    });

    return notifications.map(notification => ({
      ...notification,
      content: JSON.parse(notification.content)
    }));
  }

  /**
   * Marque une notification comme lue
   * @param {number} notificationId - ID de la notification
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Notification mise à jour
   */
  async markAsRead(notificationId, userId) {
    const notification = await prisma.notifications.findUnique({
      where: { id: notificationId }
    });

    if (!notification || notification.user_id !== userId) {
      throw new Error('Notification non trouvée ou accès non autorisé');
    }

    return prisma.notifications.update({
      where: { id: notificationId },
      data: {
        is_read: true,
        read_at: new Date()
      }
    });
  }

  /**
   * Marque toutes les notifications d'un utilisateur comme lues
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Résultat de l'opération
   */
  async markAllAsRead(userId) {
    return prisma.notifications.updateMany({
      where: {
        user_id: userId,
        is_read: false
      },
      data: {
        is_read: true,
        read_at: new Date()
      }
    });
  }

  /**
   * Supprime une notification
   * @param {number} notificationId - ID de la notification
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} - Résultat de l'opération
   */
  async deleteNotification(notificationId, userId) {
    const notification = await prisma.notifications.findUnique({
      where: { id: notificationId }
    });

    if (!notification || notification.user_id !== userId) {
      throw new Error('Notification non trouvée ou accès non autorisé');
    }

    return prisma.notifications.delete({
      where: { id: notificationId }
    });
  }

  /**
   * Crée une notification pour un nouveau message
   * @param {number} userId - ID du destinataire
   * @param {Object} message - Message reçu
   * @param {Object} conversation - Conversation associée
   * @returns {Promise<Object>} - Notification créée
   */
  async createMessageNotification(userId, message, conversation) {
    const sender = message.users;
    const isGroup = conversation.is_group;
    const conversationName = isGroup ? conversation.name : sender.full_name || sender.username;

    const data = {
      messageId: message.id,
      conversationId: conversation.id,
      senderId: message.sender_id,
      senderName: sender.full_name || sender.username,
      conversationName,
      isGroup,
      preview: message.content.substring(0, 50) + (message.content.length > 50 ? '...' : '')
    };

    return this.createNotification(userId, 'new_message', data, message.sender_id);
  }

  /**
   * Crée une notification pour une invitation à une conversation
   * @param {number} userId - ID du destinataire
   * @param {number} conversationId - ID de la conversation
   * @param {number} inviterId - ID de l'inviteur
   * @param {string} conversationName - Nom de la conversation
   * @returns {Promise<Object>} - Notification créée
   */
  async createConversationInviteNotification(userId, conversationId, inviterId, conversationName) {
    const data = {
      conversationId,
      inviterId,
      conversationName
    };

    return this.createNotification(userId, 'conversation_invite', data, inviterId);
  }

  /**
   * Crée une notification pour une invitation à un document
   * @param {number} userId - ID du destinataire
   * @param {number} documentId - ID du document
   * @param {number} inviterId - ID de l'inviteur
   * @param {string} documentTitle - Titre du document
   * @param {string} permissionLevel - Niveau de permission
   * @returns {Promise<Object>} - Notification créée
   */
  async createDocumentInviteNotification(userId, documentId, inviterId, documentTitle, permissionLevel) {
    const data = {
      documentId,
      inviterId,
      documentTitle,
      permissionLevel
    };

    return this.createNotification(userId, 'document_invite', data, inviterId);
  }

  /**
   * Crée une notification pour un appel entrant
   * @param {number} userId - ID du destinataire
   * @param {number} callId - ID de l'appel
   * @param {number} callerId - ID de l'appelant
   * @param {number} documentId - ID du document associé
   * @param {string} documentTitle - Titre du document
   * @returns {Promise<Object>} - Notification créée
   */
  async createCallNotification(userId, callId, callerId, documentId, documentTitle) {
    const data = {
      callId,
      callerId,
      documentId,
      documentTitle
    };

    return this.createNotification(userId, 'incoming_call', data, callerId);
  }
}

module.exports = new NotificationService();
