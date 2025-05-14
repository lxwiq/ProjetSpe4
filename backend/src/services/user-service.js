const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const saltRounds = 12;

class UserService {
  async getAllUsers() {
    return await prisma.users.findMany({
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
  }

  async getUserById(id) {
    return await prisma.users.findUnique({
      where: { id: parseInt(id) },
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
  }

  /**
   * Récupère plusieurs utilisateurs par leurs IDs
   * @param {number[]} ids - Tableau d'IDs d'utilisateurs
   * @returns {Promise<Array>} - Liste des utilisateurs
   */
  async getUsersByIds(ids) {
    return await prisma.users.findMany({
      where: {
        id: {
          in: ids
        },
        is_active: true
      },
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        profile_picture: true
      }
    });
  }

  async searchUsers(query) {
    return await prisma.users.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { full_name: { contains: query, mode: 'insensitive' } }
        ],
        is_active: true
      },
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        profile_picture: true
      },
      take: 10
    });
  }

  async createUser(username, email, full_name, password) {
    const password_hash = await bcrypt.hash(password, saltRounds);
    return await prisma.users.create({
      data: {
        username,
        email,
        full_name,
        password_hash
      }
    });
  }

  async updateUser(id, userData) {
    const { username, email, full_name, password, profile_picture } = userData;

    // Prepare data object for update
    const updateData = {};

    // Only include fields that are provided
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (full_name) updateData.full_name = full_name;
    if (profile_picture) updateData.profile_picture = profile_picture;

    // Only hash password if it's provided
    if (password) {
      updateData.password_hash = await bcrypt.hash(password, saltRounds);
    }

    return await prisma.users.update({
      where: { id: parseInt(id) },
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
  }

  /**
   * Update user's profile picture
   * @param {number} id - User ID
   * @param {string} profilePicturePath - Path to the uploaded profile picture
   * @returns {Object} - Updated user data
   */
  async updateProfilePicture(id, profilePicturePath) {
    return await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        profile_picture: profilePicturePath,
        updated_at: new Date()
      },
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        profile_picture: true
      }
    });
  }
}

module.exports = new UserService();
