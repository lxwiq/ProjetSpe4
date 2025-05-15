/**
 * Tests pour le service de gestion des tokens
 */
const tokenService = require('../../src/services/token-service');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../../src/middlewares/error-handler');

// Mock pour jsonwebtoken
const jwtMock = {
  sign: jest.fn(),
  verify: jest.fn()
};
jest.mock('jsonwebtoken', () => jwtMock);

describe('TokenService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET_KEY = 'test-secret-key';
    process.env.JWT_REFRESH_SECRET_KEY = 'test-refresh-secret-key';
  });

  describe('generateAccessToken', () => {
    it('devrait générer un token d\'accès valide', () => {
      // Arrange
      const payload = { userId: 1, isAdmin: false };
      const mockToken = 'mock.access.token';
      jwtMock.sign.mockReturnValue(mockToken);

      // Act
      const result = tokenService.generateAccessToken(payload);

      // Assert
      expect(result).toBe(mockToken);
      expect(jwtMock.sign).toHaveBeenCalledWith(
        payload,
        'test-secret-key',
        { expiresIn: '15m' }
      );
    });

    it('devrait accepter une durée de validité personnalisée', () => {
      // Arrange
      const payload = { userId: 1 };
      const expiresIn = '30m';
      jwtMock.sign.mockReturnValue('mock.token');

      // Act
      tokenService.generateAccessToken(payload, expiresIn);

      // Assert
      expect(jwtMock.sign).toHaveBeenCalledWith(
        payload,
        'test-secret-key',
        { expiresIn }
      );
    });
  });

  describe('generateRefreshToken', () => {
    it('devrait générer un token de rafraîchissement valide', () => {
      // Arrange
      const payload = { userId: 1 };
      const mockToken = 'mock.refresh.token';
      jwtMock.sign.mockReturnValue(mockToken);

      // Act
      const result = tokenService.generateRefreshToken(payload);

      // Assert
      expect(result).toBe(mockToken);
      expect(jwtMock.sign).toHaveBeenCalledWith(
        payload,
        'test-refresh-secret-key',
        { expiresIn: '7d' }
      );
    });
  });

  describe('verifyAccessToken', () => {
    it('devrait vérifier un token d\'accès valide', () => {
      // Arrange
      const token = 'valid.access.token';
      const decodedToken = { userId: 1 };
      jwtMock.verify.mockReturnValue(decodedToken);

      // Act
      const result = tokenService.verifyAccessToken(token);

      // Assert
      expect(result).toBe(decodedToken);
      expect(jwtMock.verify).toHaveBeenCalledWith(token, 'test-secret-key');
    });

    it('devrait lancer une erreur si le token est expiré', () => {
      // Arrange
      const token = 'expired.token';
      const error = new Error('Token expired');
      error.name = 'TokenExpiredError';
      jwtMock.verify.mockImplementation(() => { throw error; });

      // Act & Assert
      expect(() => {
        tokenService.verifyAccessToken(token);
      }).toThrow(ApiError);

      try {
        tokenService.verifyAccessToken(token);
      } catch (err) {
        expect(err.statusCode).toBe(401);
        expect(err.message).toBe('Token expiré');
        expect(err.details).toEqual({ expired: true });
      }
    });

    it('devrait lancer une erreur si le token est invalide', () => {
      // Arrange
      const token = 'invalid.token';
      const error = new Error('Invalid token');
      error.name = 'JsonWebTokenError';
      jwtMock.verify.mockImplementation(() => { throw error; });

      // Act & Assert
      expect(() => {
        tokenService.verifyAccessToken(token);
      }).toThrow(ApiError);

      try {
        tokenService.verifyAccessToken(token);
      } catch (err) {
        expect(err.statusCode).toBe(401);
        expect(err.message).toBe('Token invalide');
      }
    });
  });

  describe('refreshAccessToken', () => {
    it('devrait rafraîchir un token d\'accès à partir d\'un token de rafraîchissement valide', () => {
      // Arrange
      const refreshToken = 'valid.refresh.token';
      const decodedToken = {
        userId: 1,
        isAdmin: false,
        iat: 1234567890,
        exp: 9876543210
      };
      const newAccessToken = 'new.access.token';

      jwtMock.verify.mockReturnValue(decodedToken);
      jwtMock.sign.mockReturnValue(newAccessToken);

      // Act
      const result = tokenService.refreshAccessToken(refreshToken);

      // Assert
      expect(result).toEqual({
        accessToken: newAccessToken,
        payload: { userId: 1, isAdmin: false }
      });

      expect(jwtMock.verify).toHaveBeenCalledWith(refreshToken, 'test-refresh-secret-key');
      expect(jwtMock.sign).toHaveBeenCalledWith(
        { userId: 1, isAdmin: false },
        'test-secret-key',
        { expiresIn: '15m' }
      );
    });
  });
});
