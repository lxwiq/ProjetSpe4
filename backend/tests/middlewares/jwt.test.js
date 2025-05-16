/**
 * Tests pour le middleware JWT
 */

// Mock pour jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secret, callback) => {
    if (token === 'invalid.jwt.token') {
      callback(new Error('Invalid token'));
    } else if (token === 'expired.jwt.token') {
      const error = new Error('Token expired');
      error.name = 'TokenExpiredError';
      callback(error);
    } else {
      // Valid token
      if (token === 'valid.jwt.token') {
        callback(null, { userId: 1, isAdmin: false });
      } else if (token === 'valid.admin.token') {
        callback(null, { userId: 1, isAdmin: true });
      }
    }
  })
}));

// Import jsonwebtoken après le mock
const jwt = require('jsonwebtoken');

// Import du middleware après le mock
const jwtMiddleware = require('../../src/middlewares/jwt');

describe('JWT Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();

    // Configurer les mocks pour req, res et next
    req = {
      cookies: {},
      headers: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    next = jest.fn();

    // Configurer la variable d'environnement
    process.env.JWT_SECRET_KEY = 'test-secret-key';
  });

  it('devrait passer au middleware suivant si le token est valide dans les cookies', () => {
    // Arrange
    const mockToken = 'valid.jwt.token';

    req.cookies.jwt_token = mockToken;

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(req.userId).toBe(1);
    expect(req.isAdmin).toBe(false);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('devrait passer au middleware suivant si le token est valide dans l\'en-tête Authorization', () => {
    // Arrange
    const mockToken = 'valid.admin.token';

    req.headers['authorization'] = `Bearer ${mockToken}`;

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(req.userId).toBe(1);
    expect(req.isAdmin).toBe(true);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('devrait retourner une erreur 401 si aucun token n\'est fourni', () => {
    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Authentication token missing');
  });

  it('devrait retourner une erreur 401 si le token est invalide', () => {
    // Arrange
    const mockToken = 'invalid.jwt.token';

    req.cookies.jwt_token = mockToken;

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid token');
  });

  it('devrait retourner une erreur 401 si le token est expiré', () => {
    // Arrange
    const mockToken = 'expired.jwt.token';

    req.cookies.jwt_token = mockToken;

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid token');
  });
});
