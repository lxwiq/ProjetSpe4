/**
 * Test d'intégration pour l'édition collaborative
 * 
 * Ce test simule un scénario complet d'édition collaborative
 * avec plusieurs utilisateurs modifiant un document simultanément.
 */
const request = require('supertest');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

// Mocks
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    documents: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn()
    },
    document_versions: {
      create: jest.fn(),
      findFirst: jest.fn()
    },
    users: {
      findUnique: jest.fn()
    },
    $transaction: jest.fn(callback => callback(mockPrismaClient))
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrismaClient)
  };
});

jest.mock('jsonwebtoken');

// Modules à tester
const DocumentController = require('../../src/controllers/document-controller');
const RealtimeDocumentService = require('../../src/services/realtime-document-service');
const SocketManager = require('../../src/websockets/socket-manager');

describe('Édition collaborative - Test d\'intégration', () => {
  let app;
  let server;
  let io;
  let prisma;
  let socketManager;
  let clientSockets = [];
  let serverSockets = [];
  
  beforeAll(done => {
    // Créer l'application Express
    app = express();
    app.use(express.json());
    
    // Créer le serveur HTTP
    server = http.createServer(app);
    
    // Créer le serveur Socket.IO
    io = new Server(server);
    
    // Initialiser Prisma
    prisma = new PrismaClient();
    
    // Initialiser le gestionnaire de sockets
    socketManager = new SocketManager(server);
    
    // Démarrer le serveur
    server.listen(0, () => {
      const port = server.address().port;
      done();
    });
  });
  
  afterAll(done => {
    // Fermer les connexions client
    clientSockets.forEach(socket => {
      if (socket.connected) {
        socket.disconnect();
      }
    });
    
    // Fermer le serveur
    server.close(done);
  });
  
  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();
    
    // Configurer les mocks pour Prisma
    prisma.documents.findUnique.mockResolvedValue({
      id: 1,
      title: 'Test Document',
      content: 'Initial content',
      owner_id: 1,
      is_folder: false,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    prisma.documents.findFirst.mockResolvedValue({
      id: 1,
      title: 'Test Document',
      content: 'Initial content',
      owner_id: 1,
      is_folder: false,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    prisma.documents.update.mockResolvedValue({
      id: 1,
      title: 'Test Document',
      content: 'Updated content',
      owner_id: 1,
      is_folder: false,
      created_at: new Date(),
      updated_at: new Date(),
      last_modified_by: 1
    });
    
    prisma.document_versions.create.mockResolvedValue({
      id: 1,
      document_id: 1,
      version_number: 1,
      content: 'Updated content',
      modified_by: 1,
      modification_date: new Date()
    });
    
    prisma.document_versions.findFirst.mockResolvedValue(null);
    
    prisma.users.findUnique.mockResolvedValue({
      id: 1,
      username: 'user1',
      email: 'user1@example.com',
      full_name: 'User One'
    });
    
    // Mock JWT
    jwt.verify.mockImplementation(token => {
      const userId = parseInt(token.split('.')[0]);
      return { userId };
    });
  });
  
  it('devrait permettre à plusieurs utilisateurs de collaborer sur un document', async () => {
    // Configurer les routes pour le test
    app.get('/documents/:id', async (req, res) => {
      const document = await prisma.documents.findUnique({
        where: { id: parseInt(req.params.id) }
      });
      res.json(document);
    });
    
    // Simuler trois utilisateurs qui se connectent et modifient un document
    const user1Token = '1.mock.token'; // userId = 1
    const user2Token = '2.mock.token'; // userId = 2
    const user3Token = '3.mock.token'; // userId = 3
    
    // Récupérer le document initial
    const documentResponse = await request(app)
      .get('/documents/1')
      .set('Authorization', `Bearer ${user1Token}`);
    
    expect(documentResponse.status).toBe(200);
    expect(documentResponse.body.title).toBe('Test Document');
    expect(documentResponse.body.content).toBe('Initial content');
    
    // Simuler les connexions WebSocket
    const documentEvents = [];
    const mockSocket1 = {
      id: 'socket-1',
      userId: 1,
      handshake: { auth: { token: user1Token } },
      join: jest.fn(),
      leave: jest.fn(),
      to: jest.fn().mockReturnThis(),
      emit: jest.fn((...args) => {
        if (args[0].startsWith('document:')) {
          documentEvents.push({ userId: 1, event: args[0], data: args[1] });
        }
      }),
      on: jest.fn()
    };
    
    const mockSocket2 = {
      id: 'socket-2',
      userId: 2,
      handshake: { auth: { token: user2Token } },
      join: jest.fn(),
      leave: jest.fn(),
      to: jest.fn().mockReturnThis(),
      emit: jest.fn((...args) => {
        if (args[0].startsWith('document:')) {
          documentEvents.push({ userId: 2, event: args[0], data: args[1] });
        }
      }),
      on: jest.fn()
    };
    
    const mockSocket3 = {
      id: 'socket-3',
      userId: 3,
      handshake: { auth: { token: user3Token } },
      join: jest.fn(),
      leave: jest.fn(),
      to: jest.fn().mockReturnThis(),
      emit: jest.fn((...args) => {
        if (args[0].startsWith('document:')) {
          documentEvents.push({ userId: 3, event: args[0], data: args[1] });
        }
      }),
      on: jest.fn()
    };
    
    // Simuler les événements document:join
    const joinHandler1 = jest.fn();
    const joinHandler2 = jest.fn();
    const joinHandler3 = jest.fn();
    
    // Simuler l'utilisateur 1 qui rejoint le document
    await socketManager.handleDocumentJoin(mockSocket1, { documentId: 1 }, joinHandler1);
    
    expect(mockSocket1.join).toHaveBeenCalledWith('document:1');
    expect(joinHandler1).toHaveBeenCalledWith({
      success: true,
      data: expect.objectContaining({
        document: expect.objectContaining({
          id: 1,
          title: 'Test Document'
        }),
        activeUsers: expect.arrayContaining([1])
      })
    });
    
    // Simuler l'utilisateur 2 qui rejoint le document
    await socketManager.handleDocumentJoin(mockSocket2, { documentId: 1 }, joinHandler2);
    
    expect(mockSocket2.join).toHaveBeenCalledWith('document:1');
    expect(joinHandler2).toHaveBeenCalledWith({
      success: true,
      data: expect.objectContaining({
        document: expect.objectContaining({
          id: 1,
          title: 'Test Document'
        }),
        activeUsers: expect.arrayContaining([1, 2])
      })
    });
    
    // Simuler l'utilisateur 3 qui rejoint le document
    await socketManager.handleDocumentJoin(mockSocket3, { documentId: 1 }, joinHandler3);
    
    expect(mockSocket3.join).toHaveBeenCalledWith('document:1');
    expect(joinHandler3).toHaveBeenCalledWith({
      success: true,
      data: expect.objectContaining({
        document: expect.objectContaining({
          id: 1,
          title: 'Test Document'
        }),
        activeUsers: expect.arrayContaining([1, 2, 3])
      })
    });
    
    // Simuler l'utilisateur 1 qui modifie le document
    const updateHandler1 = jest.fn();
    await socketManager.handleDocumentUpdate(mockSocket1, {
      documentId: 1,
      content: 'Content modified by user 1'
    }, updateHandler1);
    
    expect(updateHandler1).toHaveBeenCalledWith({
      success: true,
      data: expect.objectContaining({
        documentId: 1
      })
    });
    
    // Vérifier que les autres utilisateurs ont reçu la mise à jour
    expect(mockSocket2.emit).toHaveBeenCalledWith(
      'document:content-changed',
      expect.objectContaining({
        content: 'Content modified by user 1',
        userId: 1
      })
    );
    
    expect(mockSocket3.emit).toHaveBeenCalledWith(
      'document:content-changed',
      expect.objectContaining({
        content: 'Content modified by user 1',
        userId: 1
      })
    );
    
    // Simuler l'utilisateur 2 qui sauvegarde le document
    const saveHandler = jest.fn();
    await socketManager.handleDocumentSave(mockSocket2, { documentId: 1 }, saveHandler);
    
    expect(saveHandler).toHaveBeenCalledWith({
      success: true,
      data: expect.objectContaining({
        documentId: 1,
        versionNumber: 1
      })
    });
    
    // Vérifier que tous les utilisateurs ont été notifiés de la sauvegarde
    expect(mockSocket1.emit).toHaveBeenCalledWith(
      'document:saved',
      expect.objectContaining({
        documentId: 1,
        savedBy: 2,
        versionNumber: 1
      })
    );
    
    expect(mockSocket3.emit).toHaveBeenCalledWith(
      'document:saved',
      expect.objectContaining({
        documentId: 1,
        savedBy: 2,
        versionNumber: 1
      })
    );
    
    // Simuler l'utilisateur 3 qui quitte le document
    await socketManager.handleDocumentLeave(mockSocket3, { documentId: 1 });
    
    expect(mockSocket3.leave).toHaveBeenCalledWith('document:1');
    
    // Vérifier que les autres utilisateurs ont été notifiés du départ
    expect(mockSocket1.emit).toHaveBeenCalledWith(
      'document:user-left',
      expect.objectContaining({
        userId: 3,
        activeUsers: expect.arrayContaining([1, 2])
      })
    );
    
    expect(mockSocket2.emit).toHaveBeenCalledWith(
      'document:user-left',
      expect.objectContaining({
        userId: 3,
        activeUsers: expect.arrayContaining([1, 2])
      })
    );
  });
});
