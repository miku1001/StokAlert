const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
});

module.exports = pool;


pool.query('SELECT NOW()', (err, res) =>{
  if (err) {
    console.log(`Connection Error: ${err}`);
  } else {
    console.log('Connected Current time:', res.rows[0]);
  }
})
