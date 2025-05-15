// src/routes/messaging-routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwt');
const messagingService = require('../services/messaging-service');

// Récupérer toutes les conversations de l'utilisateur
router.get('/conversations', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const conversations = await messagingService.getUserConversations(userId);
    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des conversations' });
  }
});

// Récupérer une conversation par son ID
router.get('/conversations/:conversationId', verifyToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.userId;
    
    // Vérifier si l'utilisateur est un participant de la conversation
    const conversation = await messagingService.getConversationById(parseInt(conversationId));
    const isParticipant = conversation.conversation_participants.some(
      p => p.user_id === userId && p.is_active
    );
    
    if (!isParticipant) {
      return res.status(403).json({ message: 'Vous n\'êtes pas un participant de cette conversation' });
    }
    
    res.json(conversation);
  } catch (error) {
    console.error(error);
    res.status(error.message === 'Conversation non trouvée' ? 404 : 500).json({ message: error.message });
  }
});

// Créer une nouvelle conversation
router.post('/conversations', verifyToken, async (req, res) => {
  try {
    const { participantIds, name, isGroup } = req.body;
    const creatorId = req.userId;
    
    if (!participantIds || !Array.isArray(participantIds)) {
      return res.status(400).json({ message: 'Liste de participants invalide' });
    }
    
    // S'assurer que l'utilisateur est inclus dans les participants
    const allParticipants = [...new Set([creatorId, ...participantIds])];
    
    const conversation = await messagingService.createConversation(
      creatorId,
      allParticipants,
      name,
      isGroup
    );
    
    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Récupérer les messages d'une conversation
router.get('/conversations/:conversationId/messages', verifyToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit, offset } = req.query;
    const userId = req.userId;
    
    const messages = await messagingService.getConversationMessages(
      parseInt(conversationId),
      userId,
      limit ? parseInt(limit) : 50,
      offset ? parseInt(offset) : 0
    );
    
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(error.message.includes('participant actif') ? 403 : 500).json({ message: error.message });
  }
});

// Envoyer un message dans une conversation
router.post('/conversations/:conversationId/messages', verifyToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const userId = req.userId;
    
    if (!content) {
      return res.status(400).json({ message: 'Contenu du message manquant' });
    }
    
    const message = await messagingService.sendMessage(parseInt(conversationId), userId, content);
    
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(error.message.includes('participant actif') ? 403 : 500).json({ message: error.message });
  }
});

// Ajouter un participant à une conversation de groupe
router.post('/conversations/:conversationId/participants', verifyToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.body;
    const addedBy = req.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'ID de l\'utilisateur manquant' });
    }
    
    const participant = await messagingService.addParticipant(parseInt(conversationId), parseInt(userId), addedBy);
    
    res.status(201).json(participant);
  } catch (error) {
    console.error(error);
    res.status(error.message.includes('autorisé') ? 403 : 500).json({ message: error.message });
  }
});

// Quitter une conversation
router.delete('/conversations/:conversationId/participants', verifyToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.userId;
    
    await messagingService.leaveConversation(parseInt(conversationId), userId);
    
    res.status(200).json({ message: 'Vous avez quitté la conversation' });
  } catch (error) {
    console.error(error);
    res.status(error.message.includes('participant actif') ? 403 : 500).json({ message: error.message });
  }
});

module.exports = router;
