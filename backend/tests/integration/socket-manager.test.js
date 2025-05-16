/**
 * Tests d'intégration pour le gestionnaire de socket
 */
const SocketManager = require('../../src/websockets/socket-manager');
const jwt = require('jsonwebtoken');
const realtimeDocumentService = require('../../src/services/realtime-document-service');
const messagingService = require('../../src/services/messaging-service');
const notificationService = require('../../src/services/notification-service');

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

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ userId: 1, isAdmin: false })
}));

jest.mock('../../src/services/realtime-document-service', () => ({
  joinDocument: jest.fn().mockResolvedValue({
    document: { id: 1, title: 'Test Document', content: 'Test content' },
    currentContent: 'Test content',
    activeUsers: [1]
  }),
  leaveDocument: jest.fn().mockResolvedValue({ activeUsers: [] }),
  updateDocumentContentInMemory: jest.fn().mockResolvedValue({
    documentId: 1,
    lastModified: new Date()
  }),
  getUserInfo: jest.fn().mockResolvedValue({
    username: 'user1',
    color: '#ff0000'
  }),
  checkUserDocumentAccess: jest.fn().mockResolvedValue(true),
  getActiveUsers: jest.fn().mockReturnValue([1, 2, 3]),
  getActiveDocuments: jest.fn().mockReturnValue([1, 2])
}));

jest.mock('../../src/services/messaging-service', () => ({
  createConversation: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Nouvelle conversation',
    is_group: true,
    participants: [
      { user_id: 1, username: 'user1' },
      { user_id: 2, username: 'user2' },
      { user_id: 3, username: 'user3' }
    ]
  }),
  sendMessage: jest.fn().mockResolvedValue({
    id: 1,
    conversation_id: 1,
    sender_id: 1,
    content: 'Nouveau message',
    created_at: new Date()
  }),
  getParticipantIds: jest.fn().mockReturnValue([1, 2, 3])
}));

jest.mock('../../src/services/notification-service', () => ({
  getPendingNotifications: jest.fn().mockResolvedValue([]),
  markAsRead: jest.fn().mockResolvedValue({})
}));

