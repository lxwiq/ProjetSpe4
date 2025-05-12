const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Create a mock Prisma client
const mockFindUnique = jest.fn();
const prisma = {
  users: {
    findUnique: mockFindUnique
  }
};

// Mock the Prisma client module
jest.mock('../../src/lib/prisma', () => prisma);

// Create a mock for bcrypt.compare
const mockCompare = jest.fn();

// Mock bcrypt
jest.mock('bcrypt', () => ({
  compare: mockCompare
}));

// Create a mock for jwt.sign
const mockSign = jest.fn();

// Mock jwt
jest.mock('jsonwebtoken', () => ({
  sign: mockSign
}));

// Import the app
const app = express();
app.use(express.json());
const authRoutes = require('../../src/authentification/auth');
app.use('/login', authRoutes);

describe('Authentication Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /login', () => {
    it('should return 404 if user is not found', async () => {
      // Mock the prisma findUnique to return null (user not found)
      mockFindUnique.mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(response.status).toBe(404);
      expect(response.text).toBe('Utilisateur non trouvé');
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' }
      });
    });

    it('should return 401 if password is incorrect', async () => {
      // Mock the prisma findUnique to return a user
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashedpassword'
      };
      mockFindUnique.mockResolvedValue(mockUser);

      // Mock bcrypt.compare to return false (password doesn't match)
      mockCompare.mockResolvedValue(false);

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Mot de passe incorrect');
      expect(mockCompare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
    });

    it('should return 200 and token if authentication is successful', async () => {
      // Mock the prisma findUnique to return a user
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashedpassword'
      };
      mockFindUnique.mockResolvedValue(mockUser);

      // Mock bcrypt.compare to return true (password matches)
      mockCompare.mockResolvedValue(true);

      // Mock jwt.sign to return a token
      const mockToken = 'mock.jwt.token';
      mockSign.mockReturnValue(mockToken);

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'correctpassword' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Authentification réussie',
        data: {
          user: mockUser,
          token: mockToken
        }
      });
      expect(mockSign).toHaveBeenCalledWith(
        { userId: mockUser.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
    });

    it('should return 500 if an error occurs', async () => {
      // Mock the prisma findUnique to throw an error
      mockFindUnique.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Erreur lors de l\'authentification');
    });
  });
});
