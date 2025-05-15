// tests/services/messaging-service.test.js
const messagingService = require('../../src/services/messaging-service');
const prisma = require('../../src/lib/prisma');

// Mock de Prisma
jest.mock('../../src/lib/prisma', () => ({
  conversations: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn()
  },
  conversation_participants: {
    create: jest.fn(),
    findFirst: jest.fn(),
    updateMany: jest.fn(),
    update: jest.fn()
  },
  messages: {
    create: jest.fn(),
    findMany: jest.fn(),
    updateMany: jest.fn()
  },
  users: {
    findMany: jest.fn(),
    findUnique: jest.fn()
  }
}));

describe('MessagingService', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
    
    // Réinitialiser les conversations actives
    messagingService.activeConversations = new Map();
  });
  
  describe('createConversation', () => {
    it('devrait créer une nouvelle conversation de groupe', async () => {
      // Arrange
      const creatorId = 1;
      const participantIds = [1, 2, 3];
      const name = 'Groupe de test';
      const isGroup = true;
      
      // Mock des utilisateurs
      prisma.users.findMany.mockResolvedValue([
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ]);
      
      // Mock de la création de conversation
      prisma.conversations.create.mockResolvedValue({
        id: 1,
        name,
        is_group: isGroup,
        created_by: creatorId,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      // Mock de l'ajout des participants
      prisma.conversation_participants.create.mockImplementation(({ data }) => 
        Promise.resolve({
          id: Math.floor(Math.random() * 1000),
          conversation_id: data.conversation_id,
          user_id: data.user_id,
          joined_at: new Date(),
          is_active: true
        })
      );
      
      // Mock de la récupération de la conversation
      prisma.conversations.findUnique.mockResolvedValue({
        id: 1,
        name,
        is_group: isGroup,
        created_by: creatorId,
        created_at: new Date(),
        updated_at: new Date(),
        conversation_participants: [
          {
            id: 1,
            conversation_id: 1,
            user_id: 1,
            joined_at: new Date(),
            is_active: true,
            users: { id: 1, username: 'user1', full_name: 'User 1' }
          },
          {
            id: 2,
            conversation_id: 1,
            user_id: 2,
            joined_at: new Date(),
            is_active: true,
            users: { id: 2, username: 'user2', full_name: 'User 2' }
          },
          {
            id: 3,
            conversation_id: 1,
            user_id: 3,
            joined_at: new Date(),
            is_active: true,
            users: { id: 3, username: 'user3', full_name: 'User 3' }
          }
        ],
        messages: []
      });
      
      // Act
      const result = await messagingService.createConversation(creatorId, participantIds, name, isGroup);
      
      // Assert
      expect(prisma.users.findMany).toHaveBeenCalledWith({
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
      
      expect(prisma.conversations.create).toHaveBeenCalledWith({
        data: {
          name,
          is_group: isGroup,
          created_by: creatorId,
          updated_at: expect.any(Date)
        }
      });
      
      expect(prisma.conversation_participants.create).toHaveBeenCalledTimes(3);
      
      expect(prisma.conversations.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: expect.any(Object)
      });
      
      expect(result).toEqual(expect.objectContaining({
        id: 1,
        name,
        is_group: isGroup,
        created_by: creatorId,
        conversation_participants: expect.arrayContaining([
          expect.objectContaining({
            user_id: 1,
            is_active: true
          }),
          expect.objectContaining({
            user_id: 2,
            is_active: true
          }),
          expect.objectContaining({
            user_id: 3,
            is_active: true
          })
        ])
      }));
    });
    
    it('devrait trouver une conversation existante pour une conversation directe', async () => {
      // Arrange
      const user1Id = 1;
      const user2Id = 2;
      
      // Mock des utilisateurs
      prisma.users.findMany.mockResolvedValue([
        { id: 1 },
        { id: 2 }
      ]);
      
      // Mock de la recherche de conversation directe
      prisma.conversations.findMany.mockResolvedValue([
        {
          id: 1,
          name: null,
          is_group: false,
          created_by: user1Id,
          created_at: new Date(),
          updated_at: new Date(),
          conversation_participants: [
            {
              id: 1,
              conversation_id: 1,
              user_id: user1Id,
              joined_at: new Date(),
              is_active: true,
              users: { id: user1Id, username: 'user1', full_name: 'User 1' }
            },
            {
              id: 2,
              conversation_id: 1,
              user_id: user2Id,
              joined_at: new Date(),
              is_active: true,
              users: { id: user2Id, username: 'user2', full_name: 'User 2' }
            }
          ]
        }
      ]);
      
      // Act
      const result = await messagingService.createConversation(user1Id, [user1Id, user2Id], null, false);
      
      // Assert
      expect(prisma.users.findMany).toHaveBeenCalled();
      expect(prisma.conversations.findMany).toHaveBeenCalled();
      expect(prisma.conversations.create).not.toHaveBeenCalled();
      expect(prisma.conversation_participants.create).not.toHaveBeenCalled();
      
      expect(result).toEqual(expect.objectContaining({
        id: 1,
        is_group: false,
        conversation_participants: expect.arrayContaining([
          expect.objectContaining({
            user_id: user1Id,
            is_active: true
          }),
          expect.objectContaining({
            user_id: user2Id,
            is_active: true
          })
        ])
      }));
    });
  });
  
  describe('sendMessage', () => {
    it('devrait envoyer un message dans une conversation', async () => {
      // Arrange
      const conversationId = 1;
      const senderId = 1;
      const content = 'Test message';
      
      // Mock du participant
      prisma.conversation_participants.findFirst.mockResolvedValue({
        id: 1,
        conversation_id: conversationId,
        user_id: senderId,
        is_active: true
      });
      
      // Mock de la création du message
      prisma.messages.create.mockResolvedValue({
        id: 1,
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        sent_at: new Date(),
        read_at: null,
        is_deleted: false,
        users: {
          id: senderId,
          username: 'user1',
          full_name: 'User 1',
          profile_picture: null
        }
      });
      
      // Act
      const result = await messagingService.sendMessage(conversationId, senderId, content);
      
      // Assert
      expect(prisma.conversation_participants.findFirst).toHaveBeenCalledWith({
        where: {
          conversation_id: conversationId,
          user_id: senderId,
          is_active: true
        }
      });
      
      expect(prisma.messages.create).toHaveBeenCalledWith({
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
      
      expect(prisma.conversations.update).toHaveBeenCalledWith({
        where: { id: conversationId },
        data: { updated_at: expect.any(Date) }
      });
      
      expect(result).toEqual(expect.objectContaining({
        id: 1,
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        users: expect.objectContaining({
          id: senderId,
          username: 'user1'
        })
      }));
    });
    
    it('devrait rejeter si l\'utilisateur n\'est pas un participant actif', async () => {
      // Arrange
      const conversationId = 1;
      const senderId = 1;
      const content = 'Test message';
      
      // Mock du participant (non trouvé)
      prisma.conversation_participants.findFirst.mockResolvedValue(null);
      
      // Act & Assert
      await expect(messagingService.sendMessage(conversationId, senderId, content))
        .rejects
        .toThrow('Vous n\'êtes pas un participant actif de cette conversation');
      
      expect(prisma.messages.create).not.toHaveBeenCalled();
      expect(prisma.conversations.update).not.toHaveBeenCalled();
    });
  });
  
  describe('getConversationMessages', () => {
    it('devrait récupérer les messages d\'une conversation', async () => {
      // Arrange
      const conversationId = 1;
      const userId = 1;
      const limit = 50;
      const offset = 0;
      
      // Mock du participant
      prisma.conversation_participants.findFirst.mockResolvedValue({
        id: 1,
        conversation_id: conversationId,
        user_id: userId,
        is_active: true
      });
      
      // Mock des messages
      prisma.messages.findMany.mockResolvedValue([
        {
          id: 2,
          conversation_id: conversationId,
          sender_id: 2,
          content: 'Hello',
          sent_at: new Date(),
          read_at: null,
          is_deleted: false,
          users: {
            id: 2,
            username: 'user2',
            full_name: 'User 2',
            profile_picture: null
          }
        },
        {
          id: 1,
          conversation_id: conversationId,
          sender_id: userId,
          content: 'Hi',
          sent_at: new Date(Date.now() - 60000),
          read_at: null,
          is_deleted: false,
          users: {
            id: userId,
            username: 'user1',
            full_name: 'User 1',
            profile_picture: null
          }
        }
      ]);
      
      // Act
      const result = await messagingService.getConversationMessages(conversationId, userId, limit, offset);
      
      // Assert
      expect(prisma.conversation_participants.findFirst).toHaveBeenCalledWith({
        where: {
          conversation_id: conversationId,
          user_id: userId,
          is_active: true
        }
      });
      
      expect(prisma.messages.findMany).toHaveBeenCalledWith({
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
      
      expect(prisma.messages.updateMany).toHaveBeenCalledWith({
        where: {
          conversation_id: conversationId,
          sender_id: { not: userId },
          read_at: null
        },
        data: {
          read_at: expect.any(Date)
        }
      });
      
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(2);
      expect(result[1].id).toBe(1);
    });
  });
  
  describe('activeConversations', () => {
    it('devrait ajouter et retirer des utilisateurs des conversations actives', () => {
      // Arrange
      const conversationId = 1;
      const userId1 = 1;
      const userId2 = 2;
      
      // Act - Ajouter des utilisateurs
      messagingService.addUserToActiveConversation(conversationId, userId1);
      messagingService.addUserToActiveConversation(conversationId, userId2);
      
      // Assert
      expect(messagingService.getActiveConversationUsers(conversationId)).toEqual([userId1, userId2]);
      
      // Act - Retirer un utilisateur
      messagingService.removeUserFromActiveConversation(conversationId, userId1);
      
      // Assert
      expect(messagingService.getActiveConversationUsers(conversationId)).toEqual([userId2]);
      
      // Act - Retirer le dernier utilisateur
      messagingService.removeUserFromActiveConversation(conversationId, userId2);
      
      // Assert
      expect(messagingService.getActiveConversationUsers(conversationId)).toEqual([]);
      expect(messagingService.activeConversations.has(conversationId)).toBe(false);
    });
  });
});
