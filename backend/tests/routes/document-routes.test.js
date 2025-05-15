const request = require('supertest');
const express = require('express');
// Create mock functions for the document service
const mockGetAllDocuments = jest.fn();
const mockAddDocument = jest.fn();
const mockDeleteDocument = jest.fn();

// Create a mock document service
const documentService = {
  getAllDocuments: mockGetAllDocuments,
  addDocument: mockAddDocument,
  deleteDocument: mockDeleteDocument
};

// Mock the document service module
jest.mock('../../src/services/document-service', () => documentService);

// Mock JWT middleware
jest.mock('../../src/middlewares/jwt', () => (req, res, next) => {
  // Mock authenticated user
  req.userId = 1;
  next();
});

// Import the app
const app = express();
app.use(express.json());
const documentRoutes = require('../../src/routes/document-routes');
app.use('/documents', documentRoutes);

describe('Document Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /documents', () => {
    it('should return all documents for the user', async () => {
      // Mock data
      const mockDocuments = [
        { 
          id: 1, 
          title: 'Document 1', 
          content: 'Content 1', 
          owner_id: 1,
          users_documents_owner_idTousers: {
            id: 1,
            username: 'user1',
            full_name: 'User One'
          },
          document_invitations: []
        },
        { 
          id: 2, 
          title: 'Document 2', 
          content: 'Content 2', 
          owner_id: 2,
          users_documents_owner_idTousers: {
            id: 2,
            username: 'user2',
            full_name: 'User Two'
          },
          document_invitations: [
            { permission_level: 'read' }
          ]
        }
      ];

      // Mock the service response
      documentService.getAllDocuments.mockResolvedValue(mockDocuments);

      const response = await request(app).get('/documents');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDocuments);
      expect(documentService.getAllDocuments).toHaveBeenCalledWith(1);
    });

    it('should return 500 if an error occurs', async () => {
      // Mock service to throw an error
      documentService.getAllDocuments.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/documents');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Erreur lors de la récupération des documents');
    });
  });

  describe('POST /documents/add', () => {
    it('should add a new document', async () => {
      // Mock data
      const newDocument = { 
        title: 'New Document', 
        content: 'New Content'
      };

      const createdDocument = {
        id: 3,
        title: 'New Document',
        content: 'New Content',
        owner_id: 1,
        is_folder: false
      };

      // Mock the service response
      documentService.addDocument.mockResolvedValue(createdDocument);

      const response = await request(app)
        .post('/documents/add')
        .send(newDocument);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdDocument);
      expect(documentService.addDocument).toHaveBeenCalledWith({
        title: 'New Document',
        content: 'New Content',
        userId: 1
      });
    });

    it('should return 500 if an error occurs', async () => {
      // Mock service to throw an error
      documentService.addDocument.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/documents/add')
        .send({ title: 'New Document', content: 'New Content' });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Erreur lors de l\'ajout du document');
    });
  });

  describe('DELETE /documents/:id', () => {
    it('should delete a document', async () => {
      // Mock the service response
      documentService.deleteDocument.mockResolvedValue({ id: 1 });

      const response = await request(app).delete('/documents/1');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Document avec l\'id 1 a été supprimé');
      expect(documentService.deleteDocument).toHaveBeenCalledWith('1', 1);
    });

    it('should return 403 if user does not have permission', async () => {
      // Mock service to throw a permission error
      documentService.deleteDocument.mockRejectedValue(
        new Error('Document not found or you do not have permission to delete it')
      );

      const response = await request(app).delete('/documents/2');

      expect(response.status).toBe(403);
      expect(response.text).toBe('Document not found or you do not have permission to delete it');
    });

    it('should return 500 if an error occurs', async () => {
      // Mock service to throw a generic error
      documentService.deleteDocument.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/documents/1');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Erreur lors de la suppression du document');
    });
  });
});
