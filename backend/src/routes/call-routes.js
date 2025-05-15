// src/routes/call-routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwt');
const prisma = require('../lib/prisma');

/**
 * @swagger
 * tags:
 *   name: Calls
 *   description: Gestion des appels audio entre collaborateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Call:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'appel
 *         document_id:
 *           type: integer
 *           description: ID du document associé
 *         initiated_by:
 *           type: integer
 *           description: ID de l'utilisateur qui a initié l'appel
 *         started_at:
 *           type: string
 *           format: date-time
 *           description: Date de début de l'appel
 *         ended_at:
 *           type: string
 *           format: date-time
 *           description: Date de fin de l'appel
 *         status:
 *           type: string
 *           enum: [active, ended, failed]
 *           description: Statut de l'appel
 *         call_participants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CallParticipant'
 *           description: Liste des participants à l'appel
 *     CallParticipant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID du participant
 *         call_id:
 *           type: integer
 *           description: ID de l'appel
 *         user_id:
 *           type: integer
 *           description: ID de l'utilisateur
 *         joined_at:
 *           type: string
 *           format: date-time
 *           description: Date à laquelle l'utilisateur a rejoint l'appel
 *         left_at:
 *           type: string
 *           format: date-time
 *           description: Date à laquelle l'utilisateur a quitté l'appel
 *         is_active:
 *           type: boolean
 *           description: Indique si l'utilisateur est actuellement dans l'appel
 *         users:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             username:
 *               type: string
 *             full_name:
 *               type: string
 *             profile_picture:
 *               type: string
 */

/**
 * @swagger
 * /calls/document/{documentId}/active:
 *   get:
 *     summary: Récupérer les appels actifs pour un document
 *     description: Renvoie la liste des appels actifs pour un document spécifique
 *     tags: [Calls]
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
 *         description: Liste des appels actifs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appels actifs récupérés avec succès
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Call'
 *       403:
 *         description: Accès refusé au document
 *       500:
 *         description: Erreur lors de la récupération des appels actifs
 */
// Récupérer tous les appels actifs pour un document
router.get('/document/:documentId/active', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const userId = req.userId;

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await checkUserDocumentAccess(documentId, userId);
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
                full_name: true,
                profile_picture: true
              }
            }
          }
        },
        users: {
          select: {
            id: true,
            username: true,
            full_name: true,
            profile_picture: true
          }
        }
      }
    });

    res.json({
      message: 'Appels actifs récupérés avec succès',
      data: activeCalls
    });
  } catch (error) {
    console.error('[APPEL VOCAL] Erreur lors de la récupération des appels actifs:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des appels actifs' });
  }
});

/**
 * @swagger
 * /calls/{callId}:
 *   get:
 *     summary: Récupérer les détails d'un appel
 *     description: Renvoie les détails d'un appel spécifique, y compris les participants
 *     tags: [Calls]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'appel
 *     responses:
 *       200:
 *         description: Détails de l'appel récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appel récupéré avec succès
 *                 data:
 *                   $ref: '#/components/schemas/Call'
 *       403:
 *         description: Accès refusé au document
 *       404:
 *         description: Appel non trouvé
 *       500:
 *         description: Erreur lors de la récupération de l'appel
 */
// Récupérer les détails d'un appel
router.get('/:callId', verifyToken, async (req, res) => {
  try {
    const { callId } = req.params;
    const userId = req.userId;

    // Récupérer l'appel
    const call = await prisma.calls.findUnique({
      where: { id: parseInt(callId) },
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
                full_name: true,
                profile_picture: true
              }
            }
          }
        },
        documents: true,
        users: {
          select: {
            id: true,
            username: true,
            full_name: true,
            profile_picture: true
          }
        }
      }
    });

    if (!call) {
      return res.status(404).json({ message: 'Appel non trouvé' });
    }

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await checkUserDocumentAccess(call.document_id, userId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Accès refusé au document' });
    }

    res.json({
      message: 'Appel récupéré avec succès',
      data: call
    });
  } catch (error) {
    console.error('[APPEL VOCAL] Erreur lors de la récupération de l\'appel:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'appel' });
  }
});

/**
 * @swagger
 * /calls/{callId}/end:
 *   put:
 *     summary: Terminer un appel
 *     description: Termine un appel actif et met à jour le statut de tous les participants
 *     tags: [Calls]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'appel à terminer
 *     responses:
 *       200:
 *         description: Appel terminé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appel terminé avec succès
 *                 data:
 *                   $ref: '#/components/schemas/Call'
 *       403:
 *         description: Accès refusé au document
 *       404:
 *         description: Appel non trouvé
 *       500:
 *         description: Erreur lors de la terminaison de l'appel
 */
// Terminer un appel
router.put('/:callId/end', verifyToken, async (req, res) => {
  try {
    const { callId } = req.params;
    const userId = req.userId;

    // Récupérer l'appel
    const call = await prisma.calls.findUnique({
      where: { id: parseInt(callId) },
      include: {
        documents: true
      }
    });

    if (!call) {
      return res.status(404).json({ message: 'Appel non trouvé' });
    }

    // Vérifier si l'utilisateur a accès au document
    const hasAccess = await checkUserDocumentAccess(call.document_id, userId);
    if (!hasAccess) {
      return res.status(403).json({ message: 'Accès refusé au document' });
    }

    // Mettre à jour l'appel
    const updatedCall = await prisma.calls.update({
      where: { id: parseInt(callId) },
      data: {
        status: 'ended',
        ended_at: new Date()
      }
    });

    // Mettre à jour tous les participants
    await prisma.call_participants.updateMany({
      where: {
        call_id: parseInt(callId),
        is_active: true
      },
      data: {
        is_active: false,
        left_at: new Date()
      }
    });

    res.json({
      message: 'Appel terminé avec succès',
      data: updatedCall
    });
  } catch (error) {
    console.error('[APPEL VOCAL] Erreur lors de la terminaison de l\'appel:', error);
    res.status(500).json({ message: 'Erreur lors de la terminaison de l\'appel' });
  }
});

/**
 * Vérifie si un utilisateur a accès à un document
 * @param {number} documentId - ID du document
 * @param {number} userId - ID de l'utilisateur
 * @returns {Promise<boolean>} - true si l'utilisateur a accès au document
 */
async function checkUserDocumentAccess(documentId, userId) {
  try {
    const document = await prisma.documents.findFirst({
      where: {
        id: parseInt(documentId),
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
      }
    });

    return !!document;
  } catch (error) {
    console.error('[APPEL VOCAL] Erreur lors de la vérification de l\'accès au document:', error);
    return false;
  }
}

module.exports = router;
