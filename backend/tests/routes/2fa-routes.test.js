/**
 * Tests pour les routes d'authentification à deux facteurs
 */
const request = require('supertest');
const express = require('express');
const twoFactorAuthService = require('../../src/services/2fa-service');
const jwt = require('jsonwebtoken');

// Mock pour le service 2FA
jest.mock('../../src/services/2fa-service', () => ({
  generateSecret: jest.fn().mockReturnValue({
    base32: 'ABCDEFGHIJKLMNOP',
    otpauth_url: 'otpauth://totp/CollaborativeDocs:test@example.com?secret=ABCDEFGHIJKLMNOP&issuer=CollaborativeDocs'
  }),
  generateQRCode: jest.fn().mockResolvedValue('data:image/png;base64,mockQRCodeData'),
  verifyToken: jest.fn().mockReturnValue(true),
  enableTwoFactor: jest.fn().mockResolvedValue({
    id: 1,
    email: 'test@example.com',
    two_factor_enabled: true,
    two_factor_secret: 'ABCDEFGHIJKLMNOP'
  }),
  disableTwoFactor: jest.fn().mockResolvedValue({
    id: 1,
    email: 'test@example.com',
    two_factor_enabled: false,
    two_factor_secret: null
  }),
  isTwoFactorEnabled: jest.fn().mockResolvedValue(true),
  getTwoFactorSecret: jest.fn().mockResolvedValue('ABCDEFGHIJKLMNOP')
}));

// Mock pour Prisma
jest.mock('../../src/lib/prisma', () => ({
  users: {
    findUnique: jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      two_factor_enabled: false
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      two_factor_enabled: true,
      two_factor_secret: 'ABCDEFGHIJKLMNOP'
    })
  }
}));

// Mock pour jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('full.jwt.token'),
  verify: jest.fn().mockReturnValue({ userId: 1 })
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
const twoFactorRoutes = require('../../src/routes/2fa-routes');
app.use('/2fa', twoFactorRoutes);

