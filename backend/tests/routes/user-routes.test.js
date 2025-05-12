const request = require('supertest');
const express = require('express');
// Create mock functions for the user service
const mockGetAllUsers = jest.fn();
const mockUpdateUser = jest.fn();

// Create a mock user service
const userService = {
  getAllUsers: mockGetAllUsers,
  updateUser: mockUpdateUser
};

// Mock the user service module
jest.mock('../../src/services/user-service', () => userService);

// Mock JWT middleware
jest.mock('../../src/middlewares/jwt', () => (req, res, next) => {
  // Mock authenticated user
  req.user = { id: 1, email: 'test@example.com' };
  next();
});

// Import the app
const app = express();
app.use(express.json());
const userRoutes = require('../../src/routes/user-routes');
app.use('/users', userRoutes);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      // Mock data
      const mockUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com', full_name: 'User One' },
        { id: 2, username: 'user2', email: 'user2@example.com', full_name: 'User Two' }
      ];

      // Mock the service response
      mockGetAllUsers.mockResolvedValue(mockUsers);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
      // Mock service to throw an error
      mockGetAllUsers.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/users');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Erreur lors de la récupération des utilisateurs');
    });
  });

  describe('GET /users/modify', () => {
    it('should update user information', async () => {
      // Mock data
      const mockUpdatedUser = { 
        id: 1, 
        username: 'updatedUser', 
        email: 'updated@example.com', 
        full_name: 'Updated User' 
      };

      // Mock the service response
      mockUpdateUser.mockResolvedValue(mockUpdatedUser);

      const response = await request(app).get('/users/modify');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedUser);
      expect(mockUpdateUser).toHaveBeenCalled();
    });

    it('should return 500 if an error occurs', async () => {
      // Mock service to throw an error
      mockUpdateUser.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/users/modify');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Erreur lors de la récupération des utilisateurs');
    });
  });
});
