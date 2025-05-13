// src/routes/collaborative-document-routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwt');
const realtimeDocumentService = require('../services/realtime-document-service');
const prisma = require('../lib/prisma');

// Récupérer les utilisateurs actifs sur un document
router.get('/:documentId/active-users', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.userId;
    
    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await realtimeDocumentService.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Accès refusé au document' });
    }
    
    const activeUsers = realtimeDocumentService.getActiveUsers(documentId);
    
    // Récupérer les informations des utilisateurs actifs
    const usersInfo = await prisma.users.findMany({
      where: {
        id: {
          in: activeUsers
        }
      },
      select: {
        id: true,
        username: true,
        full_name: true
      }
    });
    
    res.json(usersInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs actifs' });
  }
});

// Récupérer les invitations pour un document
router.get('/:documentId/invitations', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.userId;
    
    // Vérifier si l'utilisateur est le propriétaire du document
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
        owner_id: userId
      }
    });
    
    if (!document) {
      return res.status(403).json({ message: 'Vous n\'êtes pas le propriétaire de ce document' });
    }
    
    // Récupérer les invitations
    const invitations = await prisma.document_invitations.findMany({
      where: {
        document_id: parseInt(documentId)
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
    
    res.json(invitations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des invitations' });
  }
});

// Inviter un utilisateur à un document
router.post('/:documentId/invite', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const { invitedUserId, permissionLevel } = req.body;
    const invitingUserId = req.userId;
    
    if (!invitedUserId) {
      return res.status(400).json({ message: 'ID de l\'utilisateur invité manquant' });
    }
    
    const invitation = await realtimeDocumentService.inviteUserToDocument(
      documentId,
      invitedUserId,
      invitingUserId,
      permissionLevel || 'write'
    );
    
    res.status(201).json(invitation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Erreur lors de l\'invitation de l\'utilisateur' });
  }
});

// Récupérer les appels actifs pour un document
router.get('/:documentId/calls', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.userId;
    
    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await realtimeDocumentService.checkUserDocumentAccess(documentId, userId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Accès refusé au document' });
    }
    
    // Récupérer les appels actifs
    const activeCalls = await prisma.calls.findMany({
      where: {
        document_id: parseInt(documentId),
        status: 'active'
      },
      include: {
        call_participants: {
          where: {
            is_active: true
          },
          include: {
            users: {
              select: {
                id: true,
                username: true,
                full_name: true
              }
            }
          }
        },
        users: {
          select: {
            id: true,
            username: true,
            full_name: true
          }
        }
      }
    });
    
    res.json(activeCalls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des appels actifs' });
  }
});

module.exports = router;
