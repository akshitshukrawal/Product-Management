// backend/db.js
const { Pool } = require('pg');

const pool2 = new Pool({
  user: 'postgres', // your postgres user
  host: 'localhost',
  database: 'product_db',
  password: 'Sunita@0201#', // your postgres password
  port: 9876, // adjust to your actual PostgreSQL port
});
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Create table if it doesn't exist
const createProductsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mydata.products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price FLOAT NOT NULL,
        quantity INTEGER NOT NULL 
      );
    `);
    console.log("Table 'products' is ready.");
  } catch (err) {
    console.error('Error creating products table:', err.message);
  }
};

// Call the function to create the table when the app starts
createProductsTable();

module.exports = pool; // Export the pool to use in other files
