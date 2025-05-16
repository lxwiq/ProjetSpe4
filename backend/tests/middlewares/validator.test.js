/**
 * Tests pour le middleware de validation
 */
const { validate, schemas } = require('../../src/middlewares/validator');

describe('Validator Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    // Configurer les mocks pour req, res et next
    req = {
      body: {},
      params: {},
      query: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  describe('validate', () => {
    it('devrait passer au middleware suivant si les données sont valides', () => {
      // Arrange
      const schema = {
        body: {
          username: { type: 'string', required: true }
        }
      };
      
      req.body = { username: 'testuser' };
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('devrait retourner une erreur 400 si un champ requis est manquant', () => {
      // Arrange
      const schema = {
        body: {
          username: { type: 'string', required: true }
        }
      };
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        code: 400,
        message: 'Erreur de validation',
        details: expect.any(Object)
      });
    });

    it('devrait retourner une erreur 400 si le type de données est incorrect', () => {
      // Arrange
      const schema = {
        body: {
          age: { type: 'integer', required: true }
        }
      };
      
      req.body = { age: 'not-a-number' };
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        code: 400,
        message: 'Erreur de validation',
        details: expect.any(Object)
      });
    });

    it('devrait valider les paramètres de route', () => {
      // Arrange
      const schema = {
        params: {
          id: { type: 'integer', required: true }
        }
      };
      
      req.params = { id: '123' };
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('devrait valider les paramètres de requête', () => {
      // Arrange
      const schema = {
        query: {
          page: { type: 'integer', required: true }
        }
      };
      
      req.query = { page: '1' };
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('devrait valider la longueur minimale d\'une chaîne', () => {
      // Arrange
      const schema = {
        body: {
          password: { type: 'string', required: true, minLength: 6 }
        }
      };
      
      req.body = { password: '12345' }; // Trop court
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('devrait valider la longueur maximale d\'une chaîne', () => {
      // Arrange
      const schema = {
        body: {
          username: { type: 'string', required: true, maxLength: 10 }
        }
      };
      
      req.body = { username: '12345678901' }; // Trop long
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('devrait valider un email', () => {
      // Arrange
      const schema = {
        body: {
          email: { type: 'email', required: true }
        }
      };
      
      req.body = { email: 'not-an-email' };
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('devrait valider un email valide', () => {
      // Arrange
      const schema = {
        body: {
          email: { type: 'email', required: true }
        }
      };
      
      req.body = { email: 'test@example.com' };
      
      // Act
      validate(schema)(req, res, next);
      
      // Assert
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('schemas', () => {
    it('devrait avoir un schéma de validation pour la connexion', () => {
      expect(schemas.login).toBeDefined();
      expect(schemas.login.body.email).toBeDefined();
      expect(schemas.login.body.password).toBeDefined();
    });

    it('devrait avoir un schéma de validation pour la création d\'un document', () => {
      expect(schemas.createDocument).toBeDefined();
      expect(schemas.createDocument.body.title).toBeDefined();
    });

    it('devrait avoir un schéma de validation pour la mise à jour d\'un document', () => {
      expect(schemas.updateDocument).toBeDefined();
      expect(schemas.updateDocument.params.id).toBeDefined();
    });
  });
});
