// src/services/messaging-service.js
const prisma = require('../lib/prisma');

class MessagingService {
  constructor() {
    // Map pour stocker les utilisateurs actifs dans les conversations
    // clé: conversation_id, valeur: [user_ids]
    this.activeConversations = new Map();
  }

  /**
   * Crée une nouvelle conversation
   * @param {number} creatorId - ID de l'utilisateur qui crée la conversation
   * @param {Array<number>} participantIds - IDs des participants (incluant le créateur)
   * @param {string} name - Nom de la conversation (optionnel, pour les groupes)
   * @param {boolean} isGroup - Indique si c'est une conversation de groupe
   * @returns {Promise<Object>} - Informations sur la conversation créée
   */
  async createConversation(creatorId, participantIds, name = null, isGroup = false) {
    // Vérifier si tous les participants existent
    const participants = await prisma.users.findMany({
      where: {
        id: {
          in: participantIds
        },
        is_active: true
      },
      select: {
        id: true
      }
    });

    if (participants.length !== participantIds.length) {
      throw new Error('Un ou plusieurs participants n\'existent pas ou sont inactifs');
    }

    // Pour les conversations non-groupe (1:1), vérifier si une conversation existe déjà
    if (!isGroup && participantIds.length === 2) {
      const existingConversation = await this.findDirectConversation(participantIds[0], participantIds[1]);
      if (existingConversation) {
        return existingConversation;
      }
    }

    // Créer la conversation
    const conversation = await prisma.conversations.create({
      data: {
        name,
        is_group: isGroup,
        created_by: creatorId,
        updated_at: new Date()
      }
    });

    // Ajouter les participants
    const participantPromises = participantIds.map(userId =>
      prisma.conversation_participants.create({
        data: {
          conversation_id: conversation.id,
          user_id: userId
        }
      })
    );

    await Promise.all(participantPromises);

    // Récupérer la conversation complète avec les participants
    return this.getConversationById(conversation.id);
  }

  /**
   * Trouve une conversation directe (1:1) entre deux utilisateurs
   * @param {number} userId1 - ID du premier utilisateur
   * @param {number} userId2 - ID du deuxième utilisateur
   * @returns {Promise<Object|null>} - Conversation trouvée ou null
   */
  async findDirectConversation(userId1, userId2) {
    // Trouver toutes les conversations non-groupe où les deux utilisateurs sont participants
    const conversations = await prisma.conversations.findMany({
      where: {
        is_group: false,
        conversation_participants: {
          every: {
            user_id: {
              in: [userId1, userId2]
            },
            is_active: true
          }
        }
      },
      include: {
        conversation_participants: {
          include: {
            users: {
              select: {
                id: true,
                username: true,
                full_name: true,
                profile_picture: true
              }
            }
          }
        }
      }
    });

    // Filtrer pour trouver une conversation avec exactement ces deux participants
    for (const conversation of conversations) {
      if (conversation.conversation_participants.length === 2) {
        const participantIds = conversation.conversation_participants.map(p => p.user_id);
        if (participantIds.includes(userId1) && participantIds.includes(userId2)) {
          return conversation;
        }
      }
    }

    return null;
  }

  /**
   * Récupère une conversation par son ID
   * @param {number} conversationId - ID de la conversation
   * @returns {Promise<Object>} - Informations sur la conversation
   */
  async getConversationById(conversationId) {
    const conversation = await prisma.conversations.findUnique({
      where: { id: conversationId },
      include: {
        conversation_participants: {
          where: { is_active: true },
          include: {
            users: {
              select: {
                id: true,
                username: true,
                full_name: true,
                profile_picture: true
              }
            }
          }
        },
        messages: {
          where: { is_deleted: false },
          orderBy: { sent_at: 'desc' },
          take: 20,
          include: {
            users: {
              select: {
                id: true,
                username: true,
                full_name: true,
                profile_picture: true
              }
            }
          }
        }
      }
    });

    if (!conversation) {
      throw new Error('Conversation non trouvée');
    }

    return conversation;
  }

  /**
   * Récupère toutes les conversations d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Array<Object>>} - Liste des conversations
   */
  async getUserConversations(userId) {
    const conversations = await prisma.conversations.findMany({
      where: {
        conversation_participants: {
          some: {
            user_id: userId,
            is_active: true
          }
        }
      },
      include: {
        conversation_participants: {
          where: { is_active: true },
          include: {
            users: {
              select: {
                id: true,
                username: true,
                full_name: true,
                profile_picture: true
              }
            }
          }
        },
        messages: {
          where: { is_deleted: false },
          orderBy: { sent_at: 'desc' },
          take: 1,
          include: {
            users: {
              select: {
                id: true,
                username: true
              }
            }
          }
        }
      },
      orderBy: {
        updated_at: 'desc'
      }
    });

    return conversations;
  }

