/**
 * Middleware de cache Redis pour les requêtes API
 */
const { redisClient } = require('../config/redis');
const { ApiError } = require('./error-handler');

// TTL par défaut pour le cache (en secondes)
const DEFAULT_TTL = 60; // 1 minute

// TTL spécifiques par route
const CACHE_TTL = {
  '/documents': 300, // 5 minutes
  '/users': 600,     // 10 minutes
  // Ajouter d'autres routes selon les besoins
};

/**
 * Génère une clé de cache basée sur l'URL, les paramètres et l'utilisateur
 * @param {Object} req - Requête Express
 * @returns {string} Clé de cache
 */
const generateCacheKey = (req) => {
  const userId = req.userId || 'anonymous';
  const queryString = Object.keys(req.query).length 
    ? JSON.stringify(req.query) 
    : '';
  
  return `cache:${req.baseUrl}${req.path}:${userId}:${queryString}`;
};

/**
 * Middleware de cache pour les requêtes GET
 * @param {number} ttl - Durée de vie du cache en secondes (optionnel)
 * @returns {Function} Middleware Express
 */
const cacheMiddleware = (ttl) => {
  return async (req, res, next) => {
    // Ne pas mettre en cache les requêtes non-GET
    if (req.method !== 'GET') {
      return next();
    }

    // Générer la clé de cache
    const cacheKey = generateCacheKey(req);
    
    try {
      // Vérifier si la réponse est en cache
      const cachedResponse = await redisClient.get(cacheKey);
      
      if (cachedResponse) {
        const parsedResponse = JSON.parse(cachedResponse);
        return res.status(200).json(parsedResponse);
      }
      
      // Si pas en cache, intercepter la réponse pour la mettre en cache
      const originalSend = res.send;
      res.send = function(body) {
        // Ne mettre en cache que les réponses réussies
        if (res.statusCode === 200) {
          // Déterminer le TTL à utiliser
          const cacheTTL = ttl || CACHE_TTL[req.baseUrl] || DEFAULT_TTL;
          
          // Mettre en cache la réponse
          try {
            const responseBody = JSON.parse(body);
            redisClient.set(cacheKey, body, 'EX', cacheTTL);
          } catch (error) {
            console.error('Erreur lors de la mise en cache:', error);
          }
        }
        
        // Continuer avec la réponse originale
        originalSend.call(this, body);
      };
      
      next();
    } catch (error) {
      console.error('Erreur lors de l\'accès au cache:', error);
      // Continuer sans cache en cas d'erreur
      next();
    }
  };
};

/**
 * Invalide le cache pour une route spécifique
 * @param {string} route - Route à invalider
 * @param {number} userId - ID de l'utilisateur (optionnel)
 */
const invalidateCache = async (route, userId = null) => {
  try {
    const pattern = userId 
      ? `cache:${route}:${userId}:*` 
      : `cache:${route}:*`;
    
    // Trouver toutes les clés correspondant au pattern
    const keys = await redisClient.keys(pattern);
    
    if (keys.length > 0) {
      // Supprimer toutes les clés trouvées
      await redisClient.del(...keys);
      console.log(`Cache invalidé pour ${pattern}, ${keys.length} clés supprimées`);
    }
  } catch (error) {
    console.error('Erreur lors de l\'invalidation du cache:', error);
  }
};

/**
 * Middleware pour invalider le cache après une modification
 * @param {string} route - Route à invalider
 * @returns {Function} Middleware Express
 */
const invalidateCacheMiddleware = (route) => {
  return async (req, res, next) => {
    // Exécuter le handler de route d'abord
    next();
    
    // Après la réponse, invalider le cache si la requête a réussi
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        invalidateCache(route, req.userId);
      }
    });
  };
};

module.exports = {
  cacheMiddleware,
  invalidateCache,
  invalidateCacheMiddleware
};
