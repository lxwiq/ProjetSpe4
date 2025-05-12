const { pool } = require('../../config/database');
const bcrypt = require('bcrypt');
const saltRounds = 12;

class UserService {
  async getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  async getUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createUser(username, email, full_name, password) {
    const password_hash = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      'INSERT INTO users (username, email, full_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, full_name, password_hash]
    );
    return result.rows[0];
  }

  async updateUser(id, username, email, full_name, password) {
    const password_hash = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, full_name = $3, password_hash=$4 WHERE id = $5 RETURNING *',
      [username, email, full_name, password_hash, id]
    );
    return result.rows[0];
  }
}

module.exports = new UserService();