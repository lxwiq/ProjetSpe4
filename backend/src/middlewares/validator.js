/**
 * Middleware de validation des entrées utilisateur
 * Permet de valider les données de requête (body, params, query) selon des schémas définis
 */
const { ApiError } = require('./error-handler');

/**
 * Crée un middleware de validation pour les données de requête
 * @param {Object} schema - Schéma de validation avec des propriétés pour 'body', 'params', et/ou 'query'
 * @returns {Function} Middleware Express
 */
const validate = (schema) => {
  return (req, res, next) => {
    const errors = {};

    // Valider le corps de la requête
    if (schema.body) {
      const { error: bodyError, value: validatedBody } = validateData(req.body, schema.body);
      if (bodyError) {
        errors.body = bodyError;
      } else {
        req.body = validatedBody;
      }
    }

    // Valider les paramètres de route
    if (schema.params) {
      const { error: paramsError, value: validatedParams } = validateData(req.params, schema.params);
      if (paramsError) {
        errors.params = paramsError;
      } else {
        req.params = validatedParams;
      }
    }

    // Valider les paramètres de requête
    if (schema.query) {
      const { error: queryError, value: validatedQuery } = validateData(req.query, schema.query);
      if (queryError) {
        errors.query = queryError;
      } else {
        req.query = validatedQuery;
      }
    }

    // S'il y a des erreurs, les renvoyer
    if (Object.keys(errors).length > 0) {
      return next(new ApiError(400, 'Erreur de validation', errors));
    }

    next();
  };
};

/**
 * Valide des données selon un schéma
 * @param {Object} data - Données à valider
 * @param {Object} schema - Schéma de validation
 * @returns {Object} Résultat de la validation { error, value }
 */
function validateData(data, schema) {
  const result = { value: data };
  const errors = [];

  // Parcourir toutes les propriétés du schéma
  for (const [field, rules] of Object.entries(schema)) {
    // Vérifier si le champ est requis
    if (rules.required && (data[field] === undefined || data[field] === null)) {
      errors.push({ field, message: `Le champ '${field}' est requis` });
      continue;
    }

    // Si le champ n'est pas présent et n'est pas requis, passer à la propriété suivante
    if (data[field] === undefined || data[field] === null) {
      continue;
    }

    // Convertir automatiquement en entier si le type attendu est 'integer' et que la valeur est une chaîne numérique
    if (rules.type === 'integer' && typeof data[field] === 'string' && /^\d+$/.test(data[field])) {
      data[field] = parseInt(data[field], 10);
    }

    // Vérifier le type
    if (rules.type && !checkType(data[field], rules.type)) {
      errors.push({ field, message: `Le champ '${field}' doit être de type ${rules.type}` });
      continue;
    }

    // Vérifier la longueur minimale (pour les chaînes et les tableaux)
    if (rules.minLength !== undefined &&
        (typeof data[field] === 'string' || Array.isArray(data[field])) &&
        data[field].length < rules.minLength) {
      errors.push({ field, message: `Le champ '${field}' doit avoir au moins ${rules.minLength} caractères` });
    }

    // Vérifier la longueur maximale (pour les chaînes et les tableaux)
    if (rules.maxLength !== undefined &&
        (typeof data[field] === 'string' || Array.isArray(data[field])) &&
        data[field].length > rules.maxLength) {
      errors.push({ field, message: `Le champ '${field}' doit avoir au plus ${rules.maxLength} caractères` });
    }

    // Vérifier la valeur minimale (pour les nombres)
    if (rules.min !== undefined && typeof data[field] === 'number' && data[field] < rules.min) {
      errors.push({ field, message: `Le champ '${field}' doit être supérieur ou égal à ${rules.min}` });
    }

    // Vérifier la valeur maximale (pour les nombres)
    if (rules.max !== undefined && typeof data[field] === 'number' && data[field] > rules.max) {
      errors.push({ field, message: `Le champ '${field}' doit être inférieur ou égal à ${rules.max}` });
    }

    // Vérifier le pattern (pour les chaînes)
    if (rules.pattern && typeof data[field] === 'string' && !rules.pattern.test(data[field])) {
      errors.push({ field, message: rules.patternMessage || `Le champ '${field}' ne correspond pas au format attendu` });
    }

    // Vérifier les valeurs autorisées
    if (rules.enum && !rules.enum.includes(data[field])) {
      errors.push({ field, message: `Le champ '${field}' doit être l'une des valeurs suivantes: ${rules.enum.join(', ')}` });
    }

    // Vérifier les validations personnalisées
    if (rules.validate && typeof rules.validate === 'function') {
      const validationResult = rules.validate(data[field], data);
      if (validationResult !== true) {
        errors.push({ field, message: validationResult || `Le champ '${field}' est invalide` });
      }
    }
  }

  // S'il y a des erreurs, les renvoyer
  if (errors.length > 0) {
    result.error = errors;
  }

  return result;
}

/**
 * Vérifie si une valeur correspond au type spécifié
 * @param {*} value - Valeur à vérifier
 * @param {string} type - Type attendu ('string', 'number', 'boolean', 'array', 'object')
 * @returns {boolean} Vrai si la valeur correspond au type
 */
function checkType(value, type) {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return Array.isArray(value);
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'integer':
      return Number.isInteger(value);
    case 'email':
      return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    default:
      return true;
  }
}

// Schémas de validation courants
const schemas = {
  // Schéma pour l'authentification
  login: {
    body: {
      email: { required: true, type: 'email' },
      password: { required: true, type: 'string', minLength: 6 }
    }
  },

  // Schéma pour la création d'un document
  createDocument: {
    body: {
      title: { required: true, type: 'string', minLength: 1, maxLength: 255 },
      content: { type: 'string' },
      parentFolderId: { type: 'integer' },
      isFolder: { type: 'boolean' }
    }
  },

  // Schéma pour la mise à jour d'un document
  updateDocument: {
    params: {
      id: { required: true, type: 'integer' }
    },
    body: {
      title: { type: 'string', maxLength: 255 },
      content: { type: 'string' }
    }
  },

  // Schéma pour l'invitation à collaborer
  inviteCollaborator: {
    params: {
      id: { required: true, type: 'integer' }
    },
    body: {
      invitedUserId: { required: true, type: 'integer' },
      permissionLevel: { type: 'string', enum: ['read', 'write', 'admin'], default: 'read' }
    }
  },

  // Schéma pour le rafraîchissement de token
  refreshToken: {
    body: {
      refreshToken: { required: true, type: 'string' }
    }
  },

  // Schéma pour la mise à jour du profil utilisateur
  updateUserProfile: {
    body: {
      username: { type: 'string', minLength: 3, maxLength: 50 },
      email: { type: 'email', maxLength: 100 },
      full_name: { type: 'string', maxLength: 100 },
      password: { type: 'string', minLength: 6, maxLength: 255 }
    }
  },

  // Schéma pour la mise à jour de la photo de profil
  updateProfilePicture: {
    body: {
      // Pas de validation ici car le fichier est géré par multer
    }
  }
};

module.exports = {
  validate,
  schemas
};