describe('2FA Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /2fa/setup', () => {
    it('devrait configurer la 2FA pour un utilisateur', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        two_factor_enabled: false
      };

      const mockSecret = {
        base32: 'ABCDEFGHIJKLMNOP',
        otpauth_url: 'otpauth://totp/CollaborativeDocs:test@example.com?secret=ABCDEFGHIJKLMNOP&issuer=CollaborativeDocs'
      };

      const mockQRCode = 'data:image/png;base64,mockQRCodeData';

      prisma.users.findUnique.mockResolvedValue(mockUser);
      twoFactorAuthService.generateSecret.mockReturnValue(mockSecret);
      twoFactorAuthService.generateQRCode.mockResolvedValue(mockQRCode);

      // Act
      const response = await request(app).get('/2fa/setup');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Configuration 2FA initiée',
        data: {
          qrCode: mockQRCode,
          secret: mockSecret.base32
        }
      });

      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: { email: true, two_factor_enabled: true }
      });

      expect(twoFactorAuthService.generateSecret).toHaveBeenCalledWith('test@example.com');
      expect(twoFactorAuthService.generateQRCode).toHaveBeenCalledWith(mockSecret.otpauth_url);
    });

    it('devrait retourner une erreur 404 si l\'utilisateur n\'existe pas', async () => {
      // Arrange
      prisma.users.findUnique.mockResolvedValue(null);

      // Act
      const response = await request(app).get('/2fa/setup');

      // Assert
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Utilisateur non trouvé' });
    });

    it('devrait retourner une erreur 400 si la 2FA est déjà activée', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        two_factor_enabled: true
      };

      prisma.users.findUnique.mockResolvedValue(mockUser);

      // Act
      const response = await request(app).get('/2fa/setup');

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'La 2FA est déjà activée pour cet utilisateur' });
    });

    it('devrait gérer les erreurs lors de la configuration 2FA', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        two_factor_enabled: false
      };

      prisma.users.findUnique.mockResolvedValue(mockUser);
      twoFactorAuthService.generateSecret.mockImplementation(() => {
        throw new Error('Erreur lors de la génération du secret');
      });

      // Act
      const response = await request(app).get('/2fa/setup');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la configuration 2FA' });
    });
  });

  describe('POST /2fa/verify-setup', () => {
    it('devrait activer la 2FA après vérification du token', async () => {
      // Arrange
      const mockRequest = {
        token: '123456',
        secret: 'ABCDEFGHIJKLMNOP'
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        two_factor_enabled: true,
        two_factor_secret: 'ABCDEFGHIJKLMNOP'
      };

      twoFactorAuthService.verifyToken.mockReturnValue(true);
      twoFactorAuthService.enableTwoFactor.mockResolvedValue(mockUser);

      // Act
      const response = await request(app)
        .post('/2fa/verify-setup')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: '2FA activée avec succès',
        data: {
          enabled: true
        }
      });

      expect(twoFactorAuthService.verifyToken).toHaveBeenCalledWith('ABCDEFGHIJKLMNOP', '123456');
      expect(twoFactorAuthService.enableTwoFactor).toHaveBeenCalledWith(1, 'ABCDEFGHIJKLMNOP');
    });

    it('devrait retourner une erreur 400 si le token ou le secret est manquant', async () => {
      // Arrange
      const mockRequest = {
        token: '123456'
        // Secret manquant
      };

      // Act
      const response = await request(app)
        .post('/2fa/verify-setup')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Token et secret requis' });
    });

    it('devrait retourner une erreur 400 si le token est invalide', async () => {
      // Arrange
      const mockRequest = {
        token: '123456',
        secret: 'ABCDEFGHIJKLMNOP'
      };

      twoFactorAuthService.verifyToken.mockReturnValue(false);

      // Act
      const response = await request(app)
        .post('/2fa/verify-setup')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Token invalide' });
    });

    it('devrait gérer les erreurs lors de l\'activation de la 2FA', async () => {
      // Arrange
      const mockRequest = {
        token: '123456',
        secret: 'ABCDEFGHIJKLMNOP'
      };

      twoFactorAuthService.verifyToken.mockReturnValue(true);
      twoFactorAuthService.enableTwoFactor.mockRejectedValue(new Error('Erreur lors de l\'activation de la 2FA'));

      // Act
      const response = await request(app)
        .post('/2fa/verify-setup')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de l\'activation de la 2FA' });
    });
  });

  describe('POST /2fa/disable', () => {
    it('devrait désactiver la 2FA', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        two_factor_enabled: false,
        two_factor_secret: null
      };

      twoFactorAuthService.disableTwoFactor.mockResolvedValue(mockUser);

      // Act
      const response = await request(app).post('/2fa/disable');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: '2FA désactivée avec succès',
        data: {
          enabled: false
        }
      });

      expect(twoFactorAuthService.disableTwoFactor).toHaveBeenCalledWith(1);
    });

    it('devrait gérer les erreurs lors de la désactivation de la 2FA', async () => {
      // Arrange
      twoFactorAuthService.disableTwoFactor.mockRejectedValue(new Error('Erreur lors de la désactivation de la 2FA'));

      // Act
      const response = await request(app).post('/2fa/disable');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la désactivation de la 2FA' });
    });
  });

  describe('GET /2fa/status', () => {
    it('devrait récupérer le statut 2FA d\'un utilisateur', async () => {
      // Arrange
      twoFactorAuthService.isTwoFactorEnabled.mockResolvedValue(true);

      // Act
      const response = await request(app).get('/2fa/status');

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Statut 2FA récupéré avec succès',
        data: {
          enabled: true
        }
      });

      expect(twoFactorAuthService.isTwoFactorEnabled).toHaveBeenCalledWith(1);
    });

    it('devrait gérer les erreurs lors de la vérification du statut 2FA', async () => {
      // Arrange
      twoFactorAuthService.isTwoFactorEnabled.mockRejectedValue(new Error('Erreur lors de la vérification du statut 2FA'));

      // Act
      const response = await request(app).get('/2fa/status');

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Erreur lors de la vérification du statut 2FA' });
    });
  });

  describe('POST /2fa/verify', () => {
    it('devrait vérifier un token 2FA lors de la connexion', async () => {
      // Arrange
      const mockRequest = {
        token: '123456',
        tempToken: 'temp.jwt.token'
      };

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        is_admin: false
      };

      jwt.verify.mockReturnValue({ userId: 1 });
      twoFactorAuthService.getTwoFactorSecret.mockResolvedValue('ABCDEFGHIJKLMNOP');
      twoFactorAuthService.verifyToken.mockReturnValue(true);
      prisma.users.findUnique.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('full.jwt.token');

      // Act
      const response = await request(app)
        .post('/2fa/verify')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Authentification 2FA réussie',
        data: {
          user: {
            id: 1,
            email: 'test@example.com',
            is_admin: false
          },
          token: 'full.jwt.token'
        }
      });

      expect(jwt.verify).toHaveBeenCalledWith('temp.jwt.token', process.env.JWT_SECRET_KEY);
      expect(twoFactorAuthService.getTwoFactorSecret).toHaveBeenCalledWith(1);
      expect(twoFactorAuthService.verifyToken).toHaveBeenCalledWith('ABCDEFGHIJKLMNOP', '123456');
      expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 1, isAdmin: false },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
    });

    it('devrait retourner une erreur 400 si le token ou le token temporaire est manquant', async () => {
      // Arrange
      const mockRequest = {
        token: '123456'
        // tempToken manquant
      };

      // Act
      const response = await request(app)
        .post('/2fa/verify')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Token et token temporaire requis' });
    });

    it('devrait retourner une erreur 401 si le token temporaire est invalide', async () => {
      // Arrange
      const mockRequest = {
        token: '123456',
        tempToken: 'invalid.temp.token'
      };

      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act
      const response = await request(app)
        .post('/2fa/verify')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Token temporaire invalide ou expiré' });
    });

    it('devrait retourner une erreur 400 si le secret 2FA n\'est pas trouvé', async () => {
      // Arrange
      const mockRequest = {
        token: '123456',
        tempToken: 'temp.jwt.token'
      };

      jwt.verify.mockReturnValue({ userId: 1 });
      twoFactorAuthService.getTwoFactorSecret.mockResolvedValue(null);

      // Act
      const response = await request(app)
        .post('/2fa/verify')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Secret 2FA non trouvé' });
    });

    it('devrait retourner une erreur 400 si le token 2FA est invalide', async () => {
      // Arrange
      const mockRequest = {
        token: '123456',
        tempToken: 'temp.jwt.token'
      };

      jwt.verify.mockReturnValue({ userId: 1 });
      twoFactorAuthService.getTwoFactorSecret.mockResolvedValue('ABCDEFGHIJKLMNOP');
      twoFactorAuthService.verifyToken.mockReturnValue(false);

      // Act
      const response = await request(app)
        .post('/2fa/verify')
        .send(mockRequest);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Code 2FA invalide' });
    });
  });
});
