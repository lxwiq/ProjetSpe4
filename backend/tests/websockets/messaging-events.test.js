// tests/websockets/messaging-events.test.js
const SocketManager = require('../../src/websockets/socket-manager');
const messagingService = require('../../src/services/messaging-service');
const jwt = require('jsonwebtoken');

// Mock des modules
jest.mock('socket.io', () => {
  const mockSocketIo = {
    use: jest.fn().mockImplementation(fn => {
      mockSocketIo.middleware = fn;
      return mockSocketIo;
    }),
    on: jest.fn().mockImplementation((event, callback) => {
      if (event === 'connection') {
        mockSocketIo.connectionCallback = callback;
      }
      return mockSocketIo;
    }),
    to: jest.fn().mockReturnThis(),
    emit: jest.fn()
  };
  
  return jest.fn(() => mockSocketIo);
});

jest.mock('jsonwebtoken');
jest.mock('../../src/services/messaging-service');

describe('SocketManager - Messaging Events', () => {
  let socketManager;
  let mockServer;
  let mockSocket;
  let mockIo;
  
  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();
    
    // Créer un mock du serveur
    mockServer = {};
    
    // Créer un mock du socket
    mockSocket = {
      id: 'socket-id-1',
      userId: 1,
      isAdmin: false,
      handshake: {
        auth: {
          token: 'valid-token'
        }
      },
      join: jest.fn(),
      leave: jest.fn(),
      to: jest.fn().mockReturnThis(),
      emit: jest.fn(),
      on: jest.fn()
    };
    
    // Initialiser le gestionnaire de sockets
    socketManager = new SocketManager(mockServer);
    mockIo = socketManager.io;
    
    // Mock de la vérification JWT
    jwt.verify.mockReturnValue({ userId: 1 });
    
    // Simuler la connexion d'un socket
    mockIo.middleware(mockSocket, jest.fn());
    mockIo.connectionCallback(mockSocket);
  });
  
  describe('setupMessagingEvents', () => {
    it('devrait configurer les événements de messagerie', () => {
      // Assert
      expect(mockSocket.on).toHaveBeenCalledWith('conversation:create', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('conversation:join', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('conversation:leave', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('message:send', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('message:mark-read', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('conversation:add-participant', expect.any(Function));
    });
    
    it('devrait créer une conversation et informer les participants', async () => {
      // Arrange
      const eventHandler = mockSocket.on.mock.calls.find(call => call[0] === 'conversation:create')[1];
      const callback = jest.fn();
      const data = {
        participantIds: [2, 3],
        name: 'Groupe de test',
        isGroup: true
      };
      
      // Mock de la création de conversation
      const mockConversation = {
        id: 1,
        name: 'Groupe de test',
        is_group: true,
        created_by: 1,
        conversation_participants: [
          { user_id: 1 },
          { user_id: 2 },
          { user_id: 3 }
        ]
      };
      messagingService.createConversation.mockResolvedValue(mockConversation);
      
      // Mock des sockets des utilisateurs
      socketManager.userSockets.set(2, 'socket-id-2');
      socketManager.userSockets.set(3, 'socket-id-3');
      
      // Act
      await eventHandler(data, callback);
      
      // Assert
      expect(messagingService.createConversation).toHaveBeenCalledWith(
        1,
        [1, 2, 3],
        'Groupe de test',
        true
      );
      
      expect(mockSocket.join).toHaveBeenCalledWith('conversation:1');
      expect(messagingService.addUserToActiveConversation).toHaveBeenCalledWith(1, 1);
      
      expect(mockIo.to).toHaveBeenCalledWith('socket-id-2');
      expect(mockIo.to).toHaveBeenCalledWith('socket-id-3');
      expect(mockIo.emit).toHaveBeenCalledTimes(2);
      
      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: mockConversation
      });
    });
    
    it('devrait envoyer un message et informer les autres participants', async () => {
      // Arrange
      const eventHandler = mockSocket.on.mock.calls.find(call => call[0] === 'message:send')[1];
      const callback = jest.fn();
      const data = {
        conversationId: 1,
        content: 'Hello world!'
      };
      
      // Mock de l'envoi de message
      const mockMessage = {
        id: 1,
        conversation_id: 1,
        sender_id: 1,
        content: 'Hello world!',
        sent_at: new Date(),
        users: {
          id: 1,
          username: 'user1'
        }
      };
      messagingService.sendMessage.mockResolvedValue(mockMessage);
      
      // Act
      await eventHandler(data, callback);
      
      // Assert
      expect(messagingService.sendMessage).toHaveBeenCalledWith(1, 1, 'Hello world!');
      
      expect(mockSocket.to).toHaveBeenCalledWith('conversation:1');
      expect(mockSocket.emit).toHaveBeenCalledWith('message:received', {
        message: mockMessage
      });
      
      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: mockMessage
      });
    });
    
    it('devrait gérer les erreurs lors de l\'envoi d\'un message', async () => {
      // Arrange
      const eventHandler = mockSocket.on.mock.calls.find(call => call[0] === 'message:send')[1];
      const callback = jest.fn();
      const data = {
        conversationId: 1,
        content: 'Hello world!'
      };
      
      // Mock de l'erreur
      const error = new Error('Vous n\'êtes pas un participant actif de cette conversation');
      messagingService.sendMessage.mockRejectedValue(error);
      
      // Act
      await eventHandler(data, callback);
      
      // Assert
      expect(messagingService.sendMessage).toHaveBeenCalledWith(1, 1, 'Hello world!');
      
      expect(callback).toHaveBeenCalledWith({
        success: false,
        error: error.message
      });
    });
  });
  
  describe('handleUserDisconnect', () => {
    it('devrait retirer l\'utilisateur des conversations actives lors de la déconnexion', async () => {
      // Arrange
      const userId = 1;
      const conversationId = 1;
      
      // Mock des conversations actives
      messagingService.activeConversations = new Map([
        [conversationId, [userId, 2, 3]]
      ]);
      messagingService.getActiveConversationUsers.mockReturnValue([2, 3]);
      
      // Act
      await socketManager.handleUserDisconnect(userId);
      
      // Assert
      expect(messagingService.removeUserFromActiveConversation).toHaveBeenCalledWith(conversationId, userId);
      
      expect(mockIo.to).toHaveBeenCalledWith(`conversation:${conversationId}`);
      expect(mockIo.emit).toHaveBeenCalledWith('conversation:user-left', {
        conversationId,
        userId,
        activeUsers: [2, 3]
      });
    });
  });
});
