/**
 * Tests pour les routes de notification
 */
const request = require('supertest');
const express = require('express');
const notificationService = require('../../src/services/notification-service');

// Mock pour le service de notification
jest.mock('../../src/services/notification-service', () => ({
  getNotifications: jest.fn().mockResolvedValue([]),
  markAsRead: jest.fn().mockResolvedValue({
    id: 1,
    user_id: 1,
    type: 'document_shared',
    content: 'Un document a été partagé avec vous',
    is_read: true,
    created_at: new Date(),
    read_at: new Date()
  }),
  markAllAsRead: jest.fn().mockResolvedValue({ count: 5 }),
  getUnreadCount: jest.fn().mockResolvedValue({ count: 10 }),
  createNotification: jest.fn().mockResolvedValue({
    id: 3,
    user_id: 2,
    type: 'document_shared',
    content: 'Un document a été partagé avec vous',
    is_read: false,
    created_at: new Date(),
    related_id: 1,
    sender_id: 1
  })
}));

// Mock JWT middleware
jest.mock('../../src/middlewares/jwt', () => (req, res, next) => {
  // Mock authenticated user
  req.userId = 1;
  next();
});

// Import the app
const app = express();
app.use(express.json());
const notificationRoutes = require('../../src/routes/notification-routes');
app.use('/notifications', notificationRoutes);

describe('Notification Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /notifications', () => {
    it('devrait récupérer toutes les notifications d\'un utilisateur', async () => {
      // Arrange
      const mockNotifications = [
        {
          id: 1,
          user_id: 1,
          type: 'document_shared',
          content: 'Un document a été partagé avec vous',
          is_read: false,
          created_at: new Date(),
          related_id: 1,
          sender: {
            id: 2,
            username: 'user2',
            profile_picture: null
          }
        },
        {
          id: 2,
          user_id: 1,
          type: 'message_received',
          content: 'Vous avez reçu un nouveau message',
          is_read: true,
          created_at: new Date(),
          related_id: 1,
          sender: {
            id: 3,
            username: 'user3',
            profile_picture: null
          }
        }
      ];

      notificationService.getNotifications.mockResolvedValue(mockNotifications);

      // Act
      const response = await request(app).get('/notifications');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNotifications);
      expect(notificationService.getNotifications).toHaveBeenCalledWith(1);
    });

    it('devrait gérer les erreurs lors de la récupération des notifications', async () => {
      // Arrange
      notificationService.getNotifications.mockRejectedValue(new Error('Erreur lors de la récupération des notifications'));

      // Act
      const response = await request(app).get('/notifications');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la récupération des notifications' });
    });
  });

  describe('POST /notifications/:id/read', () => {
    it('devrait marquer une notification comme lue', async () => {
      // Arrange
      const notificationId = 1;

      notificationService.markAsRead.mockResolvedValue({
        id: 1,
        user_id: 1,
        type: 'document_shared',
        content: 'Un document a été partagé avec vous',
        is_read: true,
        created_at: new Date(),
        read_at: new Date()
      });

      // Act
      const response = await request(app).post(`/notifications/${notificationId}/read`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Notification marquée comme lue'
      });
      expect(notificationService.markAsRead).toHaveBeenCalledWith(notificationId, 1);
    });

    it('devrait gérer les erreurs lors du marquage d\'une notification comme lue', async () => {
      // Arrange
      const notificationId = 1;

      notificationService.markAsRead.mockRejectedValue(new Error('Erreur lors du marquage de la notification'));

      // Act
      const response = await request(app).post(`/notifications/${notificationId}/read`);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors du marquage de la notification comme lue' });
    });
  });

  describe('POST /notifications/read-all', () => {
    it('devrait marquer toutes les notifications comme lues', async () => {
      // Arrange
      notificationService.markAllAsRead.mockResolvedValue({ count: 5 });

      // Act
      const response = await request(app).post('/notifications/read-all');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Toutes les notifications marquées comme lues',
        data: { count: 5 }
      });
      expect(notificationService.markAllAsRead).toHaveBeenCalledWith(1);
    });

    it('devrait gérer les erreurs lors du marquage de toutes les notifications comme lues', async () => {
      // Arrange
      notificationService.markAllAsRead.mockRejectedValue(new Error('Erreur lors du marquage des notifications'));

      // Act
      const response = await request(app).post('/notifications/read-all');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors du marquage de toutes les notifications comme lues' });
    });
  });

  describe('GET /notifications/unread', () => {
    it('devrait récupérer le nombre de notifications non lues', async () => {
      // Arrange
      notificationService.getUnreadCount.mockResolvedValue({ count: 10 });

      // Act
      const response = await request(app).get('/notifications/unread');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ count: 10 });
      expect(notificationService.getUnreadCount).toHaveBeenCalledWith(1);
    });

    it('devrait gérer les erreurs lors de la récupération du nombre de notifications non lues', async () => {
      // Arrange
      notificationService.getUnreadCount.mockRejectedValue(new Error('Erreur lors de la récupération du nombre de notifications'));

      // Act
      const response = await request(app).get('/notifications/unread');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la récupération du nombre de notifications non lues' });
    });
  });

  describe('POST /notifications', () => {
    it('devrait créer une nouvelle notification', async () => {
      // Arrange
      const mockRequest = {
        userId: 2,
        type: 'document_shared',
        content: 'Un document a été partagé avec vous',
        relatedId: 1
      };

      const mockNotification = {
        id: 3,
        user_id: 2,
        type: 'document_shared',
        content: 'Un document a été partagé avec vous',
        is_read: false,
        created_at: new Date(),
        related_id: 1,
        sender_id: 1
      };

      notificationService.createNotification.mockResolvedValue(mockNotification);

      // Act
      const response = await request(app)
        .post('/notifications')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockNotification);
      expect(notificationService.createNotification).toHaveBeenCalledWith({
        userId: 2,
        type: 'document_shared',
        content: 'Un document a été partagé avec vous',
        relatedId: 1,
        senderId: 1
      });
    });

    it('devrait retourner une erreur 400 si des champs requis sont manquants', async () => {
      // Arrange
      const mockRequest = {
        type: 'document_shared',
        content: 'Un document a été partagé avec vous'
        // userId manquant
      };

      // Act
      const response = await request(app)
        .post('/notifications')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'userId, type et content sont requis' });
    });

    it('devrait gérer les erreurs lors de la création d\'une notification', async () => {
      // Arrange
      const mockRequest = {
        userId: 2,
        type: 'document_shared',
        content: 'Un document a été partagé avec vous',
        relatedId: 1
      };

      notificationService.createNotification.mockRejectedValue(new Error('Erreur lors de la création de la notification'));

      // Act
      const response = await request(app)
        .post('/notifications')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la création de la notification' });
    });
  });
});
