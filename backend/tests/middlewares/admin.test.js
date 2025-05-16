/**
 * Tests pour le middleware d'administration
 */
const adminMiddleware = require('../../src/middlewares/admin');

describe('Admin Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    // Configurer les mocks pour req, res et next
    req = {};
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  it('devrait passer au middleware suivant si l\'utilisateur est un administrateur', () => {
    // Arrange
    req.isAdmin = true;
    
    // Act
    adminMiddleware(req, res, next);
    
    // Assert
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('devrait retourner une erreur 403 si l\'utilisateur n\'est pas un administrateur', () => {
    // Arrange
    req.isAdmin = false;
    
    // Act
    adminMiddleware(req, res, next);
    
    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Accès refusé: privilèges d\'administrateur requis'
    });
  });

  it('devrait retourner une erreur 403 si le statut d\'administrateur n\'est pas défini', () => {
    // Act
    adminMiddleware(req, res, next);
    
    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Accès refusé: privilèges d\'administrateur requis'
    });
  });
});
