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

  async getDocumentById(id, userId) {
    // Get a specific document by ID (only if the user has access)
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(id),
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
          include: {
            users_document_invitations_user_idTousers: {
              select: {
                id: true,
                username: true,
                full_name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to access it');
    }

    return document;
  }

  async addDocument({title, content, parentFolderId, isFolder, userId}) {
    return await prisma.documents.create({
      data: {
        title,
        content: content || null,
        parent_folder_id: parentFolderId ? parseInt(parentFolderId) : null,
        is_folder: isFolder || false,
        owner_id: parseInt(userId)
      }
    });
  }

  async updateDocument(id, data, userId) {
    // Check if the user has permission to update the document
    const document = await this.checkDocumentAccess(id, userId, ['write', 'admin']);

    if (!document) {
      throw new Error('Document not found or you do not have permission to update it');
    }

    return await prisma.documents.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        content: data.content,
        updated_at: new Date(),
        last_modified_by: parseInt(userId)
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

  async inviteUserToDocument(documentId, invitedUserId, invitingUserId, permissionLevel = 'read') {
    // Check if the inviting user is the owner of the document
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
        owner_id: parseInt(invitingUserId)
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to invite users');
    }

    // Check if the invited user exists
    const invitedUser = await prisma.users.findUnique({
      where: { id: parseInt(invitedUserId) }
    });

    if (!invitedUser) {
      throw new Error('Invited user not found');
    }

    // Check if an invitation already exists
    const existingInvitation = await prisma.document_invitations.findFirst({
      where: {
        document_id: parseInt(documentId),
        user_id: parseInt(invitedUserId)
      }
    });

    if (existingInvitation) {
      // Update the existing invitation
      return await prisma.document_invitations.update({
        where: { id: existingInvitation.id },
        data: {
          permission_level: permissionLevel,
          invited_by: parseInt(invitingUserId),
          invitation_date: new Date(),
          is_active: true
        },
        include: {
          users_document_invitations_user_idTousers: {
            select: {
              id: true,
              username: true,
              full_name: true,
              email: true
            }
          }
        }
      });
    }

    // Create a new invitation
    return await prisma.document_invitations.create({
      data: {
        document_id: parseInt(documentId),
        user_id: parseInt(invitedUserId),
        permission_level: permissionLevel,
        invited_by: parseInt(invitingUserId),
        invitation_date: new Date(),
        is_active: true
      },
      include: {
        users_document_invitations_user_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true,
            email: true
          }
        }
      }
    });
  }

  async getDocumentCollaborators(documentId, userId) {
    // Check if the user has access to the document
    const document = await this.checkDocumentAccess(documentId, userId);

    if (!document) {
      throw new Error('Document not found or you do not have permission to view collaborators');
    }

    // Get all collaborators (including the owner and invited users)
    const invitations = await prisma.document_invitations.findMany({
      where: {
        document_id: parseInt(documentId),
        is_active: true
      },
      include: {
        users_document_invitations_user_idTousers: {
          select: {
            id: true,
            username: true,
            full_name: true,
            email: true
          }
        }
      }
    });

    // Get the owner information
    const owner = await prisma.users.findUnique({
      where: { id: document.owner_id },
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true
      }
    });

    return {
      owner,
      collaborators: invitations.map(invitation => ({
        user: invitation.users_document_invitations_user_idTousers,
        permission_level: invitation.permission_level,
        invitation_date: invitation.invitation_date
      }))
    };
  }

  async removeCollaborator(documentId, collaboratorId, userId) {
    // Check if the user is the owner of the document
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
        owner_id: parseInt(userId)
      }
    });

    if (!document) {
      throw new Error('Document not found or you do not have permission to remove collaborators');
    }

    // Remove the collaborator by setting is_active to false
    return await prisma.document_invitations.updateMany({
      where: {
        document_id: parseInt(documentId),
        user_id: parseInt(collaboratorId)
      },
      data: {
        is_active: false
      }
    });
  }

  async checkDocumentAccess(documentId, userId, permissionLevels = ['read', 'write', 'admin']) {
    // Check if the user has access to the document with the specified permission level
    return await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
        OR: [
          { owner_id: parseInt(userId) },
          {
            document_invitations: {
              some: {
                user_id: parseInt(userId),
                is_active: true,
                permission_level: { in: permissionLevels }
              }
            }
          }
        ]
      }
    });
  }
}

module.exports = new DocumentService();
