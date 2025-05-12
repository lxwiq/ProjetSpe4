// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('Authorization header missing');
  }

  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    req.userId = decoded.userId; // Attach the user ID to the request object
    next(); // Call the next middleware or route handler
  });
};

module.exports = verifyToken;