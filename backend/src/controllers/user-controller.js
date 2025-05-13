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
      const users = await userService.updateUser();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur' });
    }
  }
}

module.exports = new UserController();