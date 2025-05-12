// backend/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'collaborative_docs',
    password: 'root',
    port: 5432,
});

module.exports = {
    pool: pool,
};
