/**
 * Tests pour le middleware de gestion d'erreurs
 */
const { ApiError, errorHandler, asyncHandler, notFoundHandler } = require('../../src/middlewares/error-handler');

describe('Error Handler Middleware', () => {
  describe('ApiError', () => {
    it('devrait créer une instance d\'ApiError avec les propriétés correctes', () => {
      // Arrange & Act
      const error = new ApiError(400, 'Bad Request', { field: 'username' });

      // Assert
      expect(error).toBeInstanceOf(Error);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad Request');
      expect(error.details).toEqual({ field: 'username' });
    });

    it('devrait créer une instance d\'ApiError sans détails', () => {
      // Arrange & Act
      const error = new ApiError(404, 'Not Found');

      // Assert
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Not Found');
      expect(error.details).toBeNull();
    });

    it('devrait créer une erreur 400 Bad Request avec la méthode statique', () => {
      // Arrange & Act
      const error = ApiError.badRequest('Données invalides', { field: 'email' });

      // Assert
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Données invalides');
      expect(error.details).toEqual({ field: 'email' });
    });

    it('devrait créer une erreur 401 Unauthorized avec la méthode statique', () => {
      // Arrange & Act
      const error = ApiError.unauthorized('Non autorisé');

      // Assert
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Non autorisé');
    });

    it('devrait créer une erreur 403 Forbidden avec la méthode statique', () => {
      // Arrange & Act
      const error = ApiError.forbidden('Accès refusé');

      // Assert
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Accès refusé');
    });

    it('devrait créer une erreur 404 Not Found avec la méthode statique', () => {
      // Arrange & Act
      const error = ApiError.notFound('Ressource non trouvée');

      // Assert
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Ressource non trouvée');
    });

    it('devrait créer une erreur 409 Conflict avec la méthode statique', () => {
      // Arrange & Act
      const error = ApiError.conflict('Conflit de ressource');

      // Assert
      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('Conflit de ressource');
    });

    it('devrait créer une erreur 429 Too Many Requests avec la méthode statique', () => {
      // Arrange & Act
      const error = ApiError.tooMany('Trop de requêtes');

      // Assert
      expect(error.statusCode).toBe(429);
      expect(error.message).toBe('Trop de requêtes');
    });

    it('devrait créer une erreur 500 Internal Server Error avec la méthode statique', () => {
      // Arrange & Act
      const error = ApiError.internal('Erreur interne');

      // Assert
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Erreur interne');
    });
  });

  describe('errorHandler', () => {
    let req, res, next;

    beforeEach(() => {
      // Configurer les mocks pour req, res et next
      req = {};

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      next = jest.fn();

      // Mock pour console.error
      console.error = jest.fn();
    });

    it('devrait gérer une ApiError', () => {
      // Arrange
      const error = new ApiError(400, 'Bad Request', { field: 'username' });

      // Act
      errorHandler(error, req, res, next);

      // Assert
      expect(console.error).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        code: 400,
        message: 'Bad Request',
        details: { field: 'username' }
      });
    });

    it('devrait gérer une erreur Prisma de contrainte unique (P2002)', () => {
      // Arrange
      const error = new Error('Unique constraint failed');
      error.name = 'PrismaClientKnownRequestError';
      error.code = 'P2002';
      error.meta = { target: ['email'] };

      // Act
      errorHandler(error, req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        code: 409,
        message: 'Conflit avec une ressource existante',
        details: {
          fields: ['email']
        }
      });
    });

    it('devrait gérer une erreur Prisma de ressource non trouvée (P2025)', () => {
      // Arrange
      const error = new Error('Record not found');
      error.name = 'PrismaClientKnownRequestError';
      error.code = 'P2025';

      // Act
      errorHandler(error, req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        code: 404,
        message: 'Ressource non trouvée',
        details: {
          error: 'Record not found'
        }
      });
    });

    it('devrait gérer une erreur de validation', () => {
      // Arrange
      const error = new Error('Validation error');
      error.name = 'ValidationError';
      error.details = { field: 'email', message: 'Email invalide' };

      // Act
      errorHandler(error, req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        code: 400,
        message: 'Erreur de validation',
        details: { field: 'email', message: 'Email invalide' }
      });
    });

    it('devrait gérer une erreur générique', () => {
      // Arrange
      const error = new Error('Une erreur est survenue');

      // Act
      errorHandler(error, req, res, next);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 'error',
        code: 500,
        message: expect.any(String),
        details: expect.any(String)
      }));
    });
  });

  describe('asyncHandler', () => {
    it('devrait appeler next avec l\'erreur si la fonction async rejette', async () => {
      // Arrange
      const req = {};
      const res = {};
      const next = jest.fn();
      const error = new Error('Async error');

      const asyncFn = jest.fn().mockRejectedValue(error);
      const wrappedFn = asyncHandler(asyncFn);

      // Act
      await wrappedFn(req, res, next);

      // Assert
      expect(asyncFn).toHaveBeenCalledWith(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });

    it('devrait exécuter la fonction async normalement si elle ne rejette pas', async () => {
      // Arrange
      const req = {};
      const res = {};
      const next = jest.fn();

      const asyncFn = jest.fn().mockResolvedValue('success');
      const wrappedFn = asyncHandler(asyncFn);

      // Act
      await wrappedFn(req, res, next);

      // Assert
      expect(asyncFn).toHaveBeenCalledWith(req, res, next);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('notFoundHandler', () => {
    it('devrait créer une ApiError 404 et appeler next avec', () => {
      // Arrange
      const req = { originalUrl: '/unknown-route' };
      const res = {};
      const next = jest.fn();

      // Act
      notFoundHandler(req, res, next);

      // Assert
      expect(next).toHaveBeenCalled();
      const error = next.mock.calls[0][0];
      expect(error).toBeInstanceOf(ApiError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Route non trouvée: /unknown-route');
    });
  });
});
