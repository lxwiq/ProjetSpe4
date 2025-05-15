/**
 * Tests pour les événements WebSocket liés aux documents
 */
const SocketManager = require('../../src/websockets/socket-manager');
const realtimeDocumentService = require('../../src/services/realtime-document-service');
const jwt = require('jsonwebtoken');
const prisma = require('../../src/lib/prisma');

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
jest.mock('../../src/services/realtime-document-service');
jest.mock('../../src/lib/prisma');

describe('SocketManager - Document Events', () => {
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
      on: jest.fn(),
      rooms: new Set(['socket-id-1'])
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
  
  describe('setupDocumentEvents', () => {
    it('devrait configurer les événements de document', () => {
      // Assert
      expect(mockSocket.on).toHaveBeenCalledWith('document:join', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('document:leave', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('document:update', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('document:cursor-update', expect.any(Function));
      expect(mockSocket.on).toHaveBeenCalledWith('document:save', expect.any(Function));
    });
    
    it('devrait permettre à un utilisateur de rejoindre un document', async () => {
      // Arrange
      const eventHandler = mockSocket.on.mock.calls.find(call => call[0] === 'document:join')[1];
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
      await eventHandler(data, callback);
      
      // Assert
      expect(mockSocket.join).toHaveBeenCalledWith('document:1');
      expect(realtimeDocumentService.joinDocument).toHaveBeenCalledWith(1, 1);
      expect(realtimeDocumentService.getUserInfo).toHaveBeenCalledWith(1);
      
      expect(mockIo.to).toHaveBeenCalledWith('document:1');
      expect(mockIo.emit).toHaveBeenCalledWith('document:user-joined', {
        userId: 1,
        username: 'user1',
        color: '#ff0000',
        activeUsers: [1]
      });
      
      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: mockDocumentData
      });
    });
    
    it('devrait permettre à un utilisateur de mettre à jour un document', async () => {
      // Arrange
      const eventHandler = mockSocket.on.mock.calls.find(call => call[0] === 'document:update')[1];
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
      realtimeDocumentService.updateDocumentContent.mockResolvedValue(mockUpdateData);
      
      // Act
      await eventHandler(data, callback);
      
      // Assert
      expect(realtimeDocumentService.updateDocumentContent).toHaveBeenCalledWith(1, 1, 'Updated content');
      
      expect(mockIo.to).toHaveBeenCalledWith('document:1');
      expect(mockIo.emit).toHaveBeenCalledWith('document:content-changed', {
        content: 'Updated content',
        userId: 1,
        timestamp: mockUpdateData.lastModified
      });
      
      expect(callback).toHaveBeenCalledWith({
        success: true,
        data: mockUpdateData
      });
    });
    
    it('devrait gérer les erreurs lors de la mise à jour d\'un document', async () => {
      // Arrange
      const eventHandler = mockSocket.on.mock.calls.find(call => call[0] === 'document:update')[1];
      const callback = jest.fn();
      const data = {
        documentId: 1,
        content: 'Updated content'
      };
      
      // Mock de l'erreur
      const error = new Error('Erreur lors de la mise à jour du document');
      realtimeDocumentService.updateDocumentContent.mockRejectedValue(error);
      
      // Act
      await eventHandler(data, callback);
      
      // Assert
      expect(realtimeDocumentService.updateDocumentContent).toHaveBeenCalledWith(1, 1, 'Updated content');
      
      expect(callback).toHaveBeenCalledWith({
        success: false,
        error: error.message
      });
    });
  });
  
  describe('handleUserDisconnect', () => {
    it('devrait retirer l\'utilisateur des documents actifs lors de la déconnexion', async () => {
      // Arrange
      const userId = 1;
      const documentId = 1;
      
      // Mock des documents actifs
      realtimeDocumentService.getActiveDocuments.mockReturnValue([documentId]);
      realtimeDocumentService.getActiveUsers.mockReturnValue([2, 3]);
      
      // Act
      await socketManager.handleUserDisconnect(userId);
      
      // Assert
      expect(realtimeDocumentService.leaveDocument).toHaveBeenCalledWith(documentId, userId);
      
      expect(mockIo.to).toHaveBeenCalledWith(`document:${documentId}`);
      expect(mockIo.emit).toHaveBeenCalledWith('document:user-left', {
        userId,
        activeUsers: [2, 3]
      });
    });
  });
});
