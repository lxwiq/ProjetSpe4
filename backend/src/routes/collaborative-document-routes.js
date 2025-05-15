// src/routes/collaborative-document-routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwt');
const realtimeDocumentService = require('../services/realtime-document-service');
const prisma = require('../lib/prisma');

/**
 * @swagger
 * tags:
 *   name: CollaborativeDocuments
 *   description: Gestion des fonctionnalités collaboratives des documents
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ActiveUser:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'utilisateur
 *         username:
 *           type: string
 *           description: Nom d'utilisateur
 *         full_name:
 *           type: string
 *           description: Nom complet de l'utilisateur
 *     DocumentInvitation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'invitation
 *         document_id:
 *           type: integer
 *           description: ID du document
 *         user_id:
 *           type: integer
 *           description: ID de l'utilisateur invité
 *         invited_by:
 *           type: integer
 *           description: ID de l'utilisateur qui a envoyé l'invitation
 *         permission_level:
 *           type: string
 *           enum: [read, write, admin]
 *           description: Niveau de permission accordé
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'invitation
 *         is_active:
 *           type: boolean
 *           description: Indique si l'invitation est active
 *         users_document_invitations_user_idTousers:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /collaborative-documents/{documentId}/active-users:
 *   get:
 *     summary: Récupérer les utilisateurs actifs sur un document
 *     description: Renvoie la liste des utilisateurs actuellement connectés à un document
 *     tags: [CollaborativeDocuments]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     responses:
 *       200:
 *         description: Liste des utilisateurs actifs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActiveUser'
 *       403:
 *         description: Accès refusé au document
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs actifs
 */
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

/**
 * @swagger
 * /collaborative-documents/{documentId}/invitations:
 *   get:
 *     summary: Récupérer les invitations pour un document
 *     description: Renvoie la liste des invitations pour un document spécifique (propriétaire uniquement)
 *     tags: [CollaborativeDocuments]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     responses:
 *       200:
 *         description: Liste des invitations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DocumentInvitation'
 *       403:
 *         description: Vous n'êtes pas le propriétaire de ce document
 *       500:
 *         description: Erreur lors de la récupération des invitations
 */
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

/**
 * @swagger
 * /collaborative-documents/{documentId}/invite:
 *   post:
 *     summary: Inviter un utilisateur à un document
 *     description: Invite un utilisateur à collaborer sur un document
 *     tags: [CollaborativeDocuments]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invitedUserId
 *             properties:
 *               invitedUserId:
 *                 type: integer
 *                 description: ID de l'utilisateur à inviter
 *               permissionLevel:
 *                 type: string
 *                 enum: [read, write, admin]
 *                 default: write
 *                 description: Niveau de permission à accorder
 *     responses:
 *       201:
 *         description: Invitation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentInvitation'
 *       400:
 *         description: ID de l'utilisateur invité manquant
 *       500:
 *         description: Erreur lors de l'invitation de l'utilisateur
 */
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

/**
 * @swagger
 * /collaborative-documents/{documentId}/calls:
 *   get:
 *     summary: Récupérer les appels actifs pour un document
 *     description: Renvoie la liste des appels audio actifs pour un document spécifique
 *     tags: [CollaborativeDocuments]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du document
 *     responses:
 *       200:
 *         description: Liste des appels actifs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Call'
 *       403:
 *         description: Accès refusé au document
 *       500:
 *         description: Erreur lors de la récupération des appels actifs
 */
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
