/**
 * Tests pour les routes de messagerie
 */
const request = require('supertest');
const express = require('express');
const messagingService = require('../../src/services/messaging-service');

// Mock pour le service de messagerie
jest.mock('../../src/services/messaging-service', () => ({
  getConversations: jest.fn().mockResolvedValue([]),
  getConversationById: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Conversation 1',
    is_group: false,
    created_at: new Date(),
    participants: [
      { user_id: 1, username: 'user1' },
      { user_id: 2, username: 'user2' }
    ]
  }),
  createConversation: jest.fn().mockResolvedValue({
    id: 3,
    name: 'Nouvelle conversation',
    is_group: true,
    created_at: new Date(),
    created_by: 1,
    participants: [
      { user_id: 1, username: 'user1' },
      { user_id: 2, username: 'user2' },
      { user_id: 3, username: 'user3' }
    ]
  }),
  addParticipantToConversation: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Conversation 1',
    is_group: true,
    participants: [
      { user_id: 1, username: 'user1' },
      { user_id: 2, username: 'user2' },
      { user_id: 3, username: 'user3' }
    ]
  }),
  getMessages: jest.fn().mockResolvedValue([]),
  sendMessage: jest.fn().mockResolvedValue({
    id: 3,
    conversation_id: 1,
    sender_id: 1,
    content: 'Nouveau message',
    created_at: new Date(),
    sender: {
      username: 'user1',
      profile_picture: null
    }
  }),
  markMessagesAsRead: jest.fn().mockResolvedValue({ count: 5 }),
  getUnreadMessageCount: jest.fn().mockResolvedValue({ total: 10, byConversation: { 1: 5, 2: 5 } })
}));

// Mock JWT middleware
jest.mock('../../src/middlewares/jwt', () => (req, res, next) => {
  // Mock authenticated user
  req.userId = 1;
  next();
});

// Import the app
const app = express();
app.use(express.json());
const messagingRoutes = require('../../src/routes/messaging-routes');
app.use('/messaging', messagingRoutes);

