require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
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

// Import WebSocket manager
const SocketManager = require('./src/websockets/socket-manager');


// Middleware
const verifyToken = require('./src/middlewares/jwt.js');
app.use(cors({
  origin: 'http://localhost:4200', // URL de votre frontend Angular
  credentials: true // Permet l'envoi de cookies
}));
app.use(express.json());
app.use(cookieParser());

// Mount Routes
app.use('/users', verifyToken, userRoutes);
app.use('/documents', verifyToken, documentRoutes);
app.use('/collaborative-documents', verifyToken, collaborativeDocumentRoutes);
app.use('/messaging', messagingRoutes); // verifyToken est déjà inclus dans les routes
app.use('/notifications', notificationRoutes); // verifyToken est déjà inclus dans les routes
app.use('/login', authRoutes);
app.use('/admin', adminRoutes); // Pas besoin de verifyToken car il est déjà inclus dans les routes

// Initialiser le gestionnaire de WebSockets
const socketManager = new SocketManager(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});