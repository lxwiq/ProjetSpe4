// src/services/document-service.js
const { pool } = require('../../config/database');

class DocumentService {
  async getAllDocuments() {
    const result = await pool.query('SELECT * FROM documents');
    return result.rows;
  }
}

module.exports = new DocumentService();