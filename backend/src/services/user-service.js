const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const saltRounds = 12;

class UserService {
  async getAllUsers() {
    return await prisma.users.findMany();
  }

  async getUserById(id) {
    return await prisma.users.findUnique({
      where: { id: parseInt(id) }
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