  /**
   * Envoie un message dans une conversation
   * @param {number} conversationId - ID de la conversation
   * @param {number} senderId - ID de l'expéditeur
   * @param {string} content - Contenu du message
   * @returns {Promise<Object>} - Message créé
   */
  async sendMessage(conversationId, senderId, content) {
    // Vérifier si l'utilisateur est un participant actif de la conversation
    const participant = await prisma.conversation_participants.findFirst({
      where: {
        conversation_id: conversationId,
        user_id: senderId,
        is_active: true
      }
    });

    if (!participant) {
      throw new Error("Vous n'êtes pas un participant actif de cette conversation");
    }

    // Créer le message
    const message = await prisma.messages.create({
      data: {
        conversation_id: conversationId,
        sender_id: senderId,
        content
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            full_name: true,
            profile_picture: true
          }
        }
      }
    });

    // Mettre à jour la date de dernière mise à jour de la conversation
    await prisma.conversations.update({
      where: { id: conversationId },
      data: { updated_at: new Date() }
    });

    return message;
  }

  /**
   * Récupère les messages d'une conversation
   * @param {number} conversationId - ID de la conversation
   * @param {number} userId - ID de l'utilisateur qui fait la demande
   * @param {number} limit - Nombre de messages à récupérer
   * @param {number} offset - Offset pour la pagination
   * @returns {Promise<Array<Object>>} - Liste des messages
   */
  async getConversationMessages(conversationId, userId, limit = 50, offset = 0) {
    // Vérifier si l'utilisateur est un participant actif de la conversation
    const participant = await prisma.conversation_participants.findFirst({
      where: {
        conversation_id: conversationId,
        user_id: userId,
        is_active: true
      }
    });

    if (!participant) {
      throw new Error('Vous n\'êtes pas un participant actif de cette conversation');
    }

    // Récupérer les messages
    const messages = await prisma.messages.findMany({
      where: {
        conversation_id: conversationId,
        is_deleted: false
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            full_name: true,
            profile_picture: true
          }
        }
      },
      orderBy: {
        sent_at: 'desc'
      },
      take: limit,
      skip: offset
    });

    // Marquer les messages non lus comme lus
    await prisma.messages.updateMany({
      where: {
        conversation_id: conversationId,
        sender_id: { not: userId },
        read_at: null
      },
      data: {
        read_at: new Date()
      }
    });

    return messages;
  }

  /**
   * Ajoute un utilisateur à une conversation active
   * @param {number} conversationId - ID de la conversation
   * @param {number} userId - ID de l'utilisateur
   */
  addUserToActiveConversation(conversationId, userId) {
    if (!this.activeConversations.has(conversationId)) {
      this.activeConversations.set(conversationId, [userId]);
    } else {
      const users = this.activeConversations.get(conversationId);
      if (!users.includes(userId)) {
        users.push(userId);
        this.activeConversations.set(conversationId, users);
      }
    }
  }

  /**
   * Retire un utilisateur d'une conversation active
   * @param {number} conversationId - ID de la conversation
   * @param {number} userId - ID de l'utilisateur
   */
  removeUserFromActiveConversation(conversationId, userId) {
    if (this.activeConversations.has(conversationId)) {
      let users = this.activeConversations.get(conversationId);
      users = users.filter(id => id !== userId);

      if (users.length === 0) {
        this.activeConversations.delete(conversationId);
      } else {
        this.activeConversations.set(conversationId, users);
      }
    }
  }

  /**
   * Récupère les utilisateurs actifs dans une conversation
   * @param {number} conversationId - ID de la conversation
   * @returns {Array<number>} - Liste des IDs des utilisateurs actifs
   */
  getActiveConversationUsers(conversationId) {
    if (this.activeConversations.has(conversationId)) {
      return this.activeConversations.get(conversationId);
    }
    return [];
  }

  /**
   * Ajoute un participant à une conversation
   * @param {number} conversationId - ID de la conversation
   * @param {number} userId - ID de l'utilisateur à ajouter
   * @param {number} addedBy - ID de l'utilisateur qui ajoute
   * @returns {Promise<Object>} - Participant ajouté
   */
  async addParticipant(conversationId, userId, addedBy) {
    // Vérifier si la conversation existe et est un groupe
    const conversation = await prisma.conversations.findUnique({
      where: { id: conversationId }
    });

    if (!conversation) {
      throw new Error('Conversation non trouvée');
    }

    if (!conversation.is_group) {
      throw new Error('Impossible d\'ajouter des participants à une conversation non-groupe');
    }

    // Vérifier si l'utilisateur qui ajoute est un participant actif
    const adderParticipant = await prisma.conversation_participants.findFirst({
      where: {
        conversation_id: conversationId,
        user_id: addedBy,
        is_active: true
      }
    });

    if (!adderParticipant) {
      throw new Error('Vous n\'êtes pas autorisé à ajouter des participants à cette conversation');
    }

    // Vérifier si l'utilisateur à ajouter existe
    const userExists = await prisma.users.findUnique({
      where: { id: userId, is_active: true }
    });

    if (!userExists) {
      throw new Error('L\'utilisateur n\'existe pas ou est inactif');
    }

    // Vérifier si l'utilisateur est déjà un participant
    const existingParticipant = await prisma.conversation_participants.findFirst({
      where: {
        conversation_id: conversationId,
        user_id: userId
      }
    });

    if (existingParticipant) {
      if (existingParticipant.is_active) {
        throw new Error('L\'utilisateur est déjà un participant actif');
      } else {
        // Réactiver le participant
        return prisma.conversation_participants.update({
          where: { id: existingParticipant.id },
          data: {
            is_active: true,
            left_at: null,
            joined_at: new Date()
          }
        });
      }
    }

    // Ajouter le participant
    return prisma.conversation_participants.create({
      data: {
        conversation_id: conversationId,
        user_id: userId
      }
    });
  }

  /**
   * Quitte une conversation
   * @param {number} conversationId - ID de la conversation
   * @param {number} userId - ID de l'utilisateur qui quitte
   * @returns {Promise<Object>} - Résultat de l'opération
   */
  async leaveConversation(conversationId, userId) {
    // Vérifier si l'utilisateur est un participant actif
    const participant = await prisma.conversation_participants.findFirst({
      where: {
        conversation_id: conversationId,
        user_id: userId,
        is_active: true
      }
    });

    if (!participant) {
      throw new Error('Vous n\'êtes pas un participant actif de cette conversation');
    }

    // Mettre à jour le participant
    return prisma.conversation_participants.update({
      where: { id: participant.id },
      data: {
        is_active: false,
        left_at: new Date()
      }
    });
  }
}

module.exports = new MessagingService();
