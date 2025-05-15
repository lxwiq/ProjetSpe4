// src/routes/call-routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwt');
const prisma = require('../lib/prisma');

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
