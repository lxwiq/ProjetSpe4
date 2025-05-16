/**
 * Tests pour le service de document
 */

// Mock pour Prisma
const mockPrisma = {
  documents: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue(null),
    findFirst: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({})
  },
  document_versions: {
    findFirst: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({})
  }
};

// Mock le module prisma
jest.mock('../../src/lib/prisma', () => mockPrisma);

// Import le service après le mock
const documentService = require('../../src/services/document-service');

describe('DocumentService', () => {
  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();
  });

  describe('getAllDocuments', () => {
    it('devrait récupérer tous les documents non supprimés', async () => {
      // Arrange
      const userId = 1;
      const mockDocuments = [
        {
          id: 1,
          title: 'Document 1',
          content: 'Contenu 1',
          owner_id: 1,
          is_folder: false,
          is_deleted: false,
          users_documents_owner_idTousers: {
            id: 1,
            username: 'user1',
            full_name: 'User One'
          }
        },
        {
          id: 2,
          title: 'Document 2',
          content: 'Contenu 2',
          owner_id: 1,
          is_folder: false,
          is_deleted: false,
          users_documents_owner_idTousers: {
            id: 1,
            username: 'user1',
            full_name: 'User One'
          }
        }
      ];

      mockPrisma.documents.findMany.mockResolvedValue(mockDocuments);

      // Act
      const result = await documentService.getAllDocuments(userId);

      // Assert
      expect(mockPrisma.documents.findMany).toHaveBeenCalledWith({
        where: {
          is_deleted: false
        },
        include: {
          users_documents_owner_idTousers: {
            select: {
              id: true,
              username: true,
              full_name: true
            }
          },
          users_documents_last_modified_byTousers: {
            select: {
              id: true,
              username: true,
              full_name: true
            }
          }
        }
      });

      expect(result).toEqual(mockDocuments);
    });
  });

  describe('addDocument', () => {
    it('devrait ajouter un nouveau document', async () => {
      // Arrange
      const documentData = {
        title: 'Nouveau document',
        content: 'Contenu du document',
        userId: 1
      };

      const mockDocument = {
        id: 3,
        title: 'Nouveau document',
        content: 'Contenu du document',
        owner_id: 1,
        is_folder: false,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPrisma.documents.create.mockResolvedValue(mockDocument);

      // Act
      const result = await documentService.addDocument(documentData);

      // Assert
      expect(mockPrisma.documents.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Nouveau document',
          owner_id: 1,
          is_folder: false
        })
      });

      expect(result).toEqual(mockDocument);
    });

    it('devrait ajouter un nouveau dossier', async () => {
      // Arrange
      const documentData = {
        title: 'Nouveau dossier',
        isFolder: true,
        userId: 1
      };

      const mockFolder = {
        id: 4,
        title: 'Nouveau dossier',
        content: null,
        owner_id: 1,
        is_folder: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPrisma.documents.create.mockResolvedValue(mockFolder);

      // Act
      const result = await documentService.addDocument(documentData);

      // Assert
      expect(mockPrisma.documents.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Nouveau dossier',
          content: null,
          owner_id: 1,
          is_folder: true
        })
      });

      expect(result).toEqual(mockFolder);
    });

    it('devrait ajouter un document avec un fichier', async () => {
      // Arrange
      const documentData = {
        title: 'Document avec fichier',
        userId: 1,
        filePath: '/uploads/files/document.pdf',
        fileType: 'application/pdf',
        fileName: 'document.pdf',
        fileOriginalName: 'document.pdf',
        fileExtension: '.pdf',
        size: 1024,
        fileUploadDate: new Date()
      };

      const mockDocument = {
        id: 5,
        title: 'Document avec fichier',
        content: null,
        owner_id: 1,
        is_folder: false,
        is_deleted: false,
        file_path: '/uploads/files/document.pdf',
        file_type: 'application/pdf',
        file_name: 'document.pdf',
        file_original_name: 'document.pdf',
        file_extension: '.pdf',
        size: 1024,
        file_upload_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      };

      mockPrisma.documents.create.mockResolvedValue(mockDocument);

      // Act
      const result = await documentService.addDocument(documentData);

      // Assert
      expect(mockPrisma.documents.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          title: 'Document avec fichier',
          owner_id: 1,
          file_path: '/uploads/files/document.pdf',
          file_type: 'application/pdf'
        })
      });

      expect(result).toEqual(mockDocument);
    });
  });

  describe('updateDocument', () => {
    it('devrait mettre à jour un document existant', async () => {
      // Arrange
      const documentId = 1;
      const updateData = {
        title: 'Document mis à jour',
        content: 'Contenu mis à jour'
      };
      const userId = 1;

      const mockDocument = {
        id: 1,
        title: 'Document original',
        content: 'Contenu original',
        owner_id: 1,
        is_folder: false,
        is_deleted: false,
        file_path: '/uploads/documents/test.txt'
      };

      const mockUpdatedDocument = {
        id: 1,
        title: 'Document mis à jour',
        content: 'Contenu mis à jour',
        owner_id: 1,
        is_folder: false,
        is_deleted: false,
        updated_at: new Date(),
        last_modified_by: 1
      };

      mockPrisma.documents.findFirst.mockResolvedValue(mockDocument);
      mockPrisma.documents.update.mockResolvedValue(mockUpdatedDocument);

      // Act
      const result = await documentService.updateDocument(documentId, updateData, userId);

      // Assert
      expect(mockPrisma.documents.findFirst).toHaveBeenCalledWith({
        where: {
          id: parseInt(documentId),
          is_deleted: false
        }
      });

      expect(mockPrisma.documents.update).toHaveBeenCalledWith({
        where: { id: parseInt(documentId) },
        data: expect.objectContaining({
          title: 'Document mis à jour',
          last_modified_by: userId
        })
      });

      expect(result).toEqual(mockUpdatedDocument);
    });

    it('devrait lancer une erreur si le document n\'existe pas', async () => {
      // Arrange
      const documentId = 999;
      const updateData = {
        title: 'Document mis à jour',
        content: 'Contenu mis à jour'
      };
      const userId = 1;

      mockPrisma.documents.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(documentService.updateDocument(documentId, updateData, userId))
        .rejects.toThrow('Document not found');
    });
  });

  describe('deleteDocument', () => {
    it('devrait marquer un document comme supprimé', async () => {
      // Arrange
      const documentId = 1;
      const userId = 1;

      const mockDocument = {
        id: 1,
        title: 'Document à supprimer',
        content: 'Contenu',
        owner_id: 1,
        is_folder: false,
        is_deleted: false
      };

      const mockDeletedDocument = {
        id: 1,
        title: 'Document à supprimer',
        content: 'Contenu',
        owner_id: 1,
        is_folder: false,
        is_deleted: true
      };

      mockPrisma.documents.findFirst.mockResolvedValue(mockDocument);
      mockPrisma.documents.delete.mockResolvedValue(mockDeletedDocument);

      // Act
      const result = await documentService.deleteDocument(documentId, userId);

      // Assert
      expect(mockPrisma.documents.findFirst).toHaveBeenCalledWith({
        where: {
          id: parseInt(documentId),
          is_deleted: false
        }
      });

      expect(mockPrisma.documents.delete).toHaveBeenCalledWith({
        where: { id: parseInt(documentId) }
      });

      expect(result).toEqual(mockDeletedDocument);
    });

    it('devrait lancer une erreur si le document n\'existe pas', async () => {
      // Arrange
      const documentId = 999;
      const userId = 1;

      mockPrisma.documents.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(documentService.deleteDocument(documentId, userId))
        .rejects.toThrow('Document not found');
    });
  });
});
