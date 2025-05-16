/**
 * Tests pour le service d'authentification à deux facteurs
 */
const twoFactorAuthService = require('../../src/services/2fa-service');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Mock pour speakeasy
jest.mock('speakeasy', () => ({
  generateSecret: jest.fn(),
  totp: {
    verify: jest.fn()
  }
}));

// Mock pour QRCode
jest.mock('qrcode', () => ({
  toDataURL: jest.fn()
}));

// Mock pour Prisma
jest.mock('../../src/lib/prisma', () => {
  return {
    users: {
      update: jest.fn().mockResolvedValue({}),
      findUnique: jest.fn().mockResolvedValue(null)
    }
  };
});

describe('TwoFactorAuthService', () => {
  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();
  });

  describe('generateSecret', () => {
    it('devrait générer un secret pour l\'authentification à deux facteurs', () => {
      // Arrange
      const email = 'test@example.com';
      const mockSecret = {
        base32: 'ABCDEFGHIJKLMNOP',
        otpauth_url: 'otpauth://totp/CollaborativeDocs:test@example.com?secret=ABCDEFGHIJKLMNOP&issuer=CollaborativeDocs'
      };

      speakeasy.generateSecret.mockReturnValue(mockSecret);

      // Act
      const result = twoFactorAuthService.generateSecret(email);

      // Assert
      expect(speakeasy.generateSecret).toHaveBeenCalledWith({
        length: 20,
        name: `CollaborativeDocs:${email}`
      });

      expect(result).toEqual({
        otpauth_url: mockSecret.otpauth_url,
        base32: mockSecret.base32
      });
    });
  });

  describe('generateQRCode', () => {
    it('devrait générer un QR code à partir d\'un secret OTP', async () => {
      // Arrange
      const otpauthUrl = 'otpauth://totp/CollaborativeDocs:test@example.com?secret=ABCDEFGHIJKLMNOP&issuer=CollaborativeDocs';
      const mockQRCode = 'data:image/png;base64,mockQRCodeData';

      QRCode.toDataURL.mockResolvedValue(mockQRCode);

      // Act
      const result = await twoFactorAuthService.generateQRCode(otpauthUrl);

      // Assert
      expect(QRCode.toDataURL).toHaveBeenCalledWith(otpauthUrl);
      expect(result).toBe(mockQRCode);
    });

    it('devrait gérer les erreurs lors de la génération du QR code', async () => {
      // Arrange
      const otpauthUrl = 'otpauth://totp/CollaborativeDocs:test@example.com?secret=ABCDEFGHIJKLMNOP&issuer=CollaborativeDocs';
      const mockError = new Error('QR code generation failed');

      QRCode.toDataURL.mockRejectedValue(mockError);

      // Act & Assert
      await expect(twoFactorAuthService.generateQRCode(otpauthUrl)).rejects.toThrow('Erreur lors de la génération du QR code');
    });
  });

  describe('verifyToken', () => {
    it('devrait vérifier un token 2FA valide', () => {
      // Arrange
      const secret = 'ABCDEFGHIJKLMNOP';
      const token = '123456';

      speakeasy.totp.verify.mockReturnValue(true);

      // Act
      const result = twoFactorAuthService.verifyToken(secret, token);

      // Assert
      expect(speakeasy.totp.verify).toHaveBeenCalledWith({
        secret,
        encoding: 'base32',
        token,
        window: 1
      });

      expect(result).toBe(true);
    });

    it('devrait rejeter un token 2FA invalide', () => {
      // Arrange
      const secret = 'ABCDEFGHIJKLMNOP';
      const token = '123456';

      speakeasy.totp.verify.mockReturnValue(false);

      // Act
      const result = twoFactorAuthService.verifyToken(secret, token);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('enableTwoFactor', () => {
    it('devrait activer la 2FA pour un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const secret = 'ABCDEFGHIJKLMNOP';
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        two_factor_enabled: true,
        two_factor_secret: secret
      };

      prisma.users.update.mockResolvedValue(mockUser);

      // Act
      const result = await twoFactorAuthService.enableTwoFactor(userId, secret);

      // Assert
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          two_factor_enabled: true,
          two_factor_secret: secret
        }
      });

      expect(result).toEqual(mockUser);
    });

    it('devrait gérer les erreurs lors de l\'activation de la 2FA', async () => {
      // Arrange
      const userId = 1;
      const secret = 'ABCDEFGHIJKLMNOP';
      const mockError = new Error('Database error');

      prisma.users.update.mockRejectedValue(mockError);

      // Act & Assert
      await expect(twoFactorAuthService.enableTwoFactor(userId, secret)).rejects.toThrow('Erreur lors de l\'activation de la 2FA');
    });
  });

  describe('disableTwoFactor', () => {
    it('devrait désactiver la 2FA pour un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        two_factor_enabled: false,
        two_factor_secret: null
      };

      prisma.users.update.mockResolvedValue(mockUser);

      // Act
      const result = await twoFactorAuthService.disableTwoFactor(userId);

      // Assert
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          two_factor_enabled: false,
          two_factor_secret: null
        }
      });

      expect(result).toEqual(mockUser);
    });

    it('devrait gérer les erreurs lors de la désactivation de la 2FA', async () => {
      // Arrange
      const userId = 1;
      const mockError = new Error('Database error');

      prisma.users.update.mockRejectedValue(mockError);

      // Act & Assert
      await expect(twoFactorAuthService.disableTwoFactor(userId)).rejects.toThrow('Erreur lors de la désactivation de la 2FA');
    });
  });

  describe('isTwoFactorEnabled', () => {
    it('devrait vérifier si la 2FA est activée pour un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const mockUser = {
        two_factor_enabled: true
      };

      prisma.users.findUnique.mockResolvedValue(mockUser);

      // Act
      const result = await twoFactorAuthService.isTwoFactorEnabled(userId);

      // Assert
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { two_factor_enabled: true }
      });

      expect(result).toBe(true);
    });

    it('devrait retourner false si l\'utilisateur n\'existe pas', async () => {
      // Arrange
      const userId = 1;

      prisma.users.findUnique.mockResolvedValue(null);

      // Act
      const result = await twoFactorAuthService.isTwoFactorEnabled(userId);

      // Assert
      expect(result).toBe(false);
    });

    it('devrait gérer les erreurs lors de la vérification du statut 2FA', async () => {
      // Arrange
      const userId = 1;
      const mockError = new Error('Database error');

      prisma.users.findUnique.mockRejectedValue(mockError);

      // Act & Assert
      await expect(twoFactorAuthService.isTwoFactorEnabled(userId)).rejects.toThrow('Erreur lors de la vérification du statut 2FA');
    });
  });

  describe('getTwoFactorSecret', () => {
    it('devrait récupérer le secret 2FA d\'un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const mockUser = {
        two_factor_secret: 'ABCDEFGHIJKLMNOP'
      };

      prisma.users.findUnique.mockResolvedValue(mockUser);

      // Act
      const result = await twoFactorAuthService.getTwoFactorSecret(userId);

      // Assert
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { two_factor_secret: true }
      });

      expect(result).toBe('ABCDEFGHIJKLMNOP');
    });

    it('devrait retourner null si l\'utilisateur n\'existe pas', async () => {
      // Arrange
      const userId = 1;

      prisma.users.findUnique.mockResolvedValue(null);

      // Act
      const result = await twoFactorAuthService.getTwoFactorSecret(userId);

      // Assert
      expect(result).toBeNull();
    });

    it('devrait gérer les erreurs lors de la récupération du secret 2FA', async () => {
      // Arrange
      const userId = 1;
      const mockError = new Error('Database error');

      prisma.users.findUnique.mockRejectedValue(mockError);

      // Act & Assert
      await expect(twoFactorAuthService.getTwoFactorSecret(userId)).rejects.toThrow('Erreur lors de la récupération du secret 2FA');
    });
  });
});
