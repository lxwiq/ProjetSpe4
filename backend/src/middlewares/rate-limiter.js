/**
 * Middleware de limitation de taux de requêtes
 * Protège contre les attaques par force brute et le spam
 */
const rateLimit = require('express-rate-limit');
const { ApiError } = require('./error-handler');

// Limiter pour les routes d'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 tentatives par fenêtre
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Ne compte pas les requêtes réussies
  handler: (req, res, next, options) => {
    throw new ApiError(
      429,
      'Trop de tentatives de connexion. Veuillez réessayer plus tard.',
      { retryAfter: Math.ceil(options.windowMs / 1000 / 60) + ' minutes' }
    );
  }
});

// Limiter pour les routes API générales
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // 100 requêtes par fenêtre
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    throw new ApiError(
      429,
      'Trop de requêtes. Veuillez réessayer plus tard.',
      { retryAfter: Math.ceil(options.windowMs / 1000 / 60) + ' minutes' }
    );
  }
});

// Limiter pour les routes sensibles (création de compte, réinitialisation de mot de passe, etc.)
const sensitiveRoutesLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // 5 requêtes par fenêtre
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    throw new ApiError(
      429,
      'Trop de requêtes pour cette opération sensible. Veuillez réessayer plus tard.',
      { retryAfter: Math.ceil(options.windowMs / 1000 / 60) + ' minutes' }
    );
  }
});

module.exports = {
  authLimiter,
  apiLimiter,
  sensitiveRoutesLimiter
};
