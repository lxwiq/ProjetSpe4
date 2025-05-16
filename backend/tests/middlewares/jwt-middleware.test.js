/**
 * Tests pour le middleware JWT
 */

// Mock pour jsonwebtoken
const mockVerify = jest.fn();
jest.mock('jsonwebtoken', () => ({
  verify: mockVerify
}));

// Import jsonwebtoken après le mock
const jwt = require('jsonwebtoken');

describe('JWT Middleware', () => {
  let req, res, next, jwtMiddleware;

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

    // Importer le middleware après avoir configuré les mocks
    jwtMiddleware = require('../../src/middlewares/jwt');
  });

  it('devrait passer au middleware suivant si le token est valide dans les cookies', () => {
    // Arrange
    const mockToken = 'valid.jwt.token';
    const mockDecodedToken = { userId: 1, isAdmin: false };

    req.cookies.jwt_token = mockToken;

    // Configurer le mock pour jwt.verify
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockDecodedToken);
    });

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test-secret-key', expect.any(Function));
    expect(req.userId).toBe(1);
    expect(req.isAdmin).toBe(false);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('devrait passer au middleware suivant si le token est valide dans l\'en-tête Authorization', () => {
    // Arrange
    const mockToken = 'valid.jwt.token';
    const mockDecodedToken = { userId: 1, isAdmin: true };

    req.headers['authorization'] = `Bearer ${mockToken}`;

    // Configurer le mock pour jwt.verify
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockDecodedToken);
    });

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test-secret-key', expect.any(Function));
    expect(req.userId).toBe(1);
    expect(req.isAdmin).toBe(true);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('devrait retourner une erreur 401 si aucun token n\'est fourni', () => {
    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(jwt.verify).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Authentication token missing');
  });

  it('devrait retourner une erreur 401 si le token est invalide', () => {
    // Arrange
    const mockToken = 'invalid.jwt.token';

    req.cookies.jwt_token = mockToken;

    // Configurer le mock pour jwt.verify
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test-secret-key', expect.any(Function));
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid token');
  });

  it('devrait retourner une erreur 401 si le token est expiré', () => {
    // Arrange
    const mockToken = 'expired.jwt.token';
    const tokenError = new Error('Token expired');
    tokenError.name = 'TokenExpiredError';

    req.cookies.jwt_token = mockToken;

    // Configurer le mock pour jwt.verify
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(tokenError);
    });

    // Act
    jwtMiddleware(req, res, next);

    // Assert
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'test-secret-key', expect.any(Function));
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid token');
  });
});
