require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// Import Routes
const userRoutes = require('./src/routes/user-routes');
const documentRoutes = require('./src/routes/document-routes');
const authRoutes = require('./src/authentification/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/users', userRoutes);
app.use('/documents', documentRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});