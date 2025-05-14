/**
 * Configuration Redis pour le cache et les sessions
 */
const Redis = require('ioredis');
const { ApiError } = require('../middlewares/error-handler');

// Configuration Redis à partir des variables d'environnement
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || null;
const REDIS_TLS = process.env.REDIS_TLS === 'true';

// Options de connexion
const redisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  retryStrategy: (times) => {
    // Stratégie de reconnexion: 1s, 2s, 3s, etc. jusqu'à 30s max
    const delay = Math.min(times * 1000, 30000);
    return delay;
  },
  maxRetriesPerRequest: 3,
  enableReadyCheck: true
};

// Ajouter TLS si nécessaire
if (REDIS_TLS) {
  redisOptions.tls = {};
}

// Créer le client Redis
const redisClient = new Redis(redisOptions);

// Gestion des événements
redisClient.on('connect', () => {
  console.log('Connexion à Redis établie');
});

redisClient.on('ready', () => {
  console.log('Client Redis prêt');
});

redisClient.on('error', (err) => {
  console.error('Erreur Redis:', err);
});

redisClient.on('close', () => {
  console.warn('Connexion Redis fermée');
});

redisClient.on('reconnecting', () => {
  console.log('Tentative de reconnexion à Redis...');
});

// Fonction pour vérifier l'état de Redis
const checkRedisHealth = async () => {
  try {
    const ping = await redisClient.ping();
    return ping === 'PONG';
  } catch (error) {
    console.error('Erreur lors du ping Redis:', error);
    return false;
  }
};

// Fonction de fallback en cas d'indisponibilité de Redis
const getRedisOrFallback = async (key, fallbackFn) => {
  try {
    const cachedValue = await redisClient.get(key);
    if (cachedValue) {
      return JSON.parse(cachedValue);
    }
    
    // Si pas de valeur en cache, utiliser la fonction de fallback
    const result = await fallbackFn();
    
    // Mettre en cache pour la prochaine fois
    try {
      await redisClient.set(key, JSON.stringify(result));
    } catch (cacheError) {
      console.error('Erreur lors de la mise en cache:', cacheError);
    }
    
    return result;
  } catch (error) {
    console.error(`Erreur Redis pour la clé ${key}:`, error);
    // Utiliser directement la fonction de fallback en cas d'erreur
    return fallbackFn();
  }
};

module.exports = {
  redisClient,
  checkRedisHealth,
  getRedisOrFallback
};
