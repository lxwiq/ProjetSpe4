// src/services/admin-service.js
const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');

class AdminService {
  /**
   * Crée un nouvel utilisateur (par un administrateur)
   * @param {Object} userData - Données de l'utilisateur à créer
   * @returns {Object} - L'utilisateur créé
   */
  async createUser(userData) {
    const { username, email, password, full_name, is_admin = false } = userData;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      throw new Error('Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà');
    }

    // Hacher le mot de passe
    const saltRounds = 12; // Salt plus sécurisé
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Créer l'utilisateur
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password_hash,
        full_name,
        is_admin,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    // Ne pas renvoyer le hash du mot de passe
    const { password_hash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  /**
   * Désactive un compte utilisateur
   * @param {number} userId - ID de l'utilisateur à désactiver
   * @returns {Object} - L'utilisateur mis à jour
   */
  async deactivateUser(userId) {
    // Vérifier si l'utilisateur existe
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(userId) },
      data: {
        is_active: false,
        updated_at: new Date()
      }
    });

    return updatedUser;
  }

  /**
   * Réactive un compte utilisateur
   * @param {number} userId - ID de l'utilisateur à réactiver
   * @returns {Object} - L'utilisateur mis à jour
   */
  async activateUser(userId) {
    // Vérifier si l'utilisateur existe
    const user = await prisma.users.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.users.update({
      where: { id: parseInt(userId) },
      data: {
        is_active: true,
        updated_at: new Date()
      }
    });

    return updatedUser;
  }

  /**
   * Récupère tous les utilisateurs (pour les administrateurs)
   * @returns {Array} - Liste des utilisateurs
   */
  async getAllUsers() {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        is_admin: true,
        is_active: true,
        created_at: true,
        updated_at: true,
        last_login: true
      }
    });

    return users;
  }
}

module.exports = new AdminService();