describe('SocketManager - Tests d\'intégration', () => {
  let socketManager;
  let mockServer;
  let mockSocket;
  let mockIo;

  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();

    // Configurer la variable d'environnement
    process.env.JWT_SECRET_KEY = 'test-secret-key';

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
      on: jest.fn(),
      rooms: new Set(['socket-id-1'])
    };

    // Initialiser le gestionnaire de sockets
    socketManager = new SocketManager(mockServer);
    mockIo = socketManager.io;

    // Mock de la vérification JWT
    jwt.verify.mockReturnValue({ userId: 1, isAdmin: false });

    // Simuler la connexion d'un socket
    mockIo.middleware(mockSocket, jest.fn());
    mockIo.connectionCallback(mockSocket);
  });

  describe('Initialisation', () => {
    it('devrait initialiser correctement le gestionnaire de sockets', () => {
      // Assert
      expect(socketManager.io).toBeDefined();
      expect(socketManager.userSockets).toBeDefined();
      expect(socketManager.activeCalls).toBeDefined();
      expect(mockIo.use).toHaveBeenCalled();
      expect(mockIo.on).toHaveBeenCalledWith('connection', expect.any(Function));
    });

    it('devrait configurer le middleware d\'authentification', () => {
      // Arrange
      const mockNext = jest.fn();

      // Act
      mockIo.middleware(mockSocket, mockNext);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret-key');
      expect(mockSocket.userId).toBe(1);
      expect(mockSocket.isAdmin).toBe(false);
      expect(mockNext).toHaveBeenCalled();
    });

    it('devrait rejeter la connexion si le token est manquant', () => {
      // Arrange
      const mockSocketWithoutToken = {
        handshake: {
          auth: {}
        }
      };
      const mockNext = jest.fn();

      // Act
      mockIo.middleware(mockSocketWithoutToken, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      expect(mockNext.mock.calls[0][0].message).toBe('Authentication error: Token missing');
    });

    it('devrait rejeter la connexion si le token est invalide', () => {
      // Arrange
      const mockSocketWithInvalidToken = {
        handshake: {
          auth: {
            token: 'invalid-token'
          }
        }
      };
      const mockNext = jest.fn();

      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act
      mockIo.middleware(mockSocketWithInvalidToken, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      expect(mockNext.mock.calls[0][0].message).toBe('Authentication error: Invalid token');
    });
  });

  describe('Gestion des connexions', () => {
    it('devrait stocker la connexion socket de l\'utilisateur', () => {
      // Assert
      expect(socketManager.userSockets.get(1)).toBe('socket-id-1');
    });

    it('devrait configurer les événements pour le socket', () => {
      // Assert
      expect(mockSocket.on).toHaveBeenCalledTimes(expect.any(Number));

      // Vérifier que les événements de document sont configurés
      expect(mockSocket.on).toHaveBeenCalledWith('document:join', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('document:leave', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('document:update', expect.any(Function));

      // Vérifier que les événements de messagerie sont configurés
      expect(mockSocket.on).toHaveBeenCalledWith('conversation:create', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('message:send', expect.any(Function));

      // Vérifier que les événements de notification sont configurés
      expect(mockSocket.on).toHaveBeenCalledWith('notification:mark-read', expect.any(Function));

      // Vérifier que les événements d'appel sont configurés
      expect(mockSocket.on).toHaveBeenCalledWith('call:start', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('call:join', expect.any(Function));
    });

    it('devrait envoyer les notifications en attente à l\'utilisateur qui vient de se connecter', () => {
      // Assert
      expect(notificationService.getPendingNotifications).toHaveBeenCalledWith(1);
    });
  });

  describe('Gestion des documents', () => {
    it('devrait permettre à un utilisateur de rejoindre un document', async () => {
      // Arrange
      const documentJoinHandler = mockSocket.on.mock.calls.find(call => call[0] === 'document:join')[1];
      const callback = jest.fn();
      const data = {
        documentId: 1
      };

      // Mock du service de document
      const mockDocumentData = {
        document: {
          id: 1,
          title: 'Test Document',
          content: 'Test content'
        },
        currentContent: 'Test content',
        activeUsers: [1]
      };
      realtimeDocumentService.joinDocument.mockResolvedValue(mockDocumentData);
      realtimeDocumentService.getUserInfo.mockResolvedValue({
        username: 'user1',
        color: '#ff0000'
      });

      // Act
      await documentJoinHandler(data, callback);

      // Assert
      expect(mockSocket.join).toHaveBeenCalledWith('document:1');
      expect(realtimeDocumentService.joinDocument).toHaveBeenCalledWith(1, 1);
      expect(realtimeDocumentService.getUserInfo).toHaveBeenCalledWith(1);

      expect(mockIo.to).toHaveBeenCalledWith('document:1');
      expect(mockIo.emit).toHaveBeenCalledWith('document:user-joined', expect.objectContaining({
        userId: 1,
        username: 'user1'
      }));

      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: mockDocumentData
      });
    });

    it('devrait permettre à un utilisateur de mettre à jour un document', async () => {
      // Arrange
      const documentUpdateHandler = mockSocket.on.mock.calls.find(call => call[0] === 'document:update')[1];
      const callback = jest.fn();
      const data = {
        documentId: 1,
        content: 'Updated content'
      };

      // Mock du service de document
      const mockUpdateData = {
        documentId: 1,
        lastModified: new Date()
      };
      realtimeDocumentService.updateDocumentContentInMemory.mockResolvedValue(mockUpdateData);

      // Act
      await documentUpdateHandler(data, callback);

      // Assert
      expect(realtimeDocumentService.updateDocumentContentInMemory).toHaveBeenCalledWith(1, 1, 'Updated content');

      expect(mockSocket.to).toHaveBeenCalledWith('document:1');
      expect(mockSocket.emit).toHaveBeenCalledWith('document:content-changed', expect.objectContaining({
        content: 'Updated content',
        userId: 1
      }));

      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: expect.any(Object)
      });
    });

    it('devrait permettre à un utilisateur de quitter un document', async () => {
      // Arrange
      const documentLeaveHandler = mockSocket.on.mock.calls.find(call => call[0] === 'document:leave')[1];
      const callback = jest.fn();
      const data = {
        documentId: 1
      };

      // Mock du service de document
      realtimeDocumentService.leaveDocument.mockResolvedValue({
        activeUsers: []
      });

      // Act
      await documentLeaveHandler(data, callback);

      // Assert
      expect(mockSocket.leave).toHaveBeenCalledWith('document:1');
      expect(realtimeDocumentService.leaveDocument).toHaveBeenCalledWith(1, 1);

      expect(mockIo.to).toHaveBeenCalledWith('document:1');
      expect(mockIo.emit).toHaveBeenCalledWith('document:user-left', expect.objectContaining({
        userId: 1
      }));

      expect(callback).toHaveBeenCalledWith({
        success: true
      });
    });
  });

  describe('Gestion des appels', () => {
    it('devrait permettre à un utilisateur de démarrer un appel', async () => {
      // Arrange
      const callStartHandler = mockSocket.on.mock.calls.find(call => call[0] === 'call:start')[1];
      const callback = jest.fn();
      const data = {
        documentId: 1
      };

      // Mock du service de document
      realtimeDocumentService.checkUserDocumentAccess.mockResolvedValue(true);
      realtimeDocumentService.getActiveUsers.mockReturnValue([1, 2, 3]);

      // Act
      await callStartHandler(data, callback);

      // Assert
      expect(realtimeDocumentService.checkUserDocumentAccess).toHaveBeenCalledWith(1, 1);
      expect(socketManager.activeCalls.size).toBe(1);

      expect(mockIo.to).toHaveBeenCalledWith('document:1');
      expect(mockIo.emit).toHaveBeenCalledWith('call:started', expect.objectContaining({
        documentId: 1,
        initiatedBy: 1
      }));

      expect(callback).toHaveBeenCalledWith({
        success: true,
        callId: expect.any(Number)
      });
    });

    it('devrait permettre à un utilisateur de rejoindre un appel', async () => {
      // Arrange
      const callJoinHandler = mockSocket.on.mock.calls.find(call => call[0] === 'call:join')[1];
      const callback = jest.fn();
      const callId = 1;

      // Configurer un appel actif
      socketManager.activeCalls.set(callId, {
        id: callId,
        documentId: 1,
        initiatedBy: 2,
        participants: [
          { userId: 2, socketId: 'socket-id-2' }
        ]
      });

      // Act
      await callJoinHandler({ callId }, callback);

      // Assert
      expect(socketManager.activeCalls.get(callId).participants).toContainEqual({
        userId: 1,
        socketId: 'socket-id-1'
      });

      expect(mockIo.to).toHaveBeenCalledWith('call:1');
      expect(mockIo.emit).toHaveBeenCalledWith('call:user-joined', expect.objectContaining({
        callId: 1,
        userId: 1
      }));

      expect(callback).toHaveBeenCalledWith({
        success: true,
        participants: expect.arrayContaining([
          expect.objectContaining({ userId: 2 }),
          expect.objectContaining({ userId: 1 })
        ])
      });
    });
  });

  describe('Gestion des messages', () => {
    it('devrait permettre à un utilisateur de créer une conversation', async () => {
      // Arrange
      const conversationCreateHandler = mockSocket.on.mock.calls.find(call => call[0] === 'conversation:create')[1];
      const callback = jest.fn();
      const data = {
        participantIds: [2, 3],
        name: 'Nouvelle conversation',
        isGroup: true
      };

      // Mock du service de messagerie
      const mockConversation = {
        id: 1,
        name: 'Nouvelle conversation',
        is_group: true,
        participants: [
          { user_id: 1, username: 'user1' },
          { user_id: 2, username: 'user2' },
          { user_id: 3, username: 'user3' }
        ]
      };
      messagingService.createConversation.mockResolvedValue(mockConversation);

      // Act
      await conversationCreateHandler(data, callback);

      // Assert
      expect(messagingService.createConversation).toHaveBeenCalledWith(
        1,
        [2, 3],
        'Nouvelle conversation',
        true
      );

      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: mockConversation
      });
    });

    it('devrait permettre à un utilisateur d\'envoyer un message', async () => {
      // Arrange
      const messageSendHandler = mockSocket.on.mock.calls.find(call => call[0] === 'message:send')[1];
      const callback = jest.fn();
      const data = {
        conversationId: 1,
        content: 'Nouveau message'
      };

      // Mock du service de messagerie
      const mockMessage = {
        id: 1,
        conversation_id: 1,
        sender_id: 1,
        content: 'Nouveau message',
        created_at: new Date()
      };
      messagingService.sendMessage.mockResolvedValue(mockMessage);
      messagingService.getParticipantIds.mockReturnValue([1, 2, 3]);

      // Configurer des sockets pour les autres participants
      socketManager.userSockets.set(2, 'socket-id-2');
      socketManager.userSockets.set(3, 'socket-id-3');

      // Act
      await messageSendHandler(data, callback);

      // Assert
      expect(messagingService.sendMessage).toHaveBeenCalledWith(1, 1, 'Nouveau message');
      expect(messagingService.getParticipantIds).toHaveBeenCalledWith(1);

      expect(mockIo.to).toHaveBeenCalledWith(expect.stringMatching(/socket-id-[23]/));
      expect(mockIo.emit).toHaveBeenCalledWith('message:received', expect.objectContaining({
        conversationId: 1,
        message: mockMessage
      }));

      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: mockMessage
      });
    });
  });

  describe('Gestion des notifications', () => {
    it('devrait permettre à un utilisateur de marquer une notification comme lue', async () => {
      // Arrange
      const notificationMarkReadHandler = mockSocket.on.mock.calls.find(call => call[0] === 'notification:mark-read')[1];
      const callback = jest.fn();
      const data = {
        notificationId: 1
      };

      // Act
      await notificationMarkReadHandler(data, callback);

      // Assert
      expect(notificationService.markAsRead).toHaveBeenCalledWith(1, 1);
      expect(callback).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('Gestion de la déconnexion', () => {
    it('devrait gérer la déconnexion d\'un utilisateur', async () => {
      // Arrange
      const disconnectHandler = mockSocket.on.mock.calls.find(call => call[0] === 'disconnect')[1];

      // Configurer des documents actifs
      realtimeDocumentService.getActiveDocuments.mockReturnValue([1, 2]);
      realtimeDocumentService.getActiveUsers.mockReturnValue([1, 2, 3]);

      // Configurer des appels actifs
      socketManager.activeCalls.set(1, {
        id: 1,
        documentId: 1,
        participants: [
          { userId: 1, socketId: 'socket-id-1' },
          { userId: 2, socketId: 'socket-id-2' }
        ]
      });

      // Act
      await disconnectHandler('transport close');

      // Assert
      expect(realtimeDocumentService.getActiveDocuments).toHaveBeenCalledWith(1);
      expect(realtimeDocumentService.leaveDocument).toHaveBeenCalledWith(expect.any(Number), 1);

      expect(mockIo.to).toHaveBeenCalledWith(expect.stringMatching(/document:[12]/));
      expect(mockIo.emit).toHaveBeenCalledWith('document:user-left', expect.objectContaining({
        userId: 1
      }));

      expect(mockIo.to).toHaveBeenCalledWith('call:1');
      expect(mockIo.emit).toHaveBeenCalledWith('call:user-left', expect.objectContaining({
        callId: 1,
        userId: 1
      }));

      expect(socketManager.userSockets.has(1)).toBe(false);
    });
  });
});
