// src/routes/notification-routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwt');
const notificationService = require('../services/notification-service');

// Récupérer toutes les notifications de l'utilisateur
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { unreadOnly, limit, offset } = req.query;
    
    const notifications = await notificationService.getUserNotifications(
      userId,
      unreadOnly === 'true',
      limit ? parseInt(limit) : 20,
      offset ? parseInt(offset) : 0
    );
    
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des notifications' });
  }
});

// Récupérer les notifications en attente (non envoyées)
router.get('/pending', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    const pendingNotifications = notificationService.getPendingNotifications(userId);
    
    // Effacer les notifications en attente après les avoir récupérées
    notificationService.clearPendingNotifications(userId);
    
    res.json(pendingNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des notifications en attente' });
  }
});

// Marquer une notification comme lue
router.put('/:notificationId/read', verifyToken, async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.userId;
    
    const notification = await notificationService.markAsRead(parseInt(notificationId), userId);
    
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(error.message.includes('non trouvée') ? 404 : 500).json({ message: error.message });
  }
});

// Marquer toutes les notifications comme lues
router.put('/read-all', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    
    const result = await notificationService.markAllAsRead(userId);
    
    res.json({ message: `${result.count} notifications marquées comme lues` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors du marquage des notifications comme lues' });
  }
});

// Supprimer une notification
router.delete('/:notificationId', verifyToken, async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.userId;
    
    await notificationService.deleteNotification(parseInt(notificationId), userId);
    
    res.json({ message: 'Notification supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(error.message.includes('non trouvée') ? 404 : 500).json({ message: error.message });
  }
});

module.exports = router;
