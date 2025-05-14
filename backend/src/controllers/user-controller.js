// src/controllers/user-controller.js
const userService = require('../services/user-service');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
  }

  async searchUsers(req, res) {
    try {
      const query = req.query.q || '';
      const users = await userService.searchUsers(query);
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la recherche des utilisateurs' });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  }

  async ModifyUsers(req, res) {
    try {
      const userId = req.userId; // Get user ID from JWT middleware
      const { username, email, full_name, password } = req.body;

      // Create userData object with provided fields
      const userData = {};
      if (username) userData.username = username;
      if (email) userData.email = email;
      if (full_name) userData.full_name = full_name;
      if (password) userData.password = password;

      // Check if a file was uploaded
      if (req.file) {
        userData.profile_picture = req.file.path;
      }

      // Update user data
      const updatedUser = await userService.updateUser(userId, userData);
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur' });
    }
  }

  /**
   * Update user's profile picture
   */
  async updateProfilePicture(req, res) {
    try {
      const userId = req.userId; // Get user ID from JWT middleware

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'Aucune image n\'a été téléchargée' });
      }

      // Update profile picture
      const updatedUser = await userService.updateProfilePicture(userId, req.file.path);
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la photo de profil' });
    }
  }
}

module.exports = new UserController();