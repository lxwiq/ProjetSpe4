// tests/services/notification-service.test.js
const notificationService = require('../../src/services/notification-service');
const prisma = require('../../src/lib/prisma');

// Mock de Prisma
jest.mock('../../src/lib/prisma', () => ({
  notifications: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn()
  }
}));

describe('NotificationService', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
    
    // Réinitialiser les notifications en attente
    notificationService.pendingNotifications = new Map();
  });
  
  describe('createNotification', () => {
    it('devrait créer une notification et l\'ajouter aux notifications en attente', async () => {
      // Arrange
      const userId = 1;
      const type = 'new_message';
      const data = { messageId: 1, senderId: 2, content: 'Hello' };
      const senderId = 2;
      
      const mockNotification = {
        id: 1,
        user_id: userId,
        type,
        content: JSON.stringify(data),
        sender_id: senderId,
        created_at: new Date(),
        is_read: false,
        users_notifications_sender_idTousers: {
          id: senderId,
          username: 'user2',
          full_name: 'User 2'
        }
      };
      
      prisma.notifications.create.mockResolvedValue(mockNotification);
      
      // Act
      const result = await notificationService.createNotification(userId, type, data, senderId);
      
      // Assert
      expect(prisma.notifications.create).toHaveBeenCalledWith({
        data: {
          user_id: userId,
          type,
          content: JSON.stringify(data),
          sender_id: senderId,
          created_at: expect.any(Date),
          is_read: false
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
        }
      });
      
      expect(result).toEqual(mockNotification);
      
      // Vérifier que la notification a été ajoutée aux notifications en attente
      expect(notificationService.pendingNotifications.get(userId)).toContainEqual(mockNotification);
    });
  });
  
  describe('pendingNotifications', () => {
    it('devrait gérer correctement les notifications en attente', () => {
      // Arrange
      const userId = 1;
      const notification1 = { id: 1, type: 'new_message' };
      const notification2 = { id: 2, type: 'document_invite' };
      
      // Act - Ajouter des notifications
      notificationService.addPendingNotification(userId, notification1);
      notificationService.addPendingNotification(userId, notification2);
      
      // Assert
      expect(notificationService.getPendingNotifications(userId)).toEqual([notification1, notification2]);
      
      // Act - Effacer les notifications
      notificationService.clearPendingNotifications(userId);
      
      // Assert
      expect(notificationService.getPendingNotifications(userId)).toEqual([]);
    });
    
    it('devrait retourner un tableau vide si aucune notification en attente', () => {
      // Act & Assert
      expect(notificationService.getPendingNotifications(999)).toEqual([]);
    });
  });
  
  describe('getUserNotifications', () => {
    it('devrait récupérer les notifications d\'un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const mockNotifications = [
        {
          id: 1,
          user_id: userId,
          type: 'new_message',
          content: JSON.stringify({ messageId: 1 }),
          sender_id: 2,
          created_at: new Date(),
          is_read: false,
          users_notifications_sender_idTousers: {
            id: 2,
            username: 'user2'
          }
        },
        {
          id: 2,
          user_id: userId,
          type: 'document_invite',
          content: JSON.stringify({ documentId: 1 }),
          sender_id: 3,
          created_at: new Date(),
          is_read: true,
          users_notifications_sender_idTousers: {
            id: 3,
            username: 'user3'
          }
        }
      ];
      
      prisma.notifications.findMany.mockResolvedValue(mockNotifications);
      
      // Act
      const result = await notificationService.getUserNotifications(userId);
      
      // Assert
      expect(prisma.notifications.findMany).toHaveBeenCalledWith({
        where: {
          user_id: userId
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
        take: 20,
        skip: 0
      });
      
      expect(result).toHaveLength(2);
      expect(result[0].content).toEqual({ messageId: 1 });
      expect(result[1].content).toEqual({ documentId: 1 });
    });
    
    it('devrait récupérer uniquement les notifications non lues', async () => {
      // Arrange
      const userId = 1;
      const unreadOnly = true;
      
      prisma.notifications.findMany.mockResolvedValue([]);
      
      // Act
      await notificationService.getUserNotifications(userId, unreadOnly);
      
      // Assert
      expect(prisma.notifications.findMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          is_read: false
        },
        include: expect.any(Object),
        orderBy: expect.any(Object),
        take: expect.any(Number),
        skip: expect.any(Number)
      });
    });
  });
  
  describe('markAsRead', () => {
    it('devrait marquer une notification comme lue', async () => {
      // Arrange
      const notificationId = 1;
      const userId = 1;
      
      prisma.notifications.findUnique.mockResolvedValue({
        id: notificationId,
        user_id: userId
      });
      
      prisma.notifications.update.mockResolvedValue({
        id: notificationId,
        is_read: true,
        read_at: expect.any(Date)
      });
      
      // Act
      const result = await notificationService.markAsRead(notificationId, userId);
      
      // Assert
      expect(prisma.notifications.findUnique).toHaveBeenCalledWith({
        where: { id: notificationId }
      });
      
      expect(prisma.notifications.update).toHaveBeenCalledWith({
        where: { id: notificationId },
        data: {
          is_read: true,
          read_at: expect.any(Date)
        }
      });
      
      expect(result.is_read).toBe(true);
    });
    
    it('devrait rejeter si la notification n\'appartient pas à l\'utilisateur', async () => {
      // Arrange
      const notificationId = 1;
      const userId = 1;
      
      prisma.notifications.findUnique.mockResolvedValue({
        id: notificationId,
        user_id: 2 // Autre utilisateur
      });
      
      // Act & Assert
      await expect(notificationService.markAsRead(notificationId, userId))
        .rejects
        .toThrow('Notification non trouvée ou accès non autorisé');
      
      expect(prisma.notifications.update).not.toHaveBeenCalled();
    });
  });
  
  describe('markAllAsRead', () => {
    it('devrait marquer toutes les notifications d\'un utilisateur comme lues', async () => {
      // Arrange
      const userId = 1;
      
      prisma.notifications.updateMany.mockResolvedValue({
        count: 5
      });
      
      // Act
      const result = await notificationService.markAllAsRead(userId);
      
      // Assert
      expect(prisma.notifications.updateMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          is_read: false
        },
        data: {
          is_read: true,
          read_at: expect.any(Date)
        }
      });
      
      expect(result.count).toBe(5);
    });
  });
  
  describe('createSpecificNotifications', () => {
    it('devrait créer une notification pour un nouveau message', async () => {
      // Arrange
      const userId = 1;
      const message = {
        id: 1,
        sender_id: 2,
        content: 'Hello world',
        users: {
          id: 2,
          username: 'user2',
          full_name: 'User 2'
        }
      };
      const conversation = {
        id: 1,
        is_group: true,
        name: 'Group Chat'
      };
      
      const spy = jest.spyOn(notificationService, 'createNotification');
      spy.mockResolvedValue({});
      
      // Act
      await notificationService.createMessageNotification(userId, message, conversation);
      
      // Assert
      expect(spy).toHaveBeenCalledWith(
        userId,
        'new_message',
        expect.objectContaining({
          messageId: message.id,
          conversationId: conversation.id,
          senderId: message.sender_id,
          senderName: 'User 2',
          conversationName: 'Group Chat',
          isGroup: true,
          preview: 'Hello world'
        }),
        message.sender_id
      );
      
      spy.mockRestore();
    });
    
    it('devrait créer une notification pour une invitation à une conversation', async () => {
      // Arrange
      const userId = 1;
      const conversationId = 1;
      const inviterId = 2;
      const conversationName = 'Group Chat';
      
      const spy = jest.spyOn(notificationService, 'createNotification');
      spy.mockResolvedValue({});
      
      // Act
      await notificationService.createConversationInviteNotification(userId, conversationId, inviterId, conversationName);
      
      // Assert
      expect(spy).toHaveBeenCalledWith(
        userId,
        'conversation_invite',
        {
          conversationId,
          inviterId,
          conversationName
        },
        inviterId
      );
      
      spy.mockRestore();
    });
  });
});