describe('Messaging Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /messaging/conversations', () => {
    it('devrait récupérer toutes les conversations d\'un utilisateur', async () => {
      // Arrange
      const mockConversations = [
        {
          id: 1,
          name: 'Conversation 1',
          is_group: false,
          created_at: new Date(),
          participants: [
            { user_id: 1, username: 'user1' },
            { user_id: 2, username: 'user2' }
          ],
          last_message: {
            content: 'Dernier message',
            created_at: new Date()
          }
        },
        {
          id: 2,
          name: 'Conversation 2',
          is_group: true,
          created_at: new Date(),
          participants: [
            { user_id: 1, username: 'user1' },
            { user_id: 2, username: 'user2' },
            { user_id: 3, username: 'user3' }
          ],
          last_message: {
            content: 'Dernier message du groupe',
            created_at: new Date()
          }
        }
      ];

      messagingService.getConversations.mockResolvedValue(mockConversations);

      // Act
      const response = await request(app).get('/messaging/conversations');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockConversations);
      expect(messagingService.getConversations).toHaveBeenCalledWith(1);
    });

    it('devrait gérer les erreurs lors de la récupération des conversations', async () => {
      // Arrange
      messagingService.getConversations.mockRejectedValue(new Error('Erreur lors de la récupération des conversations'));

      // Act
      const response = await request(app).get('/messaging/conversations');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la récupération des conversations' });
    });
  });

  describe('GET /messaging/conversations/:id', () => {
    it('devrait récupérer une conversation par son ID', async () => {
      // Arrange
      const conversationId = 1;
      const mockConversation = {
        id: 1,
        name: 'Conversation 1',
        is_group: false,
        created_at: new Date(),
        participants: [
          { user_id: 1, username: 'user1' },
          { user_id: 2, username: 'user2' }
        ]
      };

      messagingService.getConversationById.mockResolvedValue(mockConversation);

      // Act
      const response = await request(app).get(`/messaging/conversations/${conversationId}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockConversation);
      expect(messagingService.getConversationById).toHaveBeenCalledWith(conversationId, 1);
    });

    it('devrait retourner une erreur 404 si la conversation n\'existe pas', async () => {
      // Arrange
      const conversationId = 999;

      messagingService.getConversationById.mockResolvedValue(null);

      // Act
      const response = await request(app).get(`/messaging/conversations/${conversationId}`);

      // Assert
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Conversation non trouvée' });
    });

    it('devrait gérer les erreurs lors de la récupération d\'une conversation', async () => {
      // Arrange
      const conversationId = 1;

      messagingService.getConversationById.mockRejectedValue(new Error('Erreur lors de la récupération de la conversation'));

      // Act
      const response = await request(app).get(`/messaging/conversations/${conversationId}`);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la récupération de la conversation' });
    });
  });

  describe('POST /messaging/conversations', () => {
    it('devrait créer une nouvelle conversation', async () => {
      // Arrange
      const mockRequest = {
        participantIds: [2, 3],
        name: 'Nouvelle conversation',
        isGroup: true
      };

      const mockConversation = {
        id: 3,
        name: 'Nouvelle conversation',
        is_group: true,
        created_at: new Date(),
        created_by: 1,
        participants: [
          { user_id: 1, username: 'user1' },
          { user_id: 2, username: 'user2' },
          { user_id: 3, username: 'user3' }
        ]
      };

      messagingService.createConversation.mockResolvedValue(mockConversation);

      // Act
      const response = await request(app)
        .post('/messaging/conversations')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockConversation);
      expect(messagingService.createConversation).toHaveBeenCalledWith(
        1,
        [2, 3],
        'Nouvelle conversation',
        true
      );
    });

    it('devrait retourner une erreur 400 si les participants sont manquants', async () => {
      // Arrange
      const mockRequest = {
        name: 'Nouvelle conversation',
        isGroup: true
        // participantIds manquants
      };

      // Act
      const response = await request(app)
        .post('/messaging/conversations')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Les IDs des participants sont requis' });
    });

    it('devrait gérer les erreurs lors de la création d\'une conversation', async () => {
      // Arrange
      const mockRequest = {
        participantIds: [2, 3],
        name: 'Nouvelle conversation',
        isGroup: true
      };

      messagingService.createConversation.mockRejectedValue(new Error('Erreur lors de la création de la conversation'));

      // Act
      const response = await request(app)
        .post('/messaging/conversations')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la création de la conversation' });
    });
  });

  describe('POST /messaging/conversations/:id/participants', () => {
    it('devrait ajouter un participant à une conversation', async () => {
      // Arrange
      const conversationId = 1;
      const mockRequest = {
        userId: 3
      };

      const mockConversation = {
        id: 1,
        name: 'Conversation 1',
        is_group: true,
        participants: [
          { user_id: 1, username: 'user1' },
          { user_id: 2, username: 'user2' },
          { user_id: 3, username: 'user3' }
        ]
      };

      messagingService.addParticipantToConversation.mockResolvedValue(mockConversation);

      // Act
      const response = await request(app)
        .post(`/messaging/conversations/${conversationId}/participants`)
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockConversation);
      expect(messagingService.addParticipantToConversation).toHaveBeenCalledWith(
        conversationId,
        3,
        1
      );
    });

    it('devrait retourner une erreur 400 si l\'ID de l\'utilisateur est manquant', async () => {
      // Arrange
      const conversationId = 1;
      const mockRequest = {
        // userId manquant
      };

      // Act
      const response = await request(app)
        .post(`/messaging/conversations/${conversationId}/participants`)
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'L\'ID de l\'utilisateur est requis' });
    });

    it('devrait gérer les erreurs lors de l\'ajout d\'un participant', async () => {
      // Arrange
      const conversationId = 1;
      const mockRequest = {
        userId: 3
      };

      messagingService.addParticipantToConversation.mockRejectedValue(new Error('Erreur lors de l\'ajout du participant'));

      // Act
      const response = await request(app)
        .post(`/messaging/conversations/${conversationId}/participants`)
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de l\'ajout du participant' });
    });
  });

  describe('GET /messaging/conversations/:id/messages', () => {
    it('devrait récupérer les messages d\'une conversation', async () => {
      // Arrange
      const conversationId = 1;
      const mockMessages = [
        {
          id: 1,
          conversation_id: 1,
          sender_id: 2,
          content: 'Message 1',
          created_at: new Date(),
          sender: {
            username: 'user2',
            profile_picture: null
          }
        },
        {
          id: 2,
          conversation_id: 1,
          sender_id: 1,
          content: 'Message 2',
          created_at: new Date(),
          sender: {
            username: 'user1',
            profile_picture: null
          }
        }
      ];

      messagingService.getMessages.mockResolvedValue(mockMessages);

      // Act
      const response = await request(app).get(`/messaging/conversations/${conversationId}/messages`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMessages);
      expect(messagingService.getMessages).toHaveBeenCalledWith(conversationId, 1);
    });

    it('devrait gérer les erreurs lors de la récupération des messages', async () => {
      // Arrange
      const conversationId = 1;

      messagingService.getMessages.mockRejectedValue(new Error('Erreur lors de la récupération des messages'));

      // Act
      const response = await request(app).get(`/messaging/conversations/${conversationId}/messages`);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la récupération des messages' });
    });
  });

  describe('POST /messaging/conversations/:id/messages', () => {
    it('devrait envoyer un message dans une conversation', async () => {
      // Arrange
      const conversationId = 1;
      const mockRequest = {
        content: 'Nouveau message'
      };

      const mockMessage = {
        id: 3,
        conversation_id: 1,
        sender_id: 1,
        content: 'Nouveau message',
        created_at: new Date(),
        sender: {
          username: 'user1',
          profile_picture: null
        }
      };

      messagingService.sendMessage.mockResolvedValue(mockMessage);

      // Act
      const response = await request(app)
        .post(`/messaging/conversations/${conversationId}/messages`)
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockMessage);
      expect(messagingService.sendMessage).toHaveBeenCalledWith(
        conversationId,
        1,
        'Nouveau message'
      );
    });

    it('devrait retourner une erreur 400 si le contenu est manquant', async () => {
      // Arrange
      const conversationId = 1;
      const mockRequest = {
        // content manquant
      };

      // Act
      const response = await request(app)
        .post(`/messaging/conversations/${conversationId}/messages`)
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Le contenu du message est requis' });
    });

    it('devrait gérer les erreurs lors de l\'envoi d\'un message', async () => {
      // Arrange
      const conversationId = 1;
      const mockRequest = {
        content: 'Nouveau message'
      };

      messagingService.sendMessage.mockRejectedValue(new Error('Erreur lors de l\'envoi du message'));

      // Act
      const response = await request(app)
        .post(`/messaging/conversations/${conversationId}/messages`)
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de l\'envoi du message' });
    });
  });

  describe('POST /messaging/conversations/:id/read', () => {
    it('devrait marquer les messages d\'une conversation comme lus', async () => {
      // Arrange
      const conversationId = 1;

      messagingService.markMessagesAsRead.mockResolvedValue({ count: 5 });

      // Act
      const response = await request(app).post(`/messaging/conversations/${conversationId}/read`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Messages marqués comme lus',
        data: { count: 5 }
      });
      expect(messagingService.markMessagesAsRead).toHaveBeenCalledWith(conversationId, 1);
    });

    it('devrait gérer les erreurs lors du marquage des messages comme lus', async () => {
      // Arrange
      const conversationId = 1;

      messagingService.markMessagesAsRead.mockRejectedValue(new Error('Erreur lors du marquage des messages'));

      // Act
      const response = await request(app).post(`/messaging/conversations/${conversationId}/read`);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors du marquage des messages comme lus' });
    });
  });

  describe('GET /messaging/unread', () => {
    it('devrait récupérer le nombre de messages non lus', async () => {
      // Arrange
      messagingService.getUnreadMessageCount.mockResolvedValue({ total: 10, byConversation: { 1: 5, 2: 5 } });

      // Act
      const response = await request(app).get('/messaging/unread');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        total: 10,
        byConversation: { 1: 5, 2: 5 }
      });
      expect(messagingService.getUnreadMessageCount).toHaveBeenCalledWith(1);
    });

    it('devrait gérer les erreurs lors de la récupération du nombre de messages non lus', async () => {
      // Arrange
      messagingService.getUnreadMessageCount.mockRejectedValue(new Error('Erreur lors de la récupération des messages non lus'));

      // Act
      const response = await request(app).get('/messaging/unread');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la récupération du nombre de messages non lus' });
    });
  });
});
