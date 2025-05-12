// src/controllers/admin-controller.js
const adminService = require('../services/admin-service');

class AdminController {
  /**
   * Crée un nouvel utilisateur (par un administrateur)
   */
  async createUser(req, res) {
    try {
      const userData = req.body;
      
      if (!userData.username || !userData.email || !userData.password) {
        return res.status(400).json({
          message: 'Les champs username, email et password sont obligatoires'
        });
      }
      
      const newUser = await adminService.createUser(userData);
      
      return res.status(201).json({
        message: 'Utilisateur créé avec succès',
        data: newUser
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erreur lors de la création de l\'utilisateur',
        error: err.message
      });
    }
  }

  /**
   * Désactive un compte utilisateur
   */
  async deactivateUser(req, res) {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          message: 'L\'ID de l\'utilisateur est requis'
        });
      }
      
      const updatedUser = await adminService.deactivateUser(userId);
      
      return res.status(200).json({
        message: 'Compte utilisateur désactivé avec succès',
        data: updatedUser
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erreur lors de la désactivation du compte utilisateur',
        error: err.message
      });
    }
  }

  /**
   * Réactive un compte utilisateur
   */
  async activateUser(req, res) {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          message: 'L\'ID de l\'utilisateur est requis'
        });
      }
      
      const updatedUser = await adminService.activateUser(userId);
      
      return res.status(200).json({
        message: 'Compte utilisateur réactivé avec succès',
        data: updatedUser
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erreur lors de la réactivation du compte utilisateur',
        error: err.message
      });
    }
  }

  /**
   * Récupère tous les utilisateurs
   */
  async getAllUsers(req, res) {
    try {
      const users = await adminService.getAllUsers();
      
      return res.status(200).json({
        message: 'Liste des utilisateurs récupérée avec succès',
        data: users
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erreur lors de la récupération des utilisateurs',
        error: err.message
      });
    }
  }
}

module.exports = new AdminController();
