// src/controllers/2fa-controller.js
const twoFactorAuthService = require('../services/2fa-service');
const prisma = require('../lib/prisma');
const jwt = require('jsonwebtoken');

class TwoFactorAuthController {
  /**
   * Configure la 2FA pour un utilisateur
   * Génère un secret et un QR code
   */
  async setupTwoFactor(req, res) {
    try {
      const userId = req.userId;

      // Récupérer l'email de l'utilisateur
      const user = await prisma.users.findUnique({
        where: { id: userId },
        select: { email: true, two_factor_enabled: true }
      });

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Vérifier si la 2FA est déjà activée
      if (user.two_factor_enabled) {
        return res.status(400).json({ message: 'La 2FA est déjà activée pour cet utilisateur' });
      }

      // Générer un nouveau secret
      const secret = twoFactorAuthService.generateSecret(user.email);

      // Générer un QR code
      const qrCodeUrl = await twoFactorAuthService.generateQRCode(secret.otpauth_url);

      return res.status(200).json({
        message: 'Configuration 2FA initiée',
        data: {
          qrCode: qrCodeUrl,
          secret: secret.base32 // Normalement, ne pas envoyer le secret au client en production
        }
      });
    } catch (error) {
      console.error('Erreur lors de la configuration 2FA:', error);
      return res.status(500).json({ message: 'Erreur lors de la configuration 2FA' });
    }
  }

  /**
   * Vérifie un token 2FA lors de la configuration
   */
  async verifySetup(req, res) {
    try {
      const { token, secret } = req.body;
      const userId = req.userId;

      if (!token) {
        return res.status(400).json({ message: 'Token requis' });
      }

      if (!secret) {
        return res.status(400).json({ message: 'Secret requis' });
      }

      // Vérifier le token
      const isValid = twoFactorAuthService.verifyToken(secret, token);

      if (!isValid) {
        return res.status(400).json({ message: 'Token invalide' });
      }

      // Activer la 2FA pour l'utilisateur
      await twoFactorAuthService.enableTwoFactor(userId, secret);

      return res.status(200).json({ message: 'Configuration 2FA réussie' });
    } catch (error) {
      console.error('Erreur lors de la vérification 2FA:', error);
      return res.status(500).json({ message: 'Erreur lors de la vérification 2FA' });
    }
  }

  /**
   * Désactive la 2FA pour un utilisateur
   */
  async disableTwoFactor(req, res) {
    try {
      const { token } = req.body;
      const userId = req.userId;

      // Vérifier si la 2FA est activée
      const isEnabled = await twoFactorAuthService.isTwoFactorEnabled(userId);
      if (!isEnabled) {
        return res.status(400).json({ message: 'La 2FA n\'est pas activée pour cet utilisateur' });
      }

      // Récupérer le secret
      const secret = await twoFactorAuthService.getTwoFactorSecret(userId);
      if (!secret) {
        return res.status(400).json({ message: 'Secret 2FA non trouvé' });
      }

      // Vérifier le token
      const isValid = twoFactorAuthService.verifyToken(secret, token);
      if (!isValid) {
        return res.status(400).json({ message: 'Token invalide' });
      }

      // Désactiver la 2FA
      await twoFactorAuthService.disableTwoFactor(userId);

      return res.status(200).json({ message: 'La 2FA a été désactivée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la désactivation 2FA:', error);
      return res.status(500).json({ message: 'Erreur lors de la désactivation 2FA' });
    }
  }

  /**
   * Vérifie un token 2FA lors de la connexion
   */
  async verifyLogin(req, res) {
    try {
      const { token, tempToken } = req.body;

      if (!token || !tempToken) {
        return res.status(400).json({ message: 'Token et token temporaire requis' });
      }

      // Vérifier et décoder le token temporaire
      let decoded;
      try {
        decoded = jwt.verify(tempToken, process.env.JWT_SECRET_KEY);
      } catch (error) {
        return res.status(401).json({ message: 'Token temporaire invalide ou expiré' });
      }

      const userId = decoded.userId;

      // Récupérer le secret 2FA
      const secret = await twoFactorAuthService.getTwoFactorSecret(userId);
      if (!secret) {
        return res.status(400).json({ message: 'Secret 2FA non trouvé' });
      }

      // Vérifier le token 2FA
      const isValid = twoFactorAuthService.verifyToken(secret, token);
      if (!isValid) {
        return res.status(400).json({ message: 'Code 2FA invalide' });
      }

      // Générer un JWT complet
      const user = await prisma.users.findUnique({
        where: { id: userId }
      });

      const fullToken = jwt.sign({
        userId: user.id,
        isAdmin: user.is_admin || false
      }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

      // Configurer le cookie HTTP-only
      res.cookie('jwt_token', fullToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000 // 1 heure
      });

      return res.status(200).json({
        message: 'Authentification 2FA réussie',
        data: {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            isAdmin: user.is_admin || false
          },
          token: fullToken
        }
      });
    } catch (error) {
      console.error('Erreur lors de la vérification 2FA:', error);
      return res.status(500).json({ message: 'Erreur lors de la vérification 2FA' });
    }
  }
}

module.exports = new TwoFactorAuthController();
