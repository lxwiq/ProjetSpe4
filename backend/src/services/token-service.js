/**
 * Service de gestion des tokens JWT
 * Implémente la rotation des tokens pour une sécurité renforcée
 */
const jwt = require('jsonwebtoken');
const { ApiError } = require('../middlewares/error-handler');

class TokenService {
  /**
   * Génère un nouveau token d'accès
   * @param {Object} payload - Données à inclure dans le token
   * @param {string} expiresIn - Durée de validité du token (ex: '1h', '15m')
   * @returns {string} - Token JWT
   */
  generateAccessToken(payload, expiresIn = '15m') {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
  }

  /**
   * Génère un token de rafraîchissement
   * @param {Object} payload - Données à inclure dans le token
   * @param {string} expiresIn - Durée de validité du token (ex: '7d', '30d')
   * @returns {string} - Token JWT
   */
  generateRefreshToken(payload, expiresIn = '7d') {
    // Utiliser un secret différent pour les refresh tokens
    const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY || process.env.JWT_SECRET_KEY + '_refresh';
    return jwt.sign(payload, refreshSecret, { expiresIn });
  }

  /**
   * Vérifie un token d'accès
   * @param {string} token - Token JWT à vérifier
   * @returns {Object} - Payload décodé
   * @throws {ApiError} - Si le token est invalide ou expiré
   */
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiError(401, 'Token expiré', { expired: true });
      }
      throw new ApiError(401, 'Token invalide');
    }
  }

  /**
   * Vérifie un token de rafraîchissement
   * @param {string} token - Token JWT à vérifier
   * @returns {Object} - Payload décodé
   * @throws {ApiError} - Si le token est invalide ou expiré
   */
  verifyRefreshToken(token) {
    try {
      const refreshSecret = process.env.JWT_REFRESH_SECRET_KEY || process.env.JWT_SECRET_KEY + '_refresh';
      return jwt.verify(token, refreshSecret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiError(401, 'Token de rafraîchissement expiré', { expired: true });
      }
      throw new ApiError(401, 'Token de rafraîchissement invalide');
    }
  }

  /**
   * Génère une paire de tokens (accès + rafraîchissement)
   * @param {Object} payload - Données à inclure dans les tokens
   * @returns {Object} - Paire de tokens { accessToken, refreshToken }
   */
  generateTokenPair(payload) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    
    return {
      accessToken,
      refreshToken
    };
  }

  /**
   * Rafraîchit un token d'accès à partir d'un token de rafraîchissement
   * @param {string} refreshToken - Token de rafraîchissement
   * @returns {Object} - Nouveau token d'accès et payload
   * @throws {ApiError} - Si le token de rafraîchissement est invalide
   */
  refreshAccessToken(refreshToken) {
    const payload = this.verifyRefreshToken(refreshToken);
    
    // Supprimer les champs spécifiques au token de rafraîchissement
    const { iat, exp, ...restPayload } = payload;
    
    // Générer un nouveau token d'accès
    const newAccessToken = this.generateAccessToken(restPayload);
    
    return {
      accessToken: newAccessToken,
      payload: restPayload
    };
  }
}

module.exports = new TokenService();
