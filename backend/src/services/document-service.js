// src/services/document-service.js
const prisma = require('../lib/prisma');

class DocumentService {
  async getAllDocuments(userId) {
    // Get documents owned by the user or shared with the user
    return await prisma.documents.findMany({
      where: {
        OR: [
          { owner_id: parseInt(userId) },
          {
            document_invitations: {
              some: {
                user_id: parseInt(userId),
                is_active: true
              }
            }
          }
        ],
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
        document_invitations: {
          where: {
            user_id: parseInt(userId)
          },
          select: {
            permission_level: true
          }
        }
      }
    });
  }

  async addDocument({title, content, userId}) {
    console.log(title, content);
    return await prisma.documents.create({
      data: {
        title,
        content,
        is_folder: false,
        owner_id: parseInt(userId)
      }
    });
  }

  async deleteDocument(id, userId) {
    // First check if the document exists and is owned by the user
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(id),
        owner_id: parseInt(userId)
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to delete it');
    }

    // If the document exists and is owned by the user, delete it
    return await prisma.documents.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = new DocumentService();
