// src/controllers/user-controller.js
const userService = require('../services/user-service');

class UserController {
  async getAllUsers(req, res) {
    try {
      
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
  }
   async ModifyUsers(req, res) {
    try {
      const users = await userService.updateUser();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }   
    
}


}

module.exports = new UserController();