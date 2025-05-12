// backend/src/middlewares/admin.js

/**
 * Middleware pour vérifier si l'utilisateur est un administrateur
 * Ce middleware doit être utilisé après le middleware verifyToken
 */
const isAdmin = (req, res, next) => {
  // Le statut d'administrateur est déjà attaché à la requête par le middleware verifyToken
  if (req.isAdmin !== true) {
    return res.status(403).json({ 
      message: 'Accès refusé: privilèges d\'administrateur requis'
    });
  }
  
  // Si l'utilisateur est un administrateur, passer au middleware/route suivant
  next();
};

module.exports = isAdmin;
