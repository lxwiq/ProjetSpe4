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

  async updateUser(id, username, email, full_name, password) {
    const password_hash = await bcrypt.hash(password, saltRounds);
    return await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        username,
        email,
        full_name,
        password_hash
      }
    });
  }
}

module.exports = new UserService();
