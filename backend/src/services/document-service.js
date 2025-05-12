// src/services/document-service.js
const { pool } = require('../../config/database');

class DocumentService {
  async getAllDocuments() {
    const result = await pool.query('SELECT * FROM documents');
    return result.rows;
  }
  async addDocument({title, content}){
    console.log(title, content); 
    const is_folder = false;
    const result = await pool.query('INSERT INTO documents (title, content) VALUES ($1, $2, $3) RETURNING *', [title, content , is_folder]);
    return result.rows[0];
  }
  async deleteDocument(id){
   
    const result = await pool.query('DELETE FROM documents WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

}

module.exports = new DocumentService();