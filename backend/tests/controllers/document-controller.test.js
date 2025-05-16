// Test file for document controller

// Mock the document service
jest.mock('../../src/services/document-service', () => ({
  getAllDocuments: jest.fn(),
  addDocument: jest.fn(),
  deleteDocument: jest.fn()
}));

// Import the document service after mocking
const documentService = require('../../src/services/document-service');

// Import the document controller
const documentController = require('../../src/controllers/document-controller');

describe('Document Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock request and response objects
    req = {
      userId: 1,
      body: {},
      params: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAllDocuments', () => {
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

      // Call the controller function
      await documentController.getAllDocuments(req, res);

      // Verify the results
      expect(documentService.getAllDocuments).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockDocuments);
    });

    it('should return 500 if an error occurs', async () => {
      // Mock service to throw an error
      documentService.getAllDocuments.mockRejectedValue(new Error('Database error'));

      // Call the controller function
      await documentController.getAllDocuments(req, res);

      // Verify the results
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la récupération des documents' });
    });
  });

  describe('addDocument', () => {
    it('should add a new document', async () => {
      // Mock data
      req.body = { 
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

      // Call the controller function
      await documentController.addDocument(req, res);

      // Verify the results
      expect(documentService.addDocument).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Document',
        content: 'New Content',
        userId: 1
      }));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Document ajouté avec succès !',
        data: createdDocument
      });
    });

    it('should return 500 if an error occurs', async () => {
      // Mock data
      req.body = { 
        title: 'New Document', 
        content: 'New Content'
      };

      // Mock service to throw an error
      documentService.addDocument.mockRejectedValue(new Error('Database error'));

      // Call the controller function
      await documentController.addDocument(req, res);

      // Verify the results
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de l\'ajout du document' });
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document', async () => {
      // Mock data
      req.params.id = '1';

      // Mock the service response
      documentService.deleteDocument.mockResolvedValue({ id: 1 });

      // Call the controller function
      await documentController.deleteDocument(req, res);

      // Verify the results
      expect(documentService.deleteDocument).toHaveBeenCalledWith('1', 1);
      expect(res.json).toHaveBeenCalledWith({ message: 'Document avec l\'id 1 a été supprimé' });
    });

    it('should return 403 if user does not have permission', async () => {
      // Mock data
      req.params.id = '2';

      // Mock service to throw a permission error
      documentService.deleteDocument.mockRejectedValue(
        new Error('Document not found or you do not have permission to delete it')
      );

      // Call the controller function
      await documentController.deleteDocument(req, res);

      // Verify the results
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Document not found or you do not have permission to delete it' });
    });

    it('should return 500 if an error occurs', async () => {
      // Mock data
      req.params.id = '1';

      // Mock service to throw a generic error
      documentService.deleteDocument.mockRejectedValue(new Error('Database error'));

      // Call the controller function
      await documentController.deleteDocument(req, res);

      // Verify the results
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erreur lors de la suppression du document' });
    });
  });
});
