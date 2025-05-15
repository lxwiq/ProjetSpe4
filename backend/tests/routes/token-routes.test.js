/**
 * Tests pour les routes de gestion des tokens
 */
const request = require('supertest');
const express = require('express');
const tokenService = require('../../src/services/token-service');
const { ApiError } = require('../../src/middlewares/error-handler');

// Mock pour le service de token
const tokenServiceMock = {
  refreshAccessToken: jest.fn()
};
jest.mock('../../src/services/token-service', () => tokenServiceMock);

// Créer une application Express pour les tests
const app = express();
app.use(express.json());
const tokenRoutes = require('../../src/routes/token-routes');
app.use('/token', tokenRoutes);

describe('Token Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /token/refresh', () => {
    it('devrait rafraîchir un token d\'accès avec un token de rafraîchissement valide', async () => {
      // Arrange
      const refreshToken = 'valid.refresh.token';
      const newAccessToken = 'new.access.token';
      const payload = { userId: 1, isAdmin: false };

      tokenServiceMock.refreshAccessToken.mockReturnValue({
        accessToken: newAccessToken,
        payload
      });

      // Act
      const response = await request(app)
        .post('/token/refresh')
        .send({ refreshToken });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Token rafraîchi avec succès',
        data: {
          accessToken: newAccessToken,
          user: {
            id: 1,
            isAdmin: false
          }
        }
      });

      expect(tokenServiceMock.refreshAccessToken).toHaveBeenCalledWith(refreshToken);

      // Vérifier que le cookie a été défini
      expect(response.headers['set-cookie']).toBeDefined();
      const cookieHeader = response.headers['set-cookie'][0];
      expect(cookieHeader).toContain('jwt_token');
      expect(cookieHeader).toContain(newAccessToken);
    });

    it('devrait retourner une erreur 400 si le token de rafraîchissement est manquant', async () => {
      // Act
      const response = await request(app)
        .post('/token/refresh')
        .send({});

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: 'error',
        code: 400,
        message: 'Token de rafraîchissement requis'
      });

      expect(tokenServiceMock.refreshAccessToken).not.toHaveBeenCalled();
    });

    it('devrait gérer les erreurs du service de token', async () => {
      // Arrange
      const refreshToken = 'invalid.refresh.token';
      const error = new ApiError(401, 'Token de rafraîchissement invalide');

      tokenServiceMock.refreshAccessToken.mockImplementation(() => {
        throw error;
      });

      // Act
      const response = await request(app)
        .post('/token/refresh')
        .send({ refreshToken });

      // Assert
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        status: 'error',
        code: 401,
        message: 'Token de rafraîchissement invalide'
      });

      expect(tokenServiceMock.refreshAccessToken).toHaveBeenCalledWith(refreshToken);
    });
  });
});
