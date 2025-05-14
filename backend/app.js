require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const http = require('http');
const { setupSwagger } = require('./src/config/swagger');
const app = express();
const server = http.createServer(app);

// Import Routes
const userRoutes = require('./src/routes/user-routes');
const documentRoutes = require('./src/routes/document-routes');
const collaborativeDocumentRoutes = require('./src/routes/collaborative-document-routes');
const messagingRoutes = require('./src/routes/messaging-routes');
const notificationRoutes = require('./src/routes/notification-routes');
const authRoutes = require('./src/authentification/auth');
const adminRoutes = require('./src/routes/admin-routes');
const twoFactorRoutes = require('./src/routes/2fa-routes');
const tokenRoutes = require('./src/routes/token-routes');

// Import WebSocket manager
const SocketManager = require('./src/websockets/socket-manager');


// Middleware
const verifyToken = require('./src/middlewares/jwt.js');
const { authLimiter, apiLimiter } = require('./src/middlewares/rate-limiter');

// Configuration de Helmet pour la sécurité
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'", "ws:", "wss:"],
      imgSrc: ["'self'", "data:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "data:"]
    }
  },
  crossOriginEmbedderPolicy: false, // Nécessaire pour les WebSockets
  crossOriginResourcePolicy: { policy: "cross-origin" } // Nécessaire pour les ressources externes
}));

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:4202', 'http://localhost:4203'], // URLs de votre frontend Angular
  credentials: true // Permet l'envoi de cookies
}));
app.use(express.json());
app.use(cookieParser());

// Servir les fichiers statiques
app.use('/uploads', express.static('src/uploads'));
app.use('/uploads/profile_pictures', express.static('src/uploads/profile_pictures'));

// Appliquer le rate limiter global à toutes les routes API
app.use(apiLimiter);

// Mount Routes
app.use('/users', verifyToken, userRoutes);
app.use('/documents', verifyToken, documentRoutes);
app.use('/collaborative-documents', verifyToken, collaborativeDocumentRoutes);
app.use('/messaging', messagingRoutes); // verifyToken est déjà inclus dans les routes
app.use('/notifications', notificationRoutes); // verifyToken est déjà inclus dans les routes
// Appliquer le rate limiter aux routes d'authentification
app.use('/login', authLimiter, authRoutes);
app.use('/auth', authLimiter, authRoutes);
app.use('/2fa', authLimiter, twoFactorRoutes); // Certaines routes 2FA nécessitent verifyToken, d'autres non
app.use('/admin', adminRoutes); // Pas besoin de verifyToken car il est déjà inclus dans les routes
app.use('/token', authLimiter, tokenRoutes); // Routes pour la gestion des tokens

// Initialiser le gestionnaire de WebSockets
const socketManager = new SocketManager(server);

// Configurer Swagger
setupSwagger(app);

// Importer les middlewares de gestion d'erreurs
const { errorHandler, notFoundHandler } = require('./src/middlewares/error-handler');

// Middleware pour les routes non trouvées (doit être après toutes les routes)
app.use(notFoundHandler);

// Middleware de gestion d'erreurs (doit être le dernier middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});