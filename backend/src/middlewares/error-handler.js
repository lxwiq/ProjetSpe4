/**
 * Middleware de gestion d'erreurs centralisé
 * Standardise les réponses d'erreur de l'API
 */

// Classe d'erreur personnalisée pour les erreurs API
class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, details = null) {
    return new ApiError(400, message, details);
  }

  static unauthorized(message = 'Non autorisé', details = null) {
    return new ApiError(401, message, details);
  }

  static forbidden(message = 'Accès refusé', details = null) {
    return new ApiError(403, message, details);
  }

  static notFound(message = 'Ressource non trouvée', details = null) {
    return new ApiError(404, message, details);
  }

  static conflict(message, details = null) {
    return new ApiError(409, message, details);
  }

  static tooMany(message = 'Trop de requêtes', details = null) {
    return new ApiError(429, message, details);
  }

  static internal(message = 'Erreur interne du serveur', details = null) {
    return new ApiError(500, message, details);
  }
}

// Middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
  console.error('Erreur capturée par le middleware:', err);

  // Si l'erreur est une instance de ApiError, utiliser ses propriétés
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      code: err.statusCode,
      message: err.message,
      details: err.details
    });
  }

  // Gérer les erreurs Prisma
  if (err.name === 'PrismaClientKnownRequestError') {
    // Erreurs de contrainte unique (P2002)
    if (err.code === 'P2002') {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Conflit avec une ressource existante',
        details: {
          fields: err.meta?.target || []
        }
      });
    }
    
    // Ressource non trouvée (P2001, P2018, P2025)
    if (['P2001', 'P2018', 'P2025'].includes(err.code)) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Ressource non trouvée',
        details: {
          error: err.message
        }
      });
    }
  }

  // Gérer les erreurs de validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Erreur de validation',
      details: err.details || err.message
    });
  }

  // Gérer les erreurs JWT
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Erreur d\'authentification',
      details: err.message
    });
  }

  // Erreur par défaut (500 Internal Server Error)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Une erreur inattendue s\'est produite';
  
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: process.env.NODE_ENV === 'production' ? 'Erreur interne du serveur' : message,
    details: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

// Middleware pour capturer les erreurs asynchrones
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware pour les routes non trouvées
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route non trouvée: ${req.originalUrl}`);
  next(error);
};

module.exports = {
  ApiError,
  errorHandler,
  asyncHandler,
  notFoundHandler
};
