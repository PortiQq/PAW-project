const { Pool } = require('pg');

const pool = new Pool({
  user: 'test',
  password: 'test',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'PAW'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};