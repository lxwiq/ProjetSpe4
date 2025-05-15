// src/services/2fa-service.js
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const prisma = require('../lib/prisma');

class TwoFactorAuthService {
  /**
   * Génère un secret pour l'authentification à deux facteurs
   * @param {string} email - Email de l'utilisateur
   * @returns {Object} Objet contenant le secret et d'autres informations
   */
  generateSecret(email) {
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `CollaborativeDocs:${email}`
    });

    return {
      otpauth_url: secret.otpauth_url,
      base32: secret.base32
    };
  }

  /**
   * Génère un QR code à partir d'un secret OTP
   * @param {string} otpauthUrl - URL OTP Auth
   * @returns {Promise<string>} QR code en format data URL
   */
  async generateQRCode(otpauthUrl) {
    try {
      return await QRCode.toDataURL(otpauthUrl);
    } catch (error) {
      console.error('Erreur lors de la génération du QR code:', error);
      throw new Error('Erreur lors de la génération du QR code');
    }
  }

  /**
   * Vérifie un token 2FA
   * @param {string} secret - Secret en base32
   * @param {string} token - Token fourni par l'utilisateur
   * @returns {boolean} True si le token est valide
   */
  verifyToken(secret, token) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 1 // Permet une fenêtre de 30 secondes avant/après
    });
  }

  /**
   * Active la 2FA pour un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @param {string} secret - Secret en base32
   * @returns {Promise<Object>} Utilisateur mis à jour
   */
  async enableTwoFactor(userId, secret) {
    try {
      return await prisma.users.update({
        where: { id: parseInt(userId) },
        data: {
          two_factor_enabled: true,
          two_factor_secret: secret
        }
      });
    } catch (error) {
      console.error('Erreur lors de l\'activation de la 2FA:', error);
      throw new Error('Erreur lors de l\'activation de la 2FA');
    }
  }

  /**
   * Désactive la 2FA pour un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Utilisateur mis à jour
   */
  async disableTwoFactor(userId) {
    try {
      return await prisma.users.update({
        where: { id: parseInt(userId) },
        data: {
          two_factor_enabled: false,
          two_factor_secret: null
        }
      });
    } catch (error) {
      console.error('Erreur lors de la désactivation de la 2FA:', error);
      throw new Error('Erreur lors de la désactivation de la 2FA');
    }
  }

  /**
   * Vérifie si un utilisateur a la 2FA activée
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<boolean>} True si la 2FA est activée
   */
  async isTwoFactorEnabled(userId) {
    try {
      const user = await prisma.users.findUnique({
        where: { id: parseInt(userId) },
        select: { two_factor_enabled: true }
      });
      
      return user ? user.two_factor_enabled : false;
    } catch (error) {
      console.error('Erreur lors de la vérification du statut 2FA:', error);
      throw new Error('Erreur lors de la vérification du statut 2FA');
    }
  }

  /**
   * Récupère le secret 2FA d'un utilisateur
   * @param {number} userId - ID de l'utilisateur
   * @returns {Promise<string|null>} Secret 2FA ou null
   */
  async getTwoFactorSecret(userId) {
    try {
      const user = await prisma.users.findUnique({
        where: { id: parseInt(userId) },
        select: { two_factor_secret: true }
      });
      
      return user ? user.two_factor_secret : null;
    } catch (error) {
      console.error('Erreur lors de la récupération du secret 2FA:', error);
      throw new Error('Erreur lors de la récupération du secret 2FA');
    }
  }
}

module.exports = new TwoFactorAuthService();
