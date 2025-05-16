/**
 * Tests pour le service utilisateur
 */
const userService = require('../../src/services/user-service');
const bcrypt = require('bcrypt');

// Mock pour Prisma
jest.mock('../../src/lib/prisma', () => {
  return {
    users: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({})
    }
  };
});

// Mock pour bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true)
}));

describe('UserService', () => {
  beforeEach(() => {
    // Réinitialiser les mocks
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('devrait récupérer tous les utilisateurs', async () => {
      // Arrange
      const mockUsers = [
        {
          id: 1,
          username: 'user1',
          email: 'user1@example.com',
          full_name: 'User One',
          profile_picture: null,
          is_active: true,
          is_admin: false
        },
        {
          id: 2,
          username: 'user2',
          email: 'user2@example.com',
          full_name: 'User Two',
          profile_picture: null,
          is_active: true,
          is_admin: false
        }
      ];

      prisma.users.findMany.mockResolvedValue(mockUsers);

      // Act
      const result = await userService.getAllUsers();

      // Assert
      expect(prisma.users.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          username: true,
          email: true,
          full_name: true,
          profile_picture: true,
          is_active: true,
          is_admin: true
        }
      });

      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('devrait récupérer un utilisateur par son ID', async () => {
      // Arrange
      const userId = 1;
      const mockUser = {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        full_name: 'User One',
        profile_picture: null,
        is_active: true,
        is_admin: false
      };

      prisma.users.findUnique.mockResolvedValue(mockUser);

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          full_name: true,
          profile_picture: true,
          is_active: true,
          is_admin: true,
          two_factor_enabled: true
        }
      });

      expect(result).toEqual(mockUser);
    });

    it('devrait retourner null si l\'utilisateur n\'existe pas', async () => {
      // Arrange
      const userId = 999;

      prisma.users.findUnique.mockResolvedValue(null);

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('devrait mettre à jour les informations d\'un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const updateData = {
        full_name: 'Updated Name',
        username: 'updated_user'
      };

      const mockUpdatedUser = {
        id: 1,
        username: 'updated_user',
        email: 'user1@example.com',
        full_name: 'Updated Name',
        profile_picture: null,
        is_active: true,
        is_admin: false
      };

      prisma.users.update.mockResolvedValue(mockUpdatedUser);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          username: true,
          email: true,
          full_name: true,
          profile_picture: true,
          is_active: true,
          is_admin: true
        }
      });

      expect(result).toEqual(mockUpdatedUser);
    });

    it('devrait mettre à jour le mot de passe d\'un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const updateData = {
        password: 'newPassword123'
      };

      const hashedPassword = 'hashed_password';
      bcrypt.hash.mockResolvedValue(hashedPassword);

      const mockUpdatedUser = {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        full_name: 'User One',
        profile_picture: null,
        is_active: true,
        is_admin: false
      };

      prisma.users.update.mockResolvedValue(mockUpdatedUser);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword123', expect.any(Number));
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          password_hash: hashedPassword
        },
        select: {
          id: true,
          username: true,
          email: true,
          full_name: true,
          profile_picture: true,
          is_active: true,
          is_admin: true
        }
      });

      expect(result).toEqual(mockUpdatedUser);
    });
  });

  describe('getUsersByIds', () => {
    it('devrait récupérer plusieurs utilisateurs par leurs IDs', async () => {
      // Arrange
      const userIds = [1, 2];
      const mockUsers = [
        {
          id: 1,
          username: 'user1',
          email: 'user1@example.com',
          full_name: 'User One',
          profile_picture: null
        },
        {
          id: 2,
          username: 'user2',
          email: 'user2@example.com',
          full_name: 'User Two',
          profile_picture: null
        }
      ];

      prisma.users.findMany.mockResolvedValue(mockUsers);

      // Act
      const result = await userService.getUsersByIds(userIds);

      // Assert
      expect(prisma.users.findMany).toHaveBeenCalledWith({
        where: {
          id: {
            in: userIds
          }
        },
        select: {
          id: true,
          username: true,
          email: true,
          full_name: true,
          profile_picture: true
        }
      });

      expect(result).toEqual(mockUsers);
    });
  });

  describe('updateProfilePicture', () => {
    it('devrait mettre à jour la photo de profil d\'un utilisateur', async () => {
      // Arrange
      const userId = 1;
      const picturePath = '/uploads/profile_pictures/user1.jpg';

      const mockUpdatedUser = {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        full_name: 'User One',
        profile_picture: picturePath,
        is_active: true,
        is_admin: false
      };

      prisma.users.update.mockResolvedValue(mockUpdatedUser);

      // Act
      const result = await userService.updateProfilePicture(userId, picturePath);

      // Assert
      expect(prisma.users.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          profile_picture: picturePath
        },
        select: {
          id: true,
          username: true,
          email: true,
          full_name: true,
          profile_picture: true
        }
      });

      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
