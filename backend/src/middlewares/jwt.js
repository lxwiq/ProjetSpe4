// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Vérifier d'abord si le token est dans le cookie
  const tokenFromCookie = req.cookies.jwt_token;

  // Si pas de cookie, vérifier dans l'en-tête Authorization (pour la compatibilité)
  const authHeader = req.headers['authorization'];
  let token = tokenFromCookie;

  if (!token && authHeader) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).send('Authentication token missing');
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    req.userId = decoded.userId; // Attach the user ID to the request object
    req.isAdmin = decoded.isAdmin; // Attach the admin status to the request object
    next(); // Call the next middleware or route handler
  });
};

module.exports = verifyToken;